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
  const [searchResults, setSearchResults] = useState<AnnotationFeature[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setSearchTerm(query)
    
    try {
      // Search in the correct table with correct column names
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .or(`gene_symbol.ilike.%${query}%,feature_key.ilike.%${query}%,type.ilike.%${query}%,genome_name.ilike.%${query}%`)
        .limit(50)

      if (error) {
        console.error('Search error:', error)
        throw error
      }

      console.log('Search results:', data)
      setSearchResults(data || [])
      
      if (data && data.length > 0) {
        toast({
          title: "Search Complete",
          description: `Found ${data.length} annotation${data.length !== 1 ? 's' : ''} matching "${query}"`,
        })
      } else {
        toast({
          title: "No Results",
          description: `No annotations found for "${query}"`,
        })
      }
    } catch (error) {
      console.error('Search error:', error)
      toast({
        title: "Search Error",
        description: "Failed to search annotations. Please try again.",
        variant: "destructive",
      })
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

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
