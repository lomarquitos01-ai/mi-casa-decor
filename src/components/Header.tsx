import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { CartDrawer } from '@/components/CartDrawer';

const navigation = [
  { name: 'Cocina', href: '/cocina' },
  { name: 'Organización', href: '/organizacion' },
  { name: 'Decoración', href: '/decoracion' },
  { name: 'Mesa', href: '/mesa' },
  { name: 'Baño', href: '/bano' },
  { name: 'Iluminación', href: '/iluminacion' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems, isCartOpen, openCart, closeCart } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        {/* Top bar */}
        <div className="bg-foreground text-background">
          <div className="container-wide py-2 text-center">
            <p className="text-xs tracking-[0.2em] uppercase">
              Envío gratuito en todas las compras
            </p>
          </div>
        </div>

        {/* Main header */}
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 -ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
              <h1 className="font-serif text-xl md:text-2xl font-light tracking-[0.3em] uppercase">
                MI CASA
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 ml-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:text-muted-foreground transition-colors" aria-label="Buscar">
                <Search size={18} />
              </button>
              <button className="p-2 hover:text-muted-foreground transition-colors hidden md:block" aria-label="Cuenta">
                <User size={18} />
              </button>
              <button
                className="p-2 hover:text-muted-foreground transition-colors relative"
                aria-label="Carrito"
                onClick={openCart}
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border animate-fade-in">
            <nav className="container-wide py-6 space-y-4">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-base tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <Link
                  to="/cuenta"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} />
                  <span className="text-sm tracking-wide">Mi Cuenta</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};
