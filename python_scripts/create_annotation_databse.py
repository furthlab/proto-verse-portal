import os
import re
import gzip
import shutil
import sqlite3
import sys
import urllib.request

# --- CONFIGURATION ---
files_and_taxa = [
    ("https://paramecium.i2bc.paris-saclay.fr/files/Paramecium/caudatum/43c3d/annotations/caudatum_43c3d_assembly_v1/caudatum_43c3d_annotation_v1.gff3", "5885", "Paramecium caudatum 43c3d"),
    ("https://ftp.ensemblgenomes.ebi.ac.uk/pub/protists/release-60/gff3/paramecium_tetraurelia/Paramecium_tetraurelia.ASM16542v1.60.gff3.gz", "5888", "Paramecium tetraurelia ASM16542v1"),
    ("https://ftp.ensembl.org/pub/release-113/gff3/drosophila_melanogaster/Drosophila_melanogaster.BDGP6.46.113.gff3.gz", "7227", "Drosophila melanogaster BDGP6"),
    ("https://ftp.ensembl.org/pub/release-113/gff3/homo_sapiens/Homo_sapiens.GRCh38.113.gff3.gz", "9606", "Homo sapiens GRCh38"),
    ("https://ftp.ensembl.org/pub/release-113/gff3/mus_musculus/Mus_musculus.GRCm39.113.gff3.gz", "10090", "Mus musculus GRCm39"),
    ("https://zenodo.org/records/4086119/files/physarum_polycephalum.larue_et_al.gff3?download=1", "5791", "Physarum polycephalum"),
    ("https://ftp.ensemblgenomes.ebi.ac.uk/pub/metazoa/release-60/gff3/hydra_vulgaris_gca022113875v1rs/Hydra_vulgaris_gca022113875v1rs.Hydra_105_v3.60.gff3.gz", "6087", "Hydra vulgaris Hydra_105_v3"),
    ("https://ftp.ensembl.org/pub/release-113/gff3/caenorhabditis_elegans/Caenorhabditis_elegans.WBcel235.113.gff3.gz", "6239", "Caenorhabditis elegans WBcel235"),
    ("https://ftp.ensemblgenomes.ebi.ac.uk/pub/metazoa/release-61/gff3/mnemiopsis_leidyi/Mnemiopsis_leidyi.MneLei_Aug2011.61.gff3.gz", "27923", "Mnemiopsis leidyi MneLei_Aug2011"),
    ("https://ftp.ensemblgenomes.ebi.ac.uk/pub/protists/release-60/gff3/protists_alveolata1_collection/stentor_coeruleus_gca_001970955/Stentor_coeruleus_gca_001970955.ASM197095v1.60.gff3.gz", "5963", "Stentor coeruleus ASM197095v1"),
    ("https://ftp.ensemblgenomes.ebi.ac.uk/pub/metazoa/release-60/gff3/aplysia_californica_gca000002075v2/Aplysia_californica_gca000002075v2.AplCal3.0.60.gff3.gz", "6500", "Aplysia californica AplCal3.0")
]

db_file = "features.db"

# --- HELPER FUNCTIONS ---
def download_file(url, local_filename):
    print(f"[DOWNLOAD] {url}")
    urllib.request.urlretrieve(url, local_filename)
    print(f"[DOWNLOAD] Saved as {local_filename}")

def decompress_if_needed(filepath):
    if filepath.endswith(".gz"):
        new_path = filepath[:-3]
        print(f"[DECOMPRESS] {filepath} → {new_path}")
        with gzip.open(filepath, 'rb') as f_in, open(new_path, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
        os.remove(filepath)
        return new_path
    return filepath

def parse_gff_to_sqlite(filepath, taxon_id, genome_name, cursor):
    count = 0
    print(f"[PARSE] {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            if line.startswith("#") or not line.strip():
                continue
            parts = line.strip().split("\t")
            if len(parts) != 9:
                continue

            seqid, source, ftype, start, end, score, strand, phase, attributes = parts

            # Extract ID and Name if present
            attr_id = None
            attr_name = None
            for field in attributes.split(";"):
                if field.startswith("ID="):
                    attr_id = field[3:]
                elif field.startswith("Name="):
                    attr_name = field[5:]

            keys = []
            if attr_id:
                keys.append(attr_id)
            elif attr_name:
                keys.append(attr_name)
            else:
                keys.append(f"{seqid}:{start}-{end}:{ftype}")

            if attr_id and attr_name and attr_name != attr_id:
                keys.append(attr_name)

            for key in keys:
                cursor.execute("""
                    INSERT INTO features (feature_key, taxon_id, genome_name, chromosome, start, end, strand, type)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (key, taxon_id, genome_name, seqid, int(start), int(end), strand, ftype))
                count += 1
    print(f"[PARSE] Added {count} rows from {filepath}")

def build_database():
    if os.path.exists(db_file):
        os.remove(db_file)
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE features (
            feature_key TEXT,
            taxon_id TEXT,
            genome_name TEXT,
            chromosome TEXT,
            start INTEGER,
            end INTEGER,
            strand TEXT,
            type TEXT
        )
    """)
    cursor.execute("CREATE INDEX idx_feature_key ON features(feature_key)")

    for url, taxon_id, genome_name in files_and_taxa:
        filename = url.split("/")[-1].split("?")[0]
        if not os.path.exists(filename[:-3] if filename.endswith(".gz") else filename):
            if not os.path.exists(filename):
                download_file(url, filename)
            filepath = decompress_if_needed(filename)
        else:
            filepath = filename[:-3] if filename.endswith(".gz") else filename
            print(f"[SKIP DOWNLOAD] Using local {filepath}")

        parse_gff_to_sqlite(filepath, taxon_id, genome_name, cursor)
        conn.commit()
        print("[STATUS] Committed changes to DB.")

    conn.close()
    print(f"[DONE] Features stored in {db_file}")

def query_feature(feature_key):
    if not os.path.exists(db_file):
        print(f"[ERROR] {db_file} does not exist. Run script without arguments to build it first.")
        return
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    cursor.execute("SELECT taxon_id, genome_name, chromosome, start, end, strand, type FROM features WHERE feature_key=?", (feature_key,))
    rows = cursor.fetchall()
    conn.close()
    if not rows:
        print(f"[RESULT] No matches found for '{feature_key}'")
    else:
        print(f"[RESULT] Found {len(rows)} entries for '{feature_key}':")
        for row in rows:
            taxon_id, genome_name, chrom, start, end, strand, ftype = row
            print(f"  Taxon {taxon_id} | {genome_name} | {chrom}:{start}-{end} ({strand}) [{ftype}]")

def main():
    if len(sys.argv) == 1:
        build_database()
    elif len(sys.argv) == 2:
        query_feature(sys.argv[1])
    else:
        print("Usage:")
        print("  python script.py        # build database")
        print("  python script.py GENEID # query feature")

if __name__ == "__main__":
    main()