import { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Loader2, Truck } from 'lucide-react';
import { fetchProductByHandle, formatPrice, ShopifyProduct } from '@/lib/shopify-api';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProduct['node']['variants']['edges'][0]['node'] | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const { addItem, openCart } = useCartStore();

  // Scroll to top immediately before paint
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [handle]);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;

      try {
        setIsLoading(true);
        const data = await fetchProductByHandle(handle);
        setProduct(data);

        if (data?.variants.edges[0]) {
          const firstVariant = data.variants.edges[0].node;
          setSelectedVariant(firstVariant);

          const initialOptions: Record<string, string> = {};
          firstVariant.selectedOptions.forEach(opt => {
            initialOptions[opt.name] = opt.value;
          });
          setSelectedOptions(initialOptions);
        }
      } catch (err) {
        console.error('Error al cargar producto:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  useEffect(() => {
    if (!product) return;

    const matchingVariant = product.variants.edges.find(({ node }) =>
      node.selectedOptions.every(opt => selectedOptions[opt.name] === opt.value)
    );

    if (matchingVariant) {
      setSelectedVariant(matchingVariant.node);
    }
  }, [selectedOptions, product]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    setIsAdding(true);

    addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    });

    toast.success('Añadido al carrito', {
      description: `${product.title} x ${quantity}`,
      position: 'top-center',
    });

    openCart();
    setTimeout(() => setIsAdding(false), 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-wide flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-wide text-center py-20">
            <h1 className="heading-section mb-4">Producto no encontrado</h1>
            <Link to="/" className="text-muted-foreground hover:text-foreground link-underline">
              Volver al inicio
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images.edges;
  const currentImage = images[selectedImageIndex]?.node;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container-wide px-4 md:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 md:mb-8"
          >
            <ArrowLeft size={16} />
            Volver
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20">
            {/* Images */}
            <div className="space-y-3 md:space-y-4">
              <div className="aspect-square md:aspect-[4/5] bg-muted overflow-hidden rounded-lg md:rounded-none">
                {currentImage && (
                  <img
                    src={currentImage.url}
                    alt={currentImage.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-20 md:w-20 md:h-24 flex-shrink-0 bg-muted overflow-hidden border-2 transition-colors rounded-md md:rounded-none ${
                        selectedImageIndex === index ? 'border-foreground' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-5 md:space-y-6">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-wide mb-3 md:mb-4">
                  {product.title}
                </h1>
                <p className="font-serif text-xl md:text-2xl">
                  {selectedVariant && formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
                </p>
                <div className="flex items-center gap-2 mt-2 md:mt-3 text-green-600">
                  <Truck size={16} className="md:w-[18px] md:h-[18px]" />
                  <span className="text-xs md:text-sm font-medium">Envío Gratis</span>
                </div>
              </div>

              {product.description && (
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Options */}
              {product.options.map(option => (
                option.values.length > 1 && (
                  <div key={option.name} className="space-y-2 md:space-y-3">
                    <label className="text-caption text-xs md:text-sm">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map(value => (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(option.name, value)}
                          className={`px-3 md:px-4 py-1.5 md:py-2 border text-xs md:text-sm tracking-wide transition-colors ${
                            selectedOptions[option.name] === value
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-border hover:border-foreground'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              ))}

              {/* Quantity */}
              <div className="space-y-2 md:space-y-3">
                <label className="text-caption text-xs md:text-sm">Cantidad</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus size={14} className="md:w-4 md:h-4" />
                    </button>
                    <span className="w-10 md:w-12 text-center text-sm md:text-base">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus size={14} className="md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                variant="premium"
                size="lg"
                className="w-full py-5 md:py-6 text-sm md:text-base"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale || isAdding}
              >
                {!selectedVariant?.availableForSale
                  ? 'Agotado'
                  : isAdding
                  ? 'Añadiendo...'
                  : 'Añadir al Carrito'
                }
              </Button>

              <div className="pt-4 md:pt-6 border-t border-border space-y-3 md:space-y-4 text-xs md:text-sm text-muted-foreground">
                <p>Devoluciones gratuitas en 30 días</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
