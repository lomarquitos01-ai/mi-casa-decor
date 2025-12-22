import { useEffect, useState } from 'react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify-api';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ShopifyProductsProps {
  category?: string;
  showHeader?: boolean;
  limit?: number;
}

// Mapeamento de categorias para queries do Shopify
const categoryQueries: Record<string, string> = {
  cocina: 'product_type:Cocina OR tag:cocina',
  organizacion: 'product_type:Organización OR tag:organizacion',
  decoracion: 'product_type:Decoración OR tag:decoracion',
  mesa: 'product_type:Mesa OR tag:mesa',
  bano: 'product_type:Baño OR tag:bano',
  iluminacion: 'product_type:Iluminación OR tag:iluminacion',
  limpieza: 'product_type:Limpieza OR tag:limpieza',
};

export const ShopifyProducts = ({ category, showHeader = true, limit = 12 }: ShopifyProductsProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const query = category ? categoryQueries[category] : undefined;
        const data = await fetchProducts(limit, query);
        setProducts(data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [category, limit]);

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
    <section className={showHeader ? "section-spacing bg-sand-light" : ""}>
      <div className={showHeader ? "container-wide" : ""}>
        {/* Header */}
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-caption mb-3">Colección</p>
              <h2 className="heading-section text-foreground">
                Nuestros Productos
              </h2>
            </div>
            <Link to="/productos">
              <Button variant="premium-outline" size="default">
                Ver Todos
              </Button>
            </Link>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.node.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
