
#python subset_annotation_database.py genomic_features.json genomic_features_subset.json --max 2000
#python3 subset_annotation_databse.py ~/features.db features_subset.db --max 2000

import sqlite3
import argparse
import random

def create_subset_sqlite(input_db, output_db, max_features=1000, seed=42):
    random.seed(seed)

    print("[1/6] Connecting to full database:", input_db)
    conn_in = sqlite3.connect(input_db)
    cur_in = conn_in.cursor()

    print("[2/6] Creating new subset database...")
    conn_out = sqlite3.connect(output_db)
    cur_out = conn_out.cursor()

    # Get column names dynamically
    cur_in.execute("PRAGMA table_info(features);")
    columns = [row[1] for row in cur_in.fetchall()]
    print(f"Columns in input DB: {columns}")

    # Prepare schema for subset DB using same columns
    print("[3/6] Setting up schema in subset database...")
    cur_out.execute("DROP TABLE IF EXISTS features;")
    schema_cols = ", ".join(f"{col} TEXT" for col in columns)  # store all as TEXT to keep it simple
    cur_out.execute(f"CREATE TABLE features ({schema_cols});")

    # Use rowid as a pseudo ID
    print("[4/6] Fetching rowids from input database...")
    cur_in.execute("SELECT rowid FROM features;")
    all_rowids = [row[0] for row in cur_in.fetchall()]
    print(f"Total rows in original DB: {len(all_rowids)}")

    if len(all_rowids) > max_features:
        sampled_rowids = random.sample(all_rowids, max_features)
    else:
        sampled_rowids = all_rowids
    print(f"Selected {len(sampled_rowids)} rows for subset.")

    # Copy data
    print("[5/6] Copying sampled rows to subset database...")
    placeholders = ",".join("?" for _ in sampled_rowids)
    query = f"SELECT * FROM features WHERE rowid IN ({placeholders})"
    cur_in.execute(query, sampled_rowids)
    rows = cur_in.fetchall()
    cur_out.executemany(f"INSERT INTO features VALUES ({','.join(['?']*len(columns))})", rows)
    conn_out.commit()

    print("[6/6] Subset database saved as", output_db)
    conn_in.close()
    conn_out.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a smaller subset of the SQLite genomic feature database.")
    parser.add_argument("input", help="Path to the full SQLite database")
    parser.add_argument("output", help="Path to write the subset SQLite database")
    parser.add_argument("--max", type=int, default=1000, help="Maximum number of rows to include (default: 1000)")
    parser.add_argument("--seed", type=int, default=42, help="Random seed for reproducibility (default: 42)")
    args = parser.parse_args()
    create_subset_sqlite(args.input, args.output, args.max, args.seed)
