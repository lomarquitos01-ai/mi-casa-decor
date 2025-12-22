import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand-light via-cream to-sand">
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container-wide pt-32 md:pt-0">
        <div className="max-w-xl">
          <p
            className="text-caption mb-4 animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            Diseño que transforma
          </p>

          <h2
            className="heading-display text-foreground mb-6 animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            Elegancia para tu hogar
          </h2>

          <p
            className="text-editorial max-w-md mb-10 animate-fade-in-up"
            style={{ animationDelay: '600ms' }}
          >
            Curaduría de piezas excepcionales que elevan lo cotidiano.
            Cada detalle pensado para quienes valoran sofisticación y calidad.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
            style={{ animationDelay: '800ms' }}
          >
            <Link to="/coleccion">
              <Button variant="premium" size="lg">
                Explorar Colección
              </Button>
            </Link>
            <Link to="/nosotros">
              <Button variant="premium-outline" size="lg">
                Nuestra Historia
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1200ms' }}>
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-px h-8 bg-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-foreground animate-pulse" />
        </div>
      </div>
    </section>
  );
};
