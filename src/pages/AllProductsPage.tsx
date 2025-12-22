import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShopifyProducts } from '@/components/ShopifyProducts';

const AllProductsPage = () => {
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
            <h1 className="heading-display text-foreground mb-4">Todos los Productos</h1>
            <p className="text-editorial max-w-2xl">
              Explora nuestra colección completa de productos para el hogar.
            </p>
          </div>

          <ShopifyProducts showHeader={false} limit={50} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllProductsPage;