import HeroSection from "@/components/HeroSection";
import GenomeBrowser from "@/components/GenomeBrowser";
import OrganismGrid from "@/components/OrganismGrid";
import Footer from "@/components/Footer";
import SearchResults from "@/components/SearchResults";
import { useState } from "react";
import { supabase, type AnnotationFeature } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchResults, setSearchResults] = useState<AnnotationFeature[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchTerm(query);

    try {
      // Test connection by fetching one row from the genes table
      const { data: testData, error: testError } = await supabase
        .from("genes")
        .select("*")
        .limit(1);

      if (testError) {
        console.error("Connection test failed:", testError);
        toast({
          title: "Connection Error",
          description: "Failed to connect to the database.",
          variant: "destructive",
        });
        setSearchResults([]);
        return;
      }

      // Search the genes table
      const { data, error } = await supabase
        .from('genes')
        .select(`
          *,
          organisms!inner(name, organism_id)
        `)
        .or(`symbol.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(50);

      if (error) throw error;

      // Map nested organism name to a top-level field
      const mappedData: AnnotationFeature[] = (data || []).map(f => ({
        ...f,
        organism_name: f.organisms?.name ?? 'Unknown',
      }));

      setSearchResults(mappedData);

      if (mappedData.length > 0) {
        toast({
          title: "Search Complete",
          description: `Found ${mappedData.length} annotation${
            mappedData.length !== 1 ? "s" : ""
          } matching "${query}"`,
        });
      } else {
        toast({
          title: "No Results",
          description: `No annotations found for "${query}"`,
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Failed to search annotations. Please try again.",
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
      {/*
      <ResearchTools />
      */}
      <Footer />
    </>
  );
};

export default Index;
