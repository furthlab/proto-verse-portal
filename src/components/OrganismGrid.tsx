import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, BookOpen, Database, ArrowRight } from "lucide-react";

const organisms = [
  {
    id: 1,
    name: "Paramecium tetraurelia",
    commonName: "Paramecium",
    description: "Single-celled ciliate known for habituation and sensitization studies",
    researchAreas: ["Learning", "Memory", "Behavior"],
    studyCount: 342,
    geneCount: "40K",
    image: "🦠"
  },
  {
    id: 2,
    name: "Stentor coeruleus",
    commonName: "Trumpet Animalcule", 
    description: "Large ciliate with complex behavioral patterns and regenerative abilities",
    researchAreas: ["Regeneration", "Behavior", "Morphology"],
    studyCount: 156,
    geneCount: "27K",
    image: "🔬"
  },
  {
    id: 3,
    name: "Physarum polycephalum",
    commonName: "Slime Mold",
    description: "Acellular slime mold demonstrating problem-solving and network optimization",
    researchAreas: ["Cognition", "Networks", "Problem-solving"],
    studyCount: 428,
    geneCount: "11K",
    image: "🍄"
  },
  {
    id: 4,
    name: "Tetrahymena thermophila", 
    commonName: "Tetrahymena",
    description: "Model ciliate for studying cellular processes and behavior",
    researchAreas: ["Cell Biology", "Genetics", "Behavior"],
    studyCount: 892,
    geneCount: "25K",
    image: "🔬"
  },
  {
    id: 5,
    name: "Blepharisma japonicum",
    commonName: "Blepharisma",
    description: "Photosensitive ciliate used in behavioral and photobiology research",
    researchAreas: ["Photobiology", "Behavior", "Sensory"],
    studyCount: 203,
    geneCount: "18K", 
    image: "✨"
  },
  {
    id: 6,
    name: "Dictyostelium discoideum",
    commonName: "Social Amoeba",
    description: "Social amoeba demonstrating collective behavior and decision-making",
    researchAreas: ["Social Behavior", "Development", "Signaling"],
    studyCount: 1247,
    geneCount: "12K",
    image: "🦠"
  }
];

const OrganismGrid = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Featured Model Organisms
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive database of non-traditional learning models, 
            from single-celled organisms to complex multicellular systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {organisms.map((organism) => (
            <Card key={organism.id} className="group hover:shadow-scientific transition-all duration-300 bg-card border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="text-3xl mb-2">{organism.image}</div>
                  <Badge variant="secondary" className="text-xs">
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
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {organism.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {organism.researchAreas.map((area) => (
                    <Badge key={area} variant="outline" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    <span>{organism.geneCount} genes</span>
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:text-primary">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            <BookOpen className="w-4 h-4 mr-2" />
            Browse All Organisms
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OrganismGrid;