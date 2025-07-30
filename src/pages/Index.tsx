import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OrganismGrid from "@/components/OrganismGrid";
import ResearchTools from "@/components/ResearchTools";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <OrganismGrid />
      <ResearchTools />
      <Footer />
    </div>
  );
};

export default Index;
