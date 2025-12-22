import { useParams, Link } from 'react-router-dom';
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
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const categoryName = category ? categoryNames[category] || category : 'Categoría';

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
              Descubre nuestra colección de productos para {categoryName.toLowerCase()}.
            </p>
          </div>

          <ShopifyProducts />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
