import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";
import { Check, Droplets, Shield, Sparkles, Clock, ShoppingCart } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import heroImage from "@/assets/products/restaurador-hero-2.jpg";
import protectionImage from "@/assets/products/restaurador-protection-2.jpg";
import usageImage from "@/assets/products/restaurador-usage-2.jpg";
import specImage from "@/assets/products/restaurador-spec-2.jpg";

const RestauradorPage = () => {
  const { addItem, openCart } = useCartStore();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
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
      quantity: 1,
      selectedOptions: [{ name: "Tamaño", value: "160ml" }]
    };

    addItem(cartItem);
    toast.success("Producto añadido al carrito", {
      description: "Restaurador de Mármoles y Granitos - 160ml",
      position: "top-center",
    });
    openCart();
  };

  const benefits = [
    "Seguro y perfecto para la limpieza diaria.",
    "Elimina suciedad, polvo, derrames y grasa de su granito sellado, mármol y otras superficies de piedra natural.",
    "Mantiene su piso limpio y protegido.",
    "Elimina con seguridad grasa, suciedad y marcas sin dejar residuos.",
    "Pulido fuerte y duradero.",
    "Nuestra fórmula con pH balanceado mantendrá el sellado de su piedra sin deteriorarse y brillante por mucho tiempo.",
  ];

  const usageSteps = [
    "Limpie la superficie y manténgala seca",
    "Aplique con una toalla y espere que seque",
    "Uso superpuesto para aumentar la dureza",
    "Esperar 24 horas sin mojar la superficie",
  ];

  const applications = [
    "Granito sellado",
    "Mármol",
    "Travertino",
    "Caliza",
    "Pizarra",
    "Baldosa",
    "Muebles de madera maciza",
  ];

  const specifications = [
    { label: "Composición", value: "Nano silicona" },
    { label: "Área de uso", value: "1 botella puede cubrir 3 a 5m²" },
    { label: "Capacidad", value: "160ml" },
    { label: "Color del producto", value: "Transparente" },
    { label: "Vida útil", value: "3 años (cerrado), protección 3 a 5 años" },
    { label: "Almacenamiento", value: "Lugar fresco y seco" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section - Full Width Image with Overlay */}
        <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Restaurador de Mármoles y Granitos"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/40 md:from-charcoal/90 md:via-charcoal/70 md:to-transparent" />
          </div>
          
          <div className="relative container-wide py-16 md:py-24 pt-24 md:pt-24">
            <div className="max-w-2xl space-y-4 md:space-y-8">
              <p className="text-gold text-sm md:text-lg font-medium tracking-wide">
                ¿Cansado de ver su encimera, lavabo o porcelanato opaco y sin brillo?
              </p>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-cream leading-tight">
                Mármoles y pisos brillando en{" "}
                <span className="text-gold font-medium">15 segundos!</span>
              </h1>
              
              <p className="text-base md:text-xl text-cream/80">
                Con nuestro Restaurador de Mármoles y Granitos, ¡ya no tendrá ese problema!
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 pt-2 md:pt-4">
                <div className="text-cream">
                  <span className="text-2xl md:text-4xl font-light">37,99 €</span>
                  <span className="text-base md:text-xl text-cream/60 line-through ml-2 md:ml-3">59,99 €</span>
                  <span className="block text-xs md:text-sm text-cream/60 mt-1">160ml • Envío Gratis</span>
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full sm:w-auto px-6 md:px-10 py-5 md:py-6 text-base md:text-lg bg-gold hover:bg-gold/90 text-charcoal"
                >
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Añadir al Carrito
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-20 bg-cream">
          <div className="container-wide">
            <div className="text-center mb-8 md:mb-16">
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-gold mx-auto mb-3 md:mb-4" />
              <h2 className="text-2xl md:text-4xl font-light text-charcoal">Beneficios</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Check className="w-5 h-5 md:w-6 md:h-6 text-gold flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-charcoal/80">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Water Repellent Section - Full Width Image */}
        <section className="relative py-16 md:py-32">
          <div className="absolute inset-0">
            <img
              src={protectionImage}
              alt="Alta protección y brillo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-charcoal/95 via-charcoal/80 to-charcoal/60 md:from-charcoal/90 md:via-charcoal/70 md:to-transparent" />
          </div>
          
          <div className="relative container-wide">
            <div className="max-w-xl md:ml-auto md:text-right">
              <Droplets className="w-8 h-8 md:w-12 md:h-12 text-gold md:ml-auto mb-4 md:mb-6" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-cream mb-4 md:mb-6">
                Buena repelencia al agua y manchas
              </h2>
              <p className="text-base md:text-xl text-cream/80 mb-6 md:mb-8">
                Después del recubrimiento, se forma una película protectora y la superficie
                tiene un efecto repelente al agua, aceite y manchas.
              </p>
              
              <div className="space-y-3">
                <h3 className="text-gold font-medium mb-3 md:mb-4">Para uso en:</h3>
                <div className="flex flex-wrap md:justify-end gap-2">
                  {applications.map((app, index) => (
                    <span
                      key={index}
                      className="px-3 md:px-4 py-1.5 md:py-2 bg-cream/10 backdrop-blur-sm rounded-full text-xs md:text-sm text-cream border border-cream/20"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Section - Full Width Image */}
        <section className="relative py-16 md:py-32">
          <div className="absolute inset-0">
            <img
              src={usageImage}
              alt="Modo de uso"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/60 md:from-charcoal/90 md:via-charcoal/70 md:to-transparent" />
          </div>
          
          <div className="relative container-wide">
            <div className="max-w-xl">
              <Clock className="w-8 h-8 md:w-12 md:h-12 text-gold mb-4 md:mb-6" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-cream mb-6 md:mb-10">
                Modo de Uso
              </h2>
              
              <div className="space-y-3 md:space-y-4">
                {usageSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-cream/10 backdrop-blur-sm rounded-lg border border-cream/20"
                  >
                    <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold flex items-center justify-center text-charcoal font-bold flex-shrink-0 text-sm md:text-base">
                      {index + 1}
                    </span>
                    <p className="text-sm md:text-base text-cream">{step}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-xs md:text-sm text-cream/60 mt-4 md:mt-6 italic">
                * Para aumentar la duración, repita el paso 2 después de media hora de intervalo.
              </p>
            </div>
          </div>
        </section>

        {/* Specifications Section - Full Width Image */}
        <section className="relative py-16 md:py-32">
          <div className="absolute inset-0">
            <img
              src={specImage}
              alt="Especificaciones del producto"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-charcoal/95 via-charcoal/80 to-charcoal/60 md:from-charcoal/90 md:via-charcoal/70 md:to-transparent" />
          </div>
          
          <div className="relative container-wide">
            <div className="max-w-xl md:ml-auto">
              <Shield className="w-8 h-8 md:w-12 md:h-12 text-gold md:ml-auto mb-4 md:mb-6" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-cream md:text-right mb-6 md:mb-10">
                Especificaciones
              </h2>
              
              <div className="space-y-2 md:space-y-3 bg-cream/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-cream/20">
                {specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 md:py-3 border-b border-cream/20 last:border-0 gap-4"
                  >
                    <span className="text-xs md:text-base text-cream/70">{spec.label}</span>
                    <span className="text-xs md:text-base text-cream font-medium text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-cream/70 mt-4 md:mt-6 md:text-right text-xs md:text-sm">
                El paquete incluye: 1 frasco de Nano Restaurador de Mármoles y Granitos.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-charcoal">
          <div className="container-narrow text-center space-y-6 md:space-y-8 px-4">
            <Sparkles className="w-10 h-10 md:w-16 md:h-16 text-gold mx-auto" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-cream">
              ¿Listo para restaurar el brillo de sus superficies?
            </h2>
            <p className="text-base md:text-xl text-cream/70">
              Obtenga resultados profesionales en solo 15 segundos.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 pt-2 md:pt-4">
              <div className="text-cream">
                <span className="text-2xl md:text-3xl font-light">37,99 €</span>
                <span className="text-base md:text-lg text-cream/60 line-through ml-2">59,99 €</span>
              </div>
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 text-base md:text-lg bg-gold hover:bg-gold/90 text-charcoal"
              >
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Comprar Ahora
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RestauradorPage;