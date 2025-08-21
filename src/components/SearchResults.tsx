import { type GeneWithOrthologs } from "@/lib/supabase";

interface SearchResultsProps {
  results: GeneWithOrthologs[];
  searchTerm: string;
  isLoading: boolean;
}

const SearchResults = ({ results, searchTerm, isLoading }: SearchResultsProps) => {
  if (isLoading) return <p>Loading results...</p>;
  if (!results || results.length === 0) return <p>No results found for "{searchTerm}"</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {results.map((gene) => (
        <div key={gene.gene_id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <h3 className="font-bold text-lg">{gene.symbol}</h3>
          <p className="text-sm text-gray-600">{gene.description}</p>
          <p className="text-xs text-gray-500">
            Organism ID: {gene.organism_id} | Gene ID: {gene.gene_id}
          </p>
          {gene.orthologs && gene.orthologs.length > 0 && (
            <div className="mt-2">
              <strong>Orthologs:</strong>
              <ul className="list-disc list-inside">
                {gene.orthologs.map((o) => (
                  <li key={o.gene_id}>
                    {o.symbol} ({o.organism_id})
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
