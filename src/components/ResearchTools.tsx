import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Download, BarChart3, Microscope, FileText, Share2 } from "lucide-react";

const tools = [
  {
    icon: Search,
    title: "Advanced Search",
    description: "Search across genomes, publications, and research data with powerful filtering options",
    action: "Search Now"
  },
  {
    icon: BarChart3, 
    title: "Data Analysis",
    description: "Interactive tools for genomic analysis, expression profiling, and comparative studies",
    action: "Analyze Data"
  },
  {
    icon: Download,
    title: "Download Center", 
    description: "Access and download genomic sequences, annotations, and research datasets",
    action: "Browse Downloads"
  },
  {
    icon: Microscope,
    title: "Research Protocols",
    description: "Standardized protocols for studying learning and behavior in model organisms",
    action: "View Protocols"
  },
  {
    icon: FileText,
    title: "Submit Data",
    description: "Contribute your research data and findings to the community database",
    action: "Submit Now"
  },
  {
    icon: Share2,
    title: "Collaboration Hub",
    description: "Connect with researchers and collaborate on projects using shared resources",
    action: "Join Hub"
  }
];

const ResearchTools = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Research Tools & Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive suite of tools designed to accelerate your research in 
            non-traditional learning models and neuroscience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card key={index} className="group hover:shadow-scientific transition-all duration-300 bg-gradient-card border-border/50">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-foreground/70 leading-relaxed">
                    {tool.description}
                  </CardDescription>
                  <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary">
                    {tool.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResearchTools;