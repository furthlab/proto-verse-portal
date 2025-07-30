import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, GitBranch, Eye, Download, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const treeData = [
  {
    id: 1,
    name: "Paramecium tetraurelia",
    commonName: "Paramecium",
    phylum: "Ciliophora",
    class: "Oligohymenophorea",
    genomeSize: "72 Mb",
    geneCount: "40,000",
    studyCount: 342,
    level: 0,
    children: []
  },
  {
    id: 2,
    name: "Tetrahymena thermophila",
    commonName: "Tetrahymena", 
    phylum: "Ciliophora",
    class: "Oligohymenophorea",
    genomeSize: "104 Mb",
    geneCount: "25,000",
    studyCount: 892,
    level: 0,
    children: []
  },
  {
    id: 3,
    name: "Stentor coeruleus",
    commonName: "Trumpet Animalcule",
    phylum: "Ciliophora", 
    class: "Heterotrichea",
    genomeSize: "158 Mb",
    geneCount: "27,000",
    studyCount: 156,
    level: 0,
    children: []
  },
  {
    id: 4,
    name: "Blepharisma japonicum",
    commonName: "Blepharisma",
    phylum: "Ciliophora",
    class: "Heterotrichea", 
    genomeSize: "95 Mb",
    geneCount: "18,000",
    studyCount: 203,
    level: 0,
    children: []
  },
  {
    id: 5,
    name: "Physarum polycephalum",
    commonName: "Slime Mold",
    phylum: "Amoebozoa",
    class: "Myxogastria",
    genomeSize: "23 Mb", 
    geneCount: "11,000",
    studyCount: 428,
    level: 1,
    children: []
  },
  {
    id: 6,
    name: "Dictyostelium discoideum",
    commonName: "Social Amoeba",
    phylum: "Amoebozoa",
    class: "Dictyostelia",
    genomeSize: "34 Mb",
    geneCount: "12,000", 
    studyCount: 1247,
    level: 1,
    children: []
  }
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
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
              <option value="all">All Phylums</option>
              {phylums.map(phylum => (
                <option key={phylum} value={phylum}>{phylum}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Tree Visualization */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-primary" />
              Phylogenetic Tree
            </h2>
            
            <div className="bg-gradient-card rounded-lg p-6 border border-border/50">
              <div className="space-y-4">
                {/* Ciliophora Branch */}
                <div className="border-l-2 border-scientific-teal pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Ciliophora</h3>
                  <div className="space-y-2 ml-4">
                    {filteredOrganisms
                      .filter(org => org.phylum === "Ciliophora")
                      .map(organism => (
                        <div key={organism.id} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-scientific-teal rounded-full"></div>
                          <span className="text-foreground font-medium">{organism.name}</span>
                          <span className="text-muted-foreground">({organism.commonName})</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Amoebozoa Branch */}
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Amoebozoa</h3>
                  <div className="space-y-2 ml-4">
                    {filteredOrganisms
                      .filter(org => org.phylum === "Amoebozoa")
                      .map(organism => (
                        <div key={organism.id} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-foreground font-medium">{organism.name}</span>
                          <span className="text-muted-foreground">({organism.commonName})</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Organism Details Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrganisms.map((organism) => (
              <Card key={organism.id} className="group hover:shadow-scientific transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-xs mb-2">
                      {organism.phylum}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {organism.studyCount} studies
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {organism.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {organism.commonName}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Genome Size:</span>
                      <div className="font-medium text-foreground">{organism.genomeSize}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Gene Count:</span>
                      <div className="font-medium text-foreground">{organism.geneCount}</div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground text-sm">Classification:</span>
                    <div className="text-sm text-foreground">{organism.class}</div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOrganisms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No organisms found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EvolutionaryTree;