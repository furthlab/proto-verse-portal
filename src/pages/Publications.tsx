import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, ExternalLink, Calendar, Users } from "lucide-react";

const Publications = () => {
  const publications = [
    {
      title: "Comparative genomics reveals evolutionary adaptations in ciliated protists",
      authors: ["Smith J.", "Johnson A.", "Brown K."],
      journal: "Nature Microbiology",
      year: "2024",
      type: "Research Article",
      abstract: "We present a comprehensive comparative analysis of ciliated protist genomes, revealing key evolutionary adaptations that have shaped their diversity and ecological success.",
      doi: "10.1038/s41564-024-0001-1",
      pmid: "38123456"
    },
    {
      title: "ProtoMem: A comprehensive database for protist genomics",
      authors: ["Garcia M.", "Wilson R.", "Chen L."],
      journal: "Nucleic Acids Research",
      year: "2024",
      type: "Database Article",
      abstract: "ProtoMem provides researchers with integrated access to protist genomic data, annotations, and analytical tools for evolutionary and functional studies.",
      doi: "10.1093/nar/gkad001",
      pmid: "38234567"
    },
    {
      title: "Evolutionary dynamics of gene duplications in Paramecium species",
      authors: ["Lee S.", "Taylor P.", "Davis R."],
      journal: "Genome Biology",
      year: "2023",
      type: "Research Article",
      abstract: "Analysis of gene duplication patterns across Paramecium species reveals insights into genome evolution and functional divergence in protists.",
      doi: "10.1186/s13059-023-0001-2",
      pmid: "37345678"
    },
    {
      title: "Functional annotation pipeline for protist genomes",
      authors: ["Anderson K.", "White M.", "Thompson J."],
      journal: "Bioinformatics",
      year: "2023",
      type: "Methods Article",
      abstract: "We describe a standardized pipeline for functional annotation of protist genomes, improving the quality and consistency of genomic annotations.",
      doi: "10.1093/bioinformatics/btac001",
      pmid: "36456789"
    }
  ];

  const reviews = [
    {
      title: "Recent advances in protist genomics and phylogeny",
      authors: ["Kumar V.", "Roberts S."],
      journal: "Current Opinion in Microbiology",
      year: "2024",
      type: "Review"
    },
    {
      title: "Genome evolution in unicellular eukaryotes",
      authors: ["Martinez C.", "Brown L."],
      journal: "Annual Review of Genetics",
      year: "2023",
      type: "Review"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Publications</h1>
            <p className="text-xl text-muted-foreground">
              Scientific literature and resources related to protist genomics
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Recent Publications
            </h2>
            
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight mb-2">{pub.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {pub.authors.join(", ")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {pub.year}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{pub.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{pub.abstract}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">{pub.journal}</span>
                        {pub.doi && (
                          <span className="text-muted-foreground ml-2">
                            DOI: {pub.doi}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          PubMed
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          DOI
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Review Articles</h2>
            <div className="grid gap-4">
              {reviews.map((review, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{review.title}</CardTitle>
                        <CardDescription>
                          {review.authors.join(", ")} • {review.journal} • {review.year}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{review.type}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Submit Your Publication</CardTitle>
              <CardDescription>
                Have you published research using ProtoMem data? Let us know!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                We'd love to feature your research that utilizes our protist genomics database. 
                Submit your publication details and we'll add it to our collection.
              </p>
              <Button>Submit Publication</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Publications;