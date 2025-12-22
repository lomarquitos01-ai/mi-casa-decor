import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import RestauradorPage from "./pages/RestauradorPage";
import CategoryPage from "./pages/CategoryPage";
import AllProductsPage from "./pages/AllProductsPage";
import InfoPage from "./pages/InfoPage";
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
          <Route path="/producto/restaurador-de-marmol-y-granito-nano-cristal" element={<RestauradorPage />} />
          <Route path="/producto/:handle" element={<ProductPage />} />
          <Route path="/restaurador" element={<RestauradorPage />} />
          <Route path="/productos" element={<AllProductsPage />} />
          
          {/* Categorias */}
          <Route path="/cocina" element={<CategoryPage />} />
          <Route path="/organizacion" element={<CategoryPage />} />
          <Route path="/decoracion" element={<CategoryPage />} />
          <Route path="/mesa" element={<CategoryPage />} />
          <Route path="/bano" element={<CategoryPage />} />
          <Route path="/iluminacion" element={<CategoryPage />} />
          <Route path="/limpieza" element={<CategoryPage />} />
          
          {/* Páginas informativas */}
          <Route path="/sobre" element={<InfoPage />} />
          <Route path="/sostenibilidad" element={<InfoPage />} />
          <Route path="/artesanos" element={<InfoPage />} />
          <Route path="/prensa" element={<InfoPage />} />
          <Route path="/carreras" element={<InfoPage />} />
          <Route path="/contacto" element={<InfoPage />} />
          <Route path="/envios" element={<InfoPage />} />
          <Route path="/cambios" element={<InfoPage />} />
          <Route path="/faq" element={<InfoPage />} />
          <Route path="/privacidad" element={<InfoPage />} />
          <Route path="/terminos" element={<InfoPage />} />
          <Route path="/cuenta" element={<InfoPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
