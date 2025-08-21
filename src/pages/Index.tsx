import HeroSection from "@/components/HeroSection";
import GenomeBrowser from "@/components/GenomeBrowser";
import OrganismGrid from "@/components/OrganismGrid";
import Footer from "@/components/Footer";
import SearchResults from "@/components/SearchResults";
import { useState } from "react";
import { supabase, type GeneWithOrthologs } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchResults, setSearchResults] = useState<GeneWithOrthologs[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    console.log("Starting search for:", query);
    setIsLoading(true);
    setSearchTerm(query);

    try {
      // Fetch genes matching query
      const { data: genes, error: geneError } = await supabase
        .from("GENES")
        .select("*")
        .or(
          `symbol.ilike.%${query}%,gene_identifier.ilike.%${query}%,description.ilike.%${query}%`
        )
        .limit(50);

      if (geneError) throw geneError;
      if (!genes || genes.length === 0) {
        setSearchResults([]);
        toast({ title: "No Results", description: `No genes found for "${query}"` });
        return;
      }

      // Fetch orthologs for each gene
      const results: GeneWithOrthologs[] = await Promise.all(
        genes.map(async (gene) => {
          const { data: orthologLinks } = await supabase
            .from("ORTHOLOGS")
            .select("ortholog_gene_id")
            .eq("gene_id", gene.gene_id);

          if (!orthologLinks || orthologLinks.length === 0) return gene;

          // fetch actual ortholog genes
          const orthologIds = orthologLinks.map((o) => o.ortholog_gene_id);
          const { data: orthologGenes } = await supabase
            .from("GENES")
            .select("*")
            .in("gene_id", orthologIds);

          return { ...gene, orthologs: orthologGenes || [] };
        })
      );

      setSearchResults(results);

      toast({
        title: "Search Complete",
        description: `Found ${results.length} gene${results.length !== 1 ? "s" : ""} matching "${query}"`,
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Failed to search genes. Please try again.",
        variant: "destructive",
      });
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeroSection onSearch={handleSearch} />
      <SearchResults results={searchResults} searchTerm={searchTerm} isLoading={isLoading} />
      <GenomeBrowser />
      <OrganismGrid />
      <Footer />
    </>
  );
};

export default Index;
