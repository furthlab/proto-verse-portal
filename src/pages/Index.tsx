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
    setIsLoading(true);
    setSearchTerm(query);

    try {
      // fetch genes that match symbol or gene_identifier
      const { data: genes, error } = await supabase
        .from("GENES")
        .select("*")
        .or(`symbol.ilike.%${query}%,gene_identifier.ilike.%${query}%`)
        .limit(50);

      if (error) throw error;

      if (!genes || genes.length === 0) {
        setSearchResults([]);
        toast({
          title: "No Results",
          description: `No genes found for "${query}"`,
        });
        return;
      }

      // fetch orthologs for each gene
      const genesWithOrthologs: GeneWithOrthologs[] = await Promise.all(
        genes.map(async (gene) => {
          const { data: orthologRelations } = await supabase
            .from("ORTHOLOGS")
            .select("ortholog_gene_id")
            .eq("gene_id", gene.gene_id);

          let orthologs: GeneWithOrthologs[] = [];

          if (orthologRelations && orthologRelations.length > 0) {
            const { data: orthologGenes } = await supabase
              .from("GENES")
              .select("*")
              .in(
                "gene_id",
                orthologRelations.map((o) => o.ortholog_gene_id)
              );
            orthologs = orthologGenes || [];
          }

          return { ...gene, orthologs };
        })
      );

      setSearchResults(genesWithOrthologs);
      toast({
        title: "Search Complete",
        description: `Found ${genesWithOrthologs.length} gene${
          genesWithOrthologs.length !== 1 ? "s" : ""
        } matching "${query}"`,
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
      <SearchResults
        results={searchResults}
        searchTerm={searchTerm}
        isLoading={isLoading}
      />
      <GenomeBrowser />
      <OrganismGrid />
      <Footer />
    </>
  );
};

export default Index;
