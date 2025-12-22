import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'Cocina', href: '/cocina' },
    { name: 'Organización', href: '/organizacion' },
    { name: 'Decoración', href: '/decoracion' },
    { name: 'Mesa', href: '/mesa' },
    { name: 'Baño', href: '/bano' },
    { name: 'Iluminación', href: '/iluminacion' },
  ],
  about: [
    { name: 'Nuestra Historia', href: '/sobre' },
    { name: 'Sostenibilidad', href: '/sostenibilidad' },
    { name: 'Artesanos Colaboradores', href: '/artesanos' },
    { name: 'Prensa', href: '/prensa' },
    { name: 'Carreras', href: '/carreras' },
  ],
  help: [
    { name: 'Contacto', href: '/contacto' },
    { name: 'Envíos', href: '/envios' },
    { name: 'Cambios y Devoluciones', href: '/cambios' },
    { name: 'FAQ', href: '/faq' },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-wide section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <h2 className="font-serif text-2xl font-light tracking-[0.3em] uppercase">
                MI CASA
              </h2>
            </Link>
            <p className="text-background/70 max-w-sm leading-relaxed mb-6">
              Curaduría de piezas excepcionales para quienes valoran
              sofisticación, calidad y diseño atemporal.
            </p>

            {/* Social */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-background/20 hover:border-background/50 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-background/20 hover:border-background/50 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-background/20 hover:border-background/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase mb-6">Tienda</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase mb-6">Sobre</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase mb-6">Ayuda</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/50">
            © 2024 MI CASA. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-background/50">
            <Link to="/privacidad" className="hover:text-background transition-colors">
              Privacidad
            </Link>
            <Link to="/terminos" className="hover:text-background transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
