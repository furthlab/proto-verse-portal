import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Beaker, Microscope, Video, Dna, Syringe, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const GettingStarted = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Getting Started with Paramecium Research</h1>
            <p className="text-xl text-muted-foreground">
              A step-by-step guide for researchers new to Paramecium, from obtaining cultures to advanced molecular techniques
            </p>
          </div>

          <div className="space-y-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Step 1: Obtain Paramecium Strains
                </CardTitle>
                <CardDescription>
                  Contact the lab to get your initial cultures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  To begin your Paramecium research, you'll need to obtain laboratory strains. Contact the research group to request cultures and discuss your research needs.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm font-medium">Contact: furth@scilifelab.uu.se</p>
                  <p className="text-xs text-muted-foreground mt-1">Include details about your research project and required strains</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-primary" />
                  Step 2: Medium Preparation & Cell Culture
                </CardTitle>
                <CardDescription>
                  Learn to prepare wheat grass medium and maintain cultures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Paramecium requires specific culture conditions. You'll learn to prepare wheat grass medium and maintain cultures using Klebsiella-inoculated medium for optimal growth.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                  <li>• Wheat grass medium preparation</li>
                  <li>• Klebsiella bacteria cultivation</li>
                  <li>• Culture maintenance and feeding schedules</li>
                  <li>• Sterile technique and contamination prevention</li>
                </ul>
                <Link to="/culture-protocol">
                  <Button variant="outline" size="sm">
                    View Detailed Protocol
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="w-5 h-5 text-primary" />
                  Step 3: Basic Microscopy & Staining
                </CardTitle>
                <CardDescription>
                  Master observation, fixation, and staining techniques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Develop essential microscopy skills for observing live and fixed Paramecium specimens using various staining protocols.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Live cell observation techniques</li>
                  <li>• Fixation protocols for different applications</li>
                  <li>• Vital stains and fluorescent markers</li>
                  <li>• Image capture and documentation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  Step 4: Video & Behavioral Tracking
                </CardTitle>
                <CardDescription>
                  Record and analyze Paramecium behavior and movement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn to capture high-quality videos of Paramecium behavior and use tracking software to quantify movement patterns and responses.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Video recording setup and parameters</li>
                  <li>• Behavioral assay design</li>
                  <li>• Tracking software and analysis</li>
                  <li>• Data interpretation and statistics</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna className="w-5 h-5 text-primary" />
                  Step 5: RNA & DNA Extraction
                </CardTitle>
                <CardDescription>
                  Extract nucleic acids for molecular analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Master protocols for extracting high-quality RNA and DNA from Paramecium cultures for downstream molecular applications.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Cell harvesting and concentration</li>
                  <li>• RNA extraction and quality assessment</li>
                  <li>• DNA isolation techniques</li>
                  <li>• Storage and handling protocols</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Syringe className="w-5 h-5 text-primary" />
                  Step 6: RNAi via Feeding
                </CardTitle>
                <CardDescription>
                  Perform gene knockdown using L4440 plasmid system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn to use the feeding RNAi system with bacteria producing dsRNA from L4440 plasmids to knock down specific genes in Paramecium.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• L4440 plasmid cloning and verification</li>
                  <li>• Bacterial culture and dsRNA production</li>
                  <li>• Feeding protocols and timing</li>
                  <li>• Phenotype analysis and validation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Step 7: Transgenic Construction
                </CardTitle>
                <CardDescription>
                  Create transgenic strains using α-tubulin promoter system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Master the creation of transgenic Paramecium by inserting constructs between the α-tubulin promoter and 3'UTR for stable expression.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Construct design and cloning</li>
                  <li>• α-tubulin promoter and 3'UTR usage</li>
                  <li>• Transformation protocols</li>
                  <li>• Selection and characterization of transformants</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Research Timeline</h2>
            <p className="text-sm text-muted-foreground mb-4">
              These steps typically require 3-6 months to master, depending on your background and research goals. Start with steps 1-3 to establish basic competency before advancing to molecular techniques.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-2">Weeks 1-4: Foundation</h3>
                <p>Obtain strains, learn culture techniques, and basic microscopy</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Weeks 5-8: Documentation</h3>
                <p>Master video recording, behavioral tracking, and analysis</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Weeks 9-16: Molecular</h3>
                <p>Learn nucleic acid extraction and RNAi techniques</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Weeks 17-24: Advanced</h3>
                <p>Develop transgenic capabilities and specialized applications</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GettingStarted;