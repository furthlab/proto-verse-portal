import { type GeneWithOrthologs } from "@/lib/supabase";

interface SearchResultsProps {
  results: GeneWithOrthologs[];
  searchTerm: string;
  isLoading: boolean;
}

const SearchResults = ({ results, searchTerm, isLoading }: SearchResultsProps) => {
  if (isLoading) {
    return <p>Loading results for "{searchTerm}"...</p>;
  }

  if (!results || results.length === 0) {
    return <p>No results found for "{searchTerm}".</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {results.map((gene) => (
        <div
          key={gene.gene_id}
          className="border rounded-lg shadow p-4 hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg">{gene.symbol || gene.gene_identifier}</h3>
          <p>{gene.description}</p>
          <p>
            <strong>Organism ID:</strong> {gene.organism_id}
          </p>
          <p>
            <strong>Protein ID:</strong> {gene.protein_identifier || "N/A"}
          </p>

          {gene.orthologs && gene.orthologs.length > 0 && (
            <div className="mt-2">
              <h4 className="font-semibold">Orthologs:</h4>
              <ul className="list-disc list-inside">
                {gene.orthologs.map((o) => (
                  <li key={o.gene_id}>
                    {o.symbol || o.gene_identifier} (Organism {o.organism_id})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
