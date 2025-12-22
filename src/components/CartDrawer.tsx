import { useState } from 'react';
import { X, Minus, Plus, Trash2, ExternalLink, Loader2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/shopify-api';
import { toast } from 'sonner';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const [checkoutLink, setCheckoutLink] = useState<string | null>(null);
  
  const {
    items,
    isLoading,
    updateQuantity,
    removeItem,
    createCheckout,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const currencyCode = 'EUR';

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    const toastId = toast.loading('Creando checkout...');

    try {
      const checkoutUrl = await createCheckout();
      toast.dismiss(toastId);
      
      if (checkoutUrl) {
        setCheckoutLink(checkoutUrl);
        toast.success('¡Checkout listo! Haz clic en el enlace para continuar');
      } else {
        toast.error('Error al crear el checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.dismiss(toastId);
      toast.error('Error al procesar el checkout');
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer - z-index maior que overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-background z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="font-serif text-xl font-light tracking-wide">Tu Carrito</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {totalItems === 0 ? 'Tu carrito está vacío' : `${totalItems} artículo${totalItems !== 1 ? 's' : ''}`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted transition-colors"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Tu carrito está vacío</p>
                <p className="text-sm text-muted-foreground mt-1">Explora nuestra colección</p>
                <Button
                  variant="premium-outline"
                  className="mt-6"
                  onClick={onClose}
                >
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => {
                  const image = item.product.node.images.edges[0]?.node;
                  return (
                    <div key={item.variantId} className="flex gap-4">
                      {/* Image */}
                      <div className="w-20 h-24 bg-muted overflow-hidden flex-shrink-0">
                        {image && (
                          <img
                            src={image.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-normal truncate">
                          {item.product.node.title}
                        </h4>
                        {item.variantTitle !== 'Default Title' && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.selectedOptions.map(opt => opt.value).join(' / ')}
                          </p>
                        )}
                        <p className="text-sm font-medium mt-1">
                          {formatPrice(item.price.amount, item.price.currencyCode)}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center border border-border hover:bg-muted transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center border border-border hover:bg-muted transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="p-1 hover:text-destructive transition-colors flex-shrink-0"
                        aria-label="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 space-y-4 bg-background">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-serif text-lg">
                  {formatPrice(totalPrice.toString(), currencyCode)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Impuestos y envío calculados en el checkout
              </p>
              
              {/* Link de checkout quando disponível */}
              {checkoutLink ? (
                <a
                  href={checkoutLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    type="button"
                    variant="premium"
                    size="lg"
                    className="w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ir al Checkout
                  </Button>
                </a>
              ) : (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCheckout();
                  }}
                  variant="premium"
                  size="lg"
                  className="w-full relative z-10"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Finalizar Compra
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
