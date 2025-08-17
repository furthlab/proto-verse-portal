import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, BookOpen, Database, ArrowRight } from "lucide-react";

const organisms = [
  {
    id: 1,
    name: "Paramecium caudatum",
    commonName: "Paramecium",
    description: "Single-celled ciliate used in learning, memory, and behavior studies",
    researchAreas: ["Learning", "Memory", "Behavior"],
    studyCount: 120,
    geneCount: "32K",
    image: "🦠",
    taxonId: 5885
  },
  {
    id: 2,
    name: "Paramecium tetraurelia",
    commonName: "Paramecium",
    description: "Model ciliate known for habituation and sensitization studies",
    researchAreas: ["Learning", "Memory", "Behavior"],
    studyCount: 342,
    geneCount: "40K",
    image: "🦠",
    taxonId: 5888
  },
  {
    id: 3,
    name: "Drosophila melanogaster",
    commonName: "Fruit Fly",
    description: "Genetic model for development, neuroscience, and behavior studies",
    researchAreas: ["Genetics", "Development", "Neuroscience"],
    studyCount: 15000,
    geneCount: "14K",
    image: "🪰",
    taxonId: 7227
  },
  {
    id: 4,
    name: "Homo sapiens",
    commonName: "Human",
    description: "Model for human biology, disease research, and genomics",
    researchAreas: ["Genetics", "Disease", "Medicine"],
    studyCount: 50000,
    geneCount: "20K",
    image: "🧬",
    taxonId: 9606
  },
  {
    id: 5,
    name: "Mus musculus",
    commonName: "Mouse",
    description: "Primary mammalian model for genetics, physiology, and disease studies",
    researchAreas: ["Genetics", "Disease", "Development"],
    studyCount: 30000,
    geneCount: "23K",
    image: "🐭",
    taxonId: 10090
  },
  {
    id: 6,
    name: "Physarum polycephalum",
    commonName: "Slime Mold",
    description: "Acellular slime mold demonstrating problem-solving and network optimization",
    researchAreas: ["Cognition", "Networks", "Problem-solving"],
    studyCount: 428,
    geneCount: "11K",
    image: "🍄",
    taxonId: 5791
  },
  {
    id: 7,
    name: "Hydra vulgaris",
    commonName: "Hydra",
    description: "Freshwater cnidarian used to study regeneration and stem cell biology",
    researchAreas: ["Regeneration", "Development", "Stem Cells"],
    studyCount: 600,
    geneCount: "20K",
    image: "🌿",
    taxonId: 6071
  },
  {
    id: 8,
    name: "Caenorhabditis elegans",
    commonName: "Nematode",
    description: "Model organism for genetics, development, and neurobiology",
    researchAreas: ["Genetics", "Development", "Neuroscience"],
    studyCount: 18000,
    geneCount: "20K",
    image: "🪱",
    taxonId: 6239
  },
  {
    id: 9,
    name: "Mnemiopsis leidyi",
    commonName: "Comb Jelly",
    description: "Marine ctenophore used for studying development and regenerative biology",
    researchAreas: ["Development", "Regeneration", "Evolution"],
    studyCount: 230,
    geneCount: "15K",
    image: "🌊",
    taxonId: 27923
  },
  {
    id: 10,
    name: "Stentor coeruleus",
    commonName: "Trumpet Animalcule",
    description: "Large ciliate with complex behavioral patterns and regenerative abilities",
    researchAreas: ["Regeneration", "Behavior", "Morphology"],
    studyCount: 156,
    geneCount: "27K",
    image: "🔬",
    taxonId: 5963
  },
  {
    id: 11,
    name: "Aplysia californica",
    commonName: "Sea Hare",
    description: "Marine mollusk used in neuroscience for learning and memory studies",
    researchAreas: ["Neuroscience", "Learning", "Behavior"],
    studyCount: 950,
    geneCount: "20K",
    image: "🐚",
    taxonId: 6500
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
