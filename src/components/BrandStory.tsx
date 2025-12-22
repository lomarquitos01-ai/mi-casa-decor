import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BrandStory = () => {
  return (
    <section className="section-spacing">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left - Text */}
          <div className="order-2 md:order-1">
            <p className="text-caption mb-4">Nuestra Esencia</p>
            <h2 className="heading-section text-foreground mb-6">
              Cada pieza cuenta una historia
            </h2>
            <div className="space-y-4 text-editorial">
              <p>
                En MI CASA, creemos que el hogar es una extensión de quienes somos.
                Por eso, seleccionamos cada pieza con el mismo cuidado que tú dedicas a tus espacios.
              </p>
              <p>
                Nuestra curaduría reúne artesanos, diseñadores y marcas que comparten
                nuestra pasión por materiales nobles, procesos sostenibles y belleza atemporal.
              </p>
            </div>
            <Button variant="premium-ghost" className="mt-8 group">
              Conoce nuestra historia
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Right - Visual Element */}
          <div className="order-1 md:order-2">
            <div className="relative">
              {/* Decorative frame */}
              <div className="aspect-[4/5] bg-sand-light" />
              <div className="absolute inset-4 md:inset-8 border border-border" />

              {/* Quote */}
              <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
                <blockquote className="text-center">
                  <p className="font-serif text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed text-foreground">
                    "El verdadero lujo está en los detalles que hacen el día a día más hermoso"
                  </p>
                  <footer className="mt-6">
                    <p className="text-caption">— Filosofía MI CASA</p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
