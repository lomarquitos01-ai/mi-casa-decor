import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import heroImage from "@/assets/products/restaurador-hero-2.jpg";
import protectionImage from "@/assets/products/restaurador-protection-2.jpg";
import usageImage from "@/assets/products/restaurador-usage-2.jpg";
import specImage from "@/assets/products/restaurador-spec-2.jpg";

const RestauradorPage = () => {
  const { addItem, openCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const images = [
    { url: heroImage, alt: "Restaurador de Mármoles y Granitos" },
    { url: protectionImage, alt: "Protección y brillo" },
    { url: usageImage, alt: "Modo de uso" },
    { url: specImage, alt: "Especificaciones" },
  ];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    const cartItem: CartItem = {
      product: {
        node: {
          id: "gid://shopify/Product/15474385453388",
          title: "Restaurador de Mármol y Granito Nano Cristal",
          description: "Restaurador profesional para mármoles, granitos y superficies de piedra natural",
          handle: "restaurador-de-marmol-y-granito-nano-cristal",
          productType: "Limpieza",
          priceRange: {
            minVariantPrice: {
              amount: "37.99",
              currencyCode: "EUR"
            }
          },
          images: {
            edges: [{
              node: {
                url: heroImage,
                altText: "Restaurador de Mármol y Granito"
              }
            }]
          },
          variants: {
            edges: [{
              node: {
                id: "gid://shopify/ProductVariant/56303403401548",
                title: "160ml",
                price: { amount: "37.99", currencyCode: "EUR" },
                availableForSale: true,
                selectedOptions: [{ name: "Tamaño", value: "160ml" }]
              }
            }]
          },
          options: [{ name: "Tamaño", values: ["160ml"] }]
        }
      },
      variantId: "gid://shopify/ProductVariant/56303403401548",
      variantTitle: "160ml",
      price: { amount: "37.99", currencyCode: "EUR" },
      quantity,
      selectedOptions: [{ name: "Tamaño", value: "160ml" }]
    };

    addItem(cartItem);
    toast.success("Añadido al carrito", {
      description: `Restaurador de Mármoles y Granitos x ${quantity}`,
      position: "top-center",
    });
    openCart();
    setTimeout(() => setIsAdding(false), 500);
  };

  const benefits = [
    "Seguro y perfecto para la limpieza diaria",
    "Elimina suciedad, polvo, derrames y grasa",
    "Mantiene su piso limpio y protegido",
    "Pulido fuerte y duradero",
    "Fórmula con pH balanceado",
    "Resultados profesionales en 15 segundos",
  ];

  const specifications = [
    { label: "Composición", value: "Nano silicona" },
    { label: "Área de uso", value: "3 a 5m² por botella" },
    { label: "Capacidad", value: "160ml" },
    { label: "Color", value: "Transparente" },
    { label: "Vida útil", value: "3 años (cerrado)" },
    { label: "Protección", value: "3 a 5 años" },
  ];

  const applications = [
    "Granito", "Mármol", "Travertino", "Caliza", "Pizarra", "Baldosa", "Madera"
  ];

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
                <img
                  src={images[selectedImageIndex].url}
                  alt={images[selectedImageIndex].alt}
                  className="w-full h-full object-cover"
                />
              </div>

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
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-5 md:space-y-6">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Cuidado Profesional
                </p>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-wide mb-3 md:mb-4">
                  Restaurador de Mármoles y Granitos
                </h1>
                <div className="flex items-baseline gap-3">
                  <p className="font-serif text-xl md:text-2xl">37,99 €</p>
                  <p className="text-sm md:text-base text-muted-foreground line-through">59,99 €</p>
                  <span className="text-xs md:text-sm text-green-600 font-medium">-37%</span>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-3 text-green-600">
                  <Truck size={16} className="md:w-[18px] md:h-[18px]" />
                  <span className="text-xs md:text-sm font-medium">Envío Gratis</span>
                </div>
              </div>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Restaurador profesional de nano silicona para mármoles, granitos y superficies de piedra natural. 
                Proporciona protección duradera contra agua, aceite y manchas.
              </p>

              {/* Size */}
              <div className="space-y-2 md:space-y-3">
                <label className="text-caption text-xs md:text-sm">Tamaño</label>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 md:px-4 py-1.5 md:py-2 border text-xs md:text-sm tracking-wide transition-colors border-foreground bg-foreground text-background">
                    160ml
                  </button>
                </div>
              </div>

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
                disabled={isAdding}
              >
                {isAdding ? 'Añadiendo...' : 'Añadir al Carrito'}
              </Button>

              {/* Benefits */}
              <div className="pt-4 md:pt-6 border-t border-border">
                <h3 className="text-sm md:text-base font-medium mb-3 md:mb-4">Beneficios</h3>
                <div className="grid grid-cols-1 gap-2">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                      <Check size={14} className="text-green-600 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div className="pt-4 md:pt-6 border-t border-border">
                <h3 className="text-sm md:text-base font-medium mb-3 md:mb-4">Superficies compatibles</h3>
                <div className="flex flex-wrap gap-2">
                  {applications.map((app, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-muted text-xs md:text-sm rounded-full"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="pt-4 md:pt-6 border-t border-border">
                <h3 className="text-sm md:text-base font-medium mb-3 md:mb-4">Especificaciones</h3>
                <div className="space-y-2">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between text-xs md:text-sm">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 md:pt-6 border-t border-border text-xs md:text-sm text-muted-foreground">
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

export default RestauradorPage;
