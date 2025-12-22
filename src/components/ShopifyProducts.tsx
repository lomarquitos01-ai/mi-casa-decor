import { useEffect, useState } from 'react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify-api';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export const ShopifyProducts = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts(12);
        setProducts(data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="section-spacing bg-sand-light">
        <div className="container-wide">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Cargando productos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-spacing bg-sand-light">
        <div className="container-wide">
          <div className="text-center py-20">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="section-spacing bg-sand-light">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="text-caption mb-3">Colección</p>
            <h2 className="heading-section text-foreground">
              Nuestros Productos
            </h2>
          </div>
          <div className="text-center py-16 bg-cream">
            <p className="font-serif text-xl text-foreground mb-2">No hay productos disponibles</p>
            <p className="text-muted-foreground max-w-md mx-auto">
              Estamos preparando nuestra colección. Pronto encontrarás piezas excepcionales para tu hogar.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing bg-sand-light">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-caption mb-3">Colección</p>
            <h2 className="heading-section text-foreground">
              Nuestros Productos
            </h2>
          </div>
          <Button variant="premium-outline" size="default">
            Ver Todos
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.node.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
