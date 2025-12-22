import { Button } from '@/components/ui/button';

export const Newsletter = () => {
  return (
    <section className="section-spacing">
      <div className="container-narrow">
        <div className="bg-foreground text-background p-8 md:p-16 text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 text-background/70">
            Exclusividad
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mb-4">
            Acceso Anticipado
          </h2>
          <p className="text-background/80 max-w-md mx-auto mb-8 leading-relaxed">
            Suscríbete para recibir lanzamientos exclusivos, inspiraciones de decoración
            e invitaciones a eventos privados.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu mejor email"
              className="flex-1 px-4 py-3 bg-transparent border border-background/30 text-background placeholder:text-background/50 text-sm tracking-wide focus:outline-none focus:border-background transition-colors"
            />
            <Button
              type="submit"
              variant="default"
              className="bg-background text-foreground hover:bg-background/90 tracking-[0.15em] uppercase text-xs px-8"
            >
              Suscribir
            </Button>
          </form>

          <p className="text-xs text-background/50 mt-4">
            Respetamos tu privacidad. Cancela cuando quieras.
          </p>
        </div>
      </div>
    </section>
  );
};
