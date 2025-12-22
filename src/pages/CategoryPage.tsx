import { useLayoutEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShopifyProducts } from '@/components/ShopifyProducts';

const categoryNames: Record<string, string> = {
  cocina: 'Cocina',
  organizacion: 'Organización',
  decoracion: 'Decoración',
  mesa: 'Mesa',
  bano: 'Baño',
  iluminacion: 'Iluminación',
  limpieza: 'Limpieza',
};

const categoryDescriptions: Record<string, string> = {
  cocina: 'Descubre nuestra colección de productos para cocina.',
  organizacion: 'Soluciones inteligentes para mantener tu hogar ordenado.',
  decoracion: 'Piezas únicas para dar personalidad a tus espacios.',
  mesa: 'Elegancia y estilo para tu mesa.',
  bano: 'Transforma tu baño en un espacio de bienestar.',
  iluminacion: 'Ilumina tu hogar con estilo.',
  limpieza: 'Productos profesionales para el cuidado del hogar.',
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  
  // Extrair categoria da URL se não vier de params
  const categorySlug = category || location.pathname.replace('/', '');
  const categoryName = categorySlug ? categoryNames[categorySlug] || categorySlug : 'Categoría';
  const categoryDescription = categorySlug ? categoryDescriptions[categorySlug] || `Descubre nuestra colección de productos para ${categoryName.toLowerCase()}.` : '';

  // Scroll to top immediately before paint
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [categorySlug]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-wide">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Volver
          </Link>

          <div className="mb-12">
            <h1 className="heading-display text-foreground mb-4">{categoryName}</h1>
            <p className="text-editorial max-w-2xl">
              {categoryDescription}
            </p>
          </div>

          <ShopifyProducts category={categorySlug} showHeader={false} limit={24} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
