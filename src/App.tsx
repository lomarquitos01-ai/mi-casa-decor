import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import RestauradorPage from "./pages/RestauradorPage";
import CategoryPage from "./pages/CategoryPage";
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
          <Route path="/producto/:handle" element={<ProductPage />} />
          <Route path="/restaurador" element={<RestauradorPage />} />
          <Route path="/cocina" element={<CategoryPage />} />
          <Route path="/organizacion" element={<CategoryPage />} />
          <Route path="/decoracion" element={<CategoryPage />} />
          <Route path="/mesa" element={<CategoryPage />} />
          <Route path="/bano" element={<CategoryPage />} />
          <Route path="/iluminacion" element={<CategoryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
