import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Download, FileText, BarChart3, Code, Globe, Cpu, Monitor, Video } from "lucide-react";

import parameciumTrackingGif from "@/assets/paramecium_tracking.gif";
import parameciumMeshGif from "@/assets/paramecium_meshes.gif";
import microwellGif from "@/assets/microwell.gif";

const DataTools = () => {
  const tools = [
    // Hardware first (swapped order)
    {
      title: "Printable Microchip",
      description: "Custom microchip for Pavlovian conditioning experiments",
      icon: Cpu,
      status: "Available",
      type: "Hardware",
      gif: microwellGif
    },
    {
      title: "3D Cell Reconstruction",
      description: "Generate 3D meshes from confocal image stacks",
      icon: Monitor,
      status: "Available",
      type: "Software",
      gif: parameciumMeshGif
    },
    {
      title: "Behavioral Video Tracking",
      description: "Automated scoring of learning and behavior from videos",
      icon: Video,
      status: "Available",
      type: "Software",
      gif: parameciumTrackingGif
    },
    {
      title: "Arduino Conditioning Setup",
      description: "Arduino-based platform for classical conditioning",
      icon: Cpu,
      status: "Available",
      type: "Hardware"
    },    
    {
      title: "Multiphoton Photolithography",
      description: "High-precision 3D photolithographic platform",
      icon: Monitor,
      status: "Available",
      type: "Hardware"
    },
    {
      title: "Subcellular Atlas",
      description: "Explore the spatial organization of transcripts within single cells",
      icon: Globe,
      status: "Available",
      type: "Software"
    },    
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Data Tools</h1>
            <p className="text-xl text-muted-foreground">
              Computational and experimental tools for cellular and behavioral research
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tools.map((tool, index) => (
              <Card key={index} className="relative flex flex-col h-full">
                <CardHeader>
                  {tool.gif && (
                    <img
                      src={tool.gif}
                      alt={`${tool.title} animation`}
                      className="w-full aspect-square object-cover rounded-lg mb-3"
                    />
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <tool.icon className="w-8 h-8 text-primary" />
                    <div className="flex gap-2">
                      <Badge variant={tool.status === "Available" ? "default" : "secondary"}>
                        {tool.status}
                      </Badge>
                      <Badge variant="outline">{tool.type}</Badge>
                    </div>
                  </div>
                  <CardTitle>{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button 
                    className="w-full" 
                    disabled={tool.status === "Coming Soon"}
                    variant={tool.status === "Available" ? "default" : "outline"}
                  >
                    {tool.status === "Available" ? "Access Tool" : "Coming Soon"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>
                  Access data programmatically using our RESTful API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <code className="text-sm">
                    GET /api/features?gene_symbol=ACTB&genome=Paramecium_tetraurelia
                  </code>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Query features by gene symbol, type, location, or genome assembly. 
                  Responses are returned in JSON format with pagination support.
                </p>
                <Button variant="outline">View API Docs</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Formats</CardTitle>
                <CardDescription>
                  Supported formats for data exchange
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Input Formats</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• GFF3 (Gene Feature Format)</li>
                      <li>• FASTA (Sequence data)</li>
                      <li>• BED (Browser Extensible Data)</li>
                      <li>• GTF (Gene Transfer Format)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Output Formats</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• JSON (API responses)</li>
                      <li>• CSV (Tabular data)</li>
                      <li>• FASTA (Sequence export)</li>
                      <li>• GFF3 (Feature export)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataTools;
