import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, GitBranch, Eye, Download, Info } from "lucide-react";
import Footer from "@/components/Footer";
import evoDevoImg from "@/assets/evo_devo.png"; // <-- Import your image

const treeData = [
  // ... your data stays the same
];

const EvolutionaryTree = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhylum, setSelectedPhylum] = useState("all");

  const filteredOrganisms = treeData.filter(organism => {
    const matchesSearch = organism.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          organism.commonName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPhylum = selectedPhylum === "all" || organism.phylum === selectedPhylum;
    return matchesSearch && matchesPhylum;
  });

  const phylums = [...new Set(treeData.map(org => org.phylum))];

  return (
    <>
      <div className="bg-gradient-hero py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Evolutionary Tree
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the phylogenetic relationships between non-traditional learning model organisms
              and access their genomic data and research resources.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search organisms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-border bg-background/80"
              />
            </div>
            <select
              value={selectedPhylum}
              onChange={(e) => setSelectedPhylum(e.target.value)}
              className="h-12 px-4 border border-border bg-background/80 rounded-md text-foreground"
            >
              <option value="all">All Phyla</option>
              {phylums.map(phylum => (
                <option key={phylum} value={phylum}>{phylum}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-primary" />
              Phylogenetic Tree
            </h2>
            <img 
              src={evoDevoImg} 
              alt="Evolutionary tree diagram" 
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default EvolutionaryTree;
