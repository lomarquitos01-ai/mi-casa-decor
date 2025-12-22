import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck } from 'lucide-react';
import { ShopifyProduct, formatPrice } from '@/lib/shopify-api';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, openCart } = useCartStore();

  const { node } = product;
  const firstImage = node.images.edges[0]?.node;
  const firstVariant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!firstVariant) return;

    setIsAdding(true);

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    toast.success('Añadido al carrito', {
      description: node.title,
      position: 'top-center',
    });

    openCart();
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div
      className="group animate-fade-in-up block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link to={`/producto/${node.handle}`}>
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-3 md:mb-4">
          {firstImage ? (
            <img
              src={firstImage.url}
              alt={firstImage.altText || node.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-sm">Sin imagen</span>
            </div>
          )}

          {/* Quick Add overlay - hidden on mobile, visible on hover for desktop */}
          <div className="absolute inset-0 hidden md:flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="premium"
              size="sm"
              className="bg-background/90 text-foreground hover:bg-background"
              onClick={handleAddToCart}
              disabled={isAdding || !firstVariant?.availableForSale}
            >
              {!firstVariant?.availableForSale ? 'Agotado' : isAdding ? 'Añadiendo...' : 'Añadir'}
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1 px-1">
          <h3 className="font-serif text-sm sm:text-base md:text-lg font-normal text-foreground group-hover:text-muted-foreground transition-colors line-clamp-2 leading-tight">
            {node.title}
          </h3>
          <p className="text-sm md:text-base font-medium text-foreground tracking-wide">
            {formatPrice(price.amount, price.currencyCode)}
          </p>
          <div className="flex items-center gap-1.5 text-green-600">
            <Truck size={12} className="md:w-[14px] md:h-[14px]" />
            <span className="text-[10px] md:text-xs font-medium">Envío Gratis</span>
          </div>
        </div>
      </Link>

      {/* Mobile Add to Cart button - outside Link to prevent navigation */}
      <div className="md:hidden mt-3 px-1">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={handleAddToCart}
          disabled={isAdding || !firstVariant?.availableForSale}
        >
          {!firstVariant?.availableForSale ? 'Agotado' : isAdding ? 'Añadiendo...' : 'Añadir al Carrito'}
        </Button>
      </div>
    </div>
  );
};
