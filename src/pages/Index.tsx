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
      const { data, error } = await supabase
        .from('annotations')
        .select('*')
        .or(`attributes.ilike.%${query}%,type.ilike.%${query}%,genome.ilike.%${query}%`)
        .limit(50)

      if (error) {
        throw error
      }

      setSearchResults(data || [])
      
      if (data && data.length > 0) {
        toast({
          title: "Search Complete",
          description: `Found ${data.length} annotation${data.length !== 1 ? 's' : ''} matching "${query}"`,
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
      <ResearchTools />
      <Footer />
    </>
  );
};

export default Index;
