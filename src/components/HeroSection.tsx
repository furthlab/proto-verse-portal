import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Database, Microscope, FlaskConical } from "lucide-react";
import heroImage from "/lovable-uploads/72c654b8-fea6-47f3-bfcc-a83e660c7ec4.png";

const HeroSection = () => {
  return (
    <section className="bg-gradient-hero py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Non-
                <span className="text-transparent bg-gradient-primary bg-clip-text">Synaptic</span>
                <br />
                Memory
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A bioinformatic resource for using non-traditional model organisms 
                in the search for non-synaptic memory.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search genes (e.g., BRCA1, TP53, EGFR)..." 
                  className="pl-10 h-12 border-border bg-background/80"
                />
              </div>
              <Button size="lg" className="h-12 px-6">
                <Search className="w-4 h-4 mr-2" />
                Search Genes
              </Button>
            </div>

          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-scientific">
              <img 
                src={heroImage} 
                alt="Microscopic organism with highlighted nucleus"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-scientific-teal/20 to-transparent"></div>
            </div>
            
            {/* Floating Icons */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-scientific-accent rounded-full flex items-center justify-center shadow-scientific animate-float">
              <Microscope className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-scientific animate-float" style={{ animationDelay: '1s' }}>
              <FlaskConical className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
