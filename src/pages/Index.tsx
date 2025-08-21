import HeroSection from "@/components/HeroSection";
import GenomeBrowser from "@/components/GenomeBrowser";
import OrganismGrid from "@/components/OrganismGrid";
import ResearchTools from "@/components/ResearchTools";
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
    console.log("Starting search for:", query);
    setIsLoading(true);
    setSearchTerm(query);

    try {
      console.log("Testing Supabase connection...");

      // Test connection by fetching one row from annotations table
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
      } else {
        console.log("Connection test successful, sample row:", testData);
      }

      console.log("Searching features table...");
      const { data, error } = await supabase
        .from('genes')
        .select('*')
        .or(`symbol.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(50);

      if (error) {
        console.error("Search error:", error);
        throw error;
      }

      console.log("Search results:", data);
      setSearchResults(data || []);

      if (data && data.length > 0) {
        toast({
          title: "Search Complete",
          description: `Found ${data.length} annotation${
            data.length !== 1 ? "s" : ""
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