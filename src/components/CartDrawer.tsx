import { useState } from 'react';
import { X, Minus, Plus, Trash2, ExternalLink, Loader2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice, createStorefrontCheckout } from '@/lib/shopify-api';
import { toast } from 'sonner';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  
  const {
    items,
    updateQuantity,
    removeItem,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const currencyCode = 'EUR';

  // Criar checkout e redirecionar diretamente
  const handleCreateCheckout = async () => {
    if (items.length === 0 || isCreatingCheckout) return;

    setIsCreatingCheckout(true);

    try {
      const checkoutItems = items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));
      
      const url = await createStorefrontCheckout(checkoutItems);
      
      if (url) {
        // Redirecionar na mesma aba
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsCreatingCheckout(false);
    }
  };

  // Limpar checkout URL quando o drawer fecha
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[100]"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-[101] shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
          <div>
            <h2 className="font-serif text-xl font-light tracking-wide">Tu Carrito</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {totalItems === 0 ? 'Tu carrito está vacío' : `${totalItems} artículo${totalItems !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted transition-colors rounded-md"
            aria-label="Cerrar carrito"
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
                variant="outline"
                className="mt-6"
                onClick={handleClose}
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
          <div className="border-t border-border p-6 space-y-4 bg-background shrink-0">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-serif text-lg">
                {formatPrice(totalPrice.toString(), currencyCode)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Impuestos y envío calculados en el checkout
            </p>
            
            <Button
              onClick={handleCreateCheckout}
              size="lg"
              className="w-full"
              disabled={isCreatingCheckout}
            >
              {isCreatingCheckout ? (
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
          </div>
        )}
      </div>
    </>
  );
};
