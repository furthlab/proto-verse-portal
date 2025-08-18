import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Database, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";

const GettingStarted = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Getting Started with ProtoMem</h1>
            <p className="text-xl text-muted-foreground">
              Your comprehensive guide to exploring protist genomics and evolutionary biology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Search Features
                </CardTitle>
                <CardDescription>
                  Learn how to search for genes, proteins, and genomic features across multiple protist species
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Use the search functionality to find specific genes by symbol, feature key, or type. 
                  Results are organized by genome assembly for easy comparison.
                </p>
                <Button asChild>
                  <Link to="/">Try Search</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  Browse Organisms
                </CardTitle>
                <CardDescription>
                  Explore the evolutionary relationships between different protist species
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Navigate through our curated collection of protist genomes and understand 
                  their phylogenetic relationships.
                </p>
                <Button asChild>
                  <Link to="/evolutionary-tree">View Organisms</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Genetic Tools
                </CardTitle>
                <CardDescription>
                  Access molecular tools and resources for protist research
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Discover available genetic tools, vectors, and methodologies for 
                  studying protist biology and development.
                </p>
                <Button asChild>
                  <Link to="/genetic-tools">Explore Tools</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Community
                </CardTitle>
                <CardDescription>
                  Connect with researchers and contribute to the database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Join our research community, share your findings, and contribute 
                  new genomic data to expand the resource.
                </p>
                <Button variant="outline">Join Community</Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>Start by searching for a gene of interest using the search bar</li>
              <li>Explore the results across different protist species</li>
              <li>Use the organism browser to understand evolutionary relationships</li>
              <li>Check available genetic tools for your species of interest</li>
              <li>Browse publications for methodology and background information</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GettingStarted;