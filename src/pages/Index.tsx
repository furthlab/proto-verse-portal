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

  const [showOrthologs, setShowOrthologs] = useState(false);
  const handleToggleOrthologs = () => setShowOrthologs(prev => !prev);

  const handleSearch = async (query: string, orthologSearch = false) => {
    setIsLoading(true);
    setSearchTerm(query);

    try {
      if (!orthologSearch) {
        // Original gene search
        const { data, error } = await supabase
          .from('genes')
          .select(`*, organisms!inner(name, organism_id)`)
          .or(`symbol.ilike.%${query}%,description.ilike.%${query}%`)
          .limit(50);

        if (error) throw error;

        const mappedData: AnnotationFeature[] = (data || []).map(f => ({
          ...f,
          organism_name: f.organisms?.name ?? 'Unknown',
        }));

        setSearchResults(mappedData);
      } else {
        // Ortholog search by query string (fallback)
        const { data: genesData } = await supabase
          .from('genes')
          .select('gene_id')
          .or(`symbol.ilike.%${query}%,description.ilike.%${query}%`);

        const geneIds = genesData?.map(g => g.gene_id) || [];

        if (geneIds.length === 0) {
          setSearchResults([]);
          return;
        }

        const { data: orthologData } = await supabase
          .from('orthologs')
          .select('ortholog_gene_id')
          .in('gene_id', geneIds);

        const orthologGeneIds = orthologData?.map(o => o.ortholog_gene_id) || [];

        if (orthologGeneIds.length === 0) {
          setSearchResults([]);
          return;
        }

        const { data: orthologFeatures } = await supabase
          .from('genes')
          .select(`*, organisms!inner(name, organism_id)`)
          .in('gene_id', orthologGeneIds);

        const mappedData: AnnotationFeature[] = (orthologFeatures || []).map(f => ({
          ...f,
          organism_name: f.organisms?.name ?? 'Unknown',
        }));

        setSearchResults(mappedData);
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

  const handleOrthologSearch = async (geneId: number) => {
    setIsLoading(true);
    try {
      // Step 1: Get ortholog gene IDs
      const { data: orthologData, error: orthologError } = await supabase
        .from('orthologs')
        .select('ortholog_gene_id')
        .eq('gene_id', geneId);

      if (orthologError) throw orthologError;

      const orthologGeneIds = orthologData?.map(o => o.ortholog_gene_id) || [];
      if (orthologGeneIds.length === 0) {
        setSearchResults([]);
        setSearchTerm(`orthologs of gene ${geneId}`);
        return;
      }

      // Step 2: Fetch ortholog details
      const { data: orthologFeatures, error: genesError } = await supabase
        .from('genes')
        .select(`*, organisms!inner(name, organism_id)`)
        .in('gene_id', orthologGeneIds);

      if (genesError) throw genesError;

      const mappedData: AnnotationFeature[] = (orthologFeatures || []).map(f => ({
        ...f,
        organism_name: f.organisms?.name ?? 'Unknown',
      }));

      setSearchResults(mappedData);
      setSearchTerm(`orthologs of gene ${geneId}`);
    } catch (error) {
      console.error("Ortholog search error:", error);
      toast({
        title: "Search Error",
        description: "Failed to fetch orthologs. Please try again.",
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
        onOrthologSearch={handleOrthologSearch}
      />
      <GenomeBrowser />
      <OrganismGrid />
      <Footer />
    </>
  );
};

export default Index;
