import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Check, Droplets, Shield, Sparkles, Timer, ArrowLeft, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import heroImage from "@/assets/restaurador-hero.jpg";
import protectionImage from "@/assets/restaurador-protection.jpg";
import usageImage from "@/assets/restaurador-usage.jpg";
import specImage from "@/assets/restaurador-spec.jpg";

const RestauradorPage = () => {
  const { openCart } = useCartStore();

  const handleAddToCart = () => {
    toast.success("Producto agregado al carrito", {
      description: "Restaurador de Mármoles y Granitos",
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
      
      <main className="pt-24">
        {/* Back Navigation */}
        <div className="container-wide pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver a la tienda</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="section-spacing">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative aspect-square rounded-sm overflow-hidden bg-secondary">
                <img
                  src={heroImage}
                  alt="Restaurador de Mármoles y Granitos"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-caption mb-3">Limpieza Profesional</p>
                  <h1 className="heading-display text-foreground mb-4">
                    Restaurador de Mármoles y Granitos
                  </h1>
                  <p className="text-editorial">
                    ¿Cansado de ver su encimera, lavabo o porcelanato opaco y sin brillo?
                    ¡Con nuestro Restaurador ya no tendrá ese problema!
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-gold" />
                  <span className="text-xl font-medium text-foreground">
                    ¡Mármoles y pisos brillando en 15 segundos!
                  </span>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-light text-foreground">37,99 €</span>
                  <span className="text-lg text-muted-foreground line-through">59,99 €</span>
                  <span className="text-sm text-muted-foreground">160ml</span>
                </div>

                <div className="flex items-center gap-2 text-green-600">
                  <Truck size={20} />
                  <span className="font-medium">Envío Gratis</span>
                </div>

                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full sm:w-auto px-12"
                >
                  Agregar al Carrito
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-spacing bg-secondary">
          <div className="container-wide">
            <h2 className="heading-section text-center mb-12">Beneficios</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-6 bg-card rounded-sm"
                >
                  <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Water Repellent Section */}
        <section className="section-spacing">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Droplets className="w-8 h-8 text-gold" />
                  <h2 className="heading-section">Buena repelencia al agua y manchas</h2>
                </div>
                <p className="text-editorial">
                  Después del recubrimiento, se forma una película protectora y la superficie
                  tiene un efecto repelente al agua, aceite y manchas.
                </p>

                <div>
                  <h3 className="text-lg font-medium mb-4">Para uso en:</h3>
                  <div className="flex flex-wrap gap-2">
                    {applications.map((app, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-secondary rounded-sm text-sm text-foreground"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative aspect-video rounded-sm overflow-hidden bg-secondary">
                <img
                  src={protectionImage}
                  alt="Alta protección y brillo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Usage Section */}
        <section className="section-spacing bg-sand-light">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-video rounded-sm overflow-hidden bg-secondary order-2 lg:order-1">
                <img
                  src={usageImage}
                  alt="Modo de uso"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6 order-1 lg:order-2">
                <div className="flex items-center gap-3">
                  <Timer className="w-8 h-8 text-gold" />
                  <h2 className="heading-section">Modo de Uso</h2>
                </div>

                <div className="space-y-4">
                  {usageSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-card rounded-sm"
                    >
                      <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-foreground pt-1">{step}</p>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground italic">
                  * Para aumentar la duración, repita el paso 2 después de media hora de intervalo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="section-spacing">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-gold" />
                  <h2 className="heading-section">Especificaciones</h2>
                </div>

                <div className="space-y-3">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-border"
                    >
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="text-foreground font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  El paquete incluye: 1 frasco de Nano Restaurador de Mármoles y Granitos.
                </p>

                <p className="text-editorial">
                  Ampliamente utilizado para pulir la superficie de piedra, mármol, piedra de cuarzo,
                  baldosa cerámica y otros productos para formar una capa protectora de restaurador
                  de cristal en la superficie.
                </p>
              </div>

              <div className="relative aspect-square rounded-sm overflow-hidden bg-secondary">
                <img
                  src={specImage}
                  alt="Especificaciones del producto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-spacing bg-charcoal text-cream">
          <div className="container-narrow text-center space-y-6">
            <h2 className="heading-section text-cream">
              ¿Listo para restaurar el brillo de sus superficies?
            </h2>
            <p className="text-lg opacity-80">
              Obtenga resultados profesionales en solo 15 segundos.
            </p>
            <Button
              onClick={handleAddToCart}
              size="lg"
              variant="secondary"
              className="px-12"
            >
              Comprar Ahora
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RestauradorPage;
