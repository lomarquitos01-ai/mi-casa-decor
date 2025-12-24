import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import image1 from "@/assets/products/restaurador-1.png";
import image2 from "@/assets/products/restaurador-2.png";
import image3 from "@/assets/products/restaurador-3.png";
import image4 from "@/assets/products/restaurador-4.png";
import image5 from "@/assets/products/restaurador-5.png";

const RestauradorPage = () => {
  const { addItem, openCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const images = [
    { url: image1, alt: "Restaurador de Mármoles y Granitos" },
    { url: image2, alt: "Protección y brillo" },
    { url: image3, alt: "Modo de uso" },
    { url: image4, alt: "Especificaciones" },
    { url: image5, alt: "Aplicación" },
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
          title: "Restaurador de Mármoles y Granitos Nano Cristal",
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
                url: image1,
                altText: "Restaurador de Mármoles y Granitos"
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
    toast.success("Producto añadido al carrito", {
      description: `Restaurador de Mármoles y Granitos x ${quantity}`,
      position: "top-center",
    });
    openCart();
    setTimeout(() => setIsAdding(false), 500);
  };

  const benefits = [
    "Seguro y perfecto para la limpieza diaria",
    "Elimina suciedad, polvo, derrames y grasa de tu granito sellado, mármol y otras superficies de piedra natural",
    "Mantiene tu suelo limpio y protegido",
    "Elimina con seguridad grasa, suciedad y marcas sin dejar residuos",
    "Pulido fuerte y duradero",
    "Fórmula con pH equilibrado que mantiene el sellado de tu piedra brillante durante mucho tiempo",
  ];

  const specifications = [
    { label: "Composición", value: "Nano silicona" },
    { label: "Área de uso", value: "3 a 5m² por botella" },
    { label: "Capacidad", value: "160ml" },
    { label: "Color", value: "Transparente" },
    { label: "Caducidad", value: "3 años (cerrado)" },
    { label: "Protección", value: "3 a 5 años" },
    { label: "Almacenamiento", value: "Lugar fresco y seco" },
  ];

  const applications = [
    "Granito sellado", "Mármol", "Travertino", "Piedra caliza", "Pizarra", "Baldosa", "Madera maciza"
  ];

  const usageSteps = [
    "Limpia la superficie y mantenla seca",
    "Aplica con una toalla y espera a que seque",
    "Uso superpuesto para aumentar la dureza",
    "Esperar 24 horas sin mojar la superficie",
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
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                  ¿Cansado de mirar el fregadero, la encimera o incluso tu porcelánico y ver que está sin brillo, opaco y no quieres tener el trabajo de cambiar la pieza?
                </p>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-wide mb-2">
                  ¡Mármoles y suelos brillando en 15 segundos!
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  ¡Con nuestro Restaurador de Mármoles y Granitos, ya no tendrás ese problema!
                </p>
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
                    <div key={index} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                      <Check size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Water Repellent */}
              <div className="pt-4 md:pt-6 border-t border-border">
                <h3 className="text-sm md:text-base font-medium mb-2">Buena repelencia al agua y las manchas</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Tras el revestimiento, se forma una película protectora y la superficie tiene un efecto repelente al agua, aceite y manchas.
                </p>
              </div>

              {/* Applications */}
              <div className="pt-4 md:pt-6 border-t border-border">
                <h3 className="text-sm md:text-base font-medium mb-3 md:mb-4">Para uso en</h3>
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

              {/* Usage */}
              <div className="pt-4 md:pt-6 border-t border-border">
                <h3 className="text-sm md:text-base font-medium mb-3 md:mb-4">Modo de uso</h3>
                <div className="space-y-2">
                  {usageSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 text-xs md:text-sm">
                      <span className="w-5 h-5 rounded-full bg-foreground text-background flex items-center justify-center text-xs flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">
                  * Repite el paso 2 para aumentar la duración (espera media hora de intervalo).
                </p>
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
                <p className="text-xs text-muted-foreground mt-3">
                  El paquete incluye: 1 frasco de Nano Restaurador de Mármoles y Granitos.
                </p>
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
