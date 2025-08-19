import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import EvolutionaryTree from "./pages/EvolutionaryTree";
import GeneticTools from "./pages/GeneticTools";
import GettingStarted from "./pages/GettingStarted";
import DataTools from "./pages/DataTools";
import Publications from "./pages/Publications";
import CultureProtocol from "./pages/CultureProtocol";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/evolutionary-tree" element={<EvolutionaryTree />} />
            <Route path="/genetic-tools" element={<GeneticTools />} />
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/data-tools" element={<DataTools />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/culture-protocol" element={<CultureProtocol />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
