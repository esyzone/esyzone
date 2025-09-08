import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import About from "./pages/About";
import CategoryPage from "./pages/CategoryPage";
import WordCounter from "./pages/tools/WordCounter";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import CaseConverter from "./pages/tools/CaseConverter";
import JSONFormatter from "./pages/tools/JSONFormatter";
import DuplicateRemover from "./pages/tools/DuplicateRemover";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/tools/word-counter" element={<WordCounter />} />
          <Route path="/tools/password-generator" element={<PasswordGenerator />} />
          <Route path="/tools/case-converter" element={<CaseConverter />} />
          <Route path="/tools/json-formatter" element={<JSONFormatter />} />
          <Route path="/tools/duplicate-remover" element={<DuplicateRemover />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
