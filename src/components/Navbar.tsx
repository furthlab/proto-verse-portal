import { Button } from "@/components/ui/button";
import { Search, Menu, Database, BookOpen, Users, Settings } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">NeuroBase</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="/evolutionary-tree" className="text-foreground hover:text-primary transition-colors">
              Organisms
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Research
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Publications
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Data Tools
            </a>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button size="sm">
              <Users className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;