import { type AnnotationFeature } from "@/lib/supabase";

interface SearchResultsProps {
  results: AnnotationFeature[];
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
    <div>
      <h2>Search Results for "{searchTerm}"</h2>
      <ul>
        {results.map((r) => (
          <li key={r.entry_id}>
            <strong>{r.name || "Unnamed"}</strong>
            <p>Gene ID: {r.gene_id || "N/A"}</p>
            <p>Gene Symbol: {r.gene_symbol || "N/A"}</p>
            <p>GO ID: {r.id || "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
