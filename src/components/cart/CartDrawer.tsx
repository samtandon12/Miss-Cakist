import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { createCartOrderWhatsAppUrl } from '../../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartSubtotal, cartTotalCount } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleQuickWhatsApp = () => {
    setIsCartOpen(false);
    window.open(createCartOrderWhatsAppUrl(cart), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      
      {/* Background Backdrop click close */}
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)}></div>

      {/* Drawer Container */}
      <div className="relative bg-cream-100 w-full max-w-md h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-chocolate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-pinksoft-200 text-strawberry-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-chocolate-900 text-lg leading-tight">
                Your Cake Box
              </h2>
              <span className="text-xs text-chocolate-600 font-medium">
                {cartTotalCount} {cartTotalCount === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full text-chocolate-600 hover:bg-chocolate-100 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: Cart Items */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-pinksoft-100 text-strawberry-600 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-chocolate-900 text-lg">
                Your Cake Box is Empty
              </h3>
              <p className="text-xs text-chocolate-600 max-w-xs mx-auto">
                Explore our fresh homemade cakes, pastries and rasmalai fusion creations in Muzaffarpur.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/menu');
                }}
                className="bg-strawberry-600 hover:bg-strawberry-700 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((item, index) => {
              const linePrice = item.selectedPrice !== null ? item.selectedPrice * item.quantity : null;
              return (
                <div
                  key={`${item.product.id}-${item.selectedSize || index}`}
                  className="bg-white p-3.5 rounded-2xl border border-chocolate-100/80 shadow-xs flex items-center gap-3.5"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-chocolate-900 text-sm line-clamp-1">
                      {item.product.name}
                    </h4>
                    {item.selectedSize && (
                      <span className="text-[11px] font-semibold text-chocolate-500 block">
                        Size: {item.selectedSize}
                      </span>
                    )}
                    <span className="font-serif font-bold text-strawberry-600 text-xs mt-1 block">
                      {formatPrice(linePrice, 'Price on request')}
                    </span>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="text-chocolate-400 hover:text-strawberry-600 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center bg-cream-200 text-chocolate-900 rounded-lg px-2 py-0.5 border border-chocolate-200 text-xs font-bold gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                        className="hover:text-strawberry-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                        className="hover:text-strawberry-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-chocolate-100 space-y-3">
            
            {/* Delivery Charge Note */}
            <div className="bg-pinksoft-100/80 p-2.5 rounded-xl border border-pinksoft-200 text-[11px] text-chocolate-800 font-medium">
              🚚 <strong>Delivery info:</strong> Delivery charges confirmed at order time based on location in Muzaffarpur.
            </div>

            {/* Total Row */}
            <div className="flex items-center justify-between text-chocolate-900 font-serif font-bold text-base pt-1">
              <span>Subtotal:</span>
              <span className="text-strawberry-600">
                {cartSubtotal > 0 ? `₹${cartSubtotal.toLocaleString('en-IN')}` : 'Price on request'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleCheckout}
                className="w-full bg-strawberry-600 hover:bg-strawberry-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleQuickWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Order Directly via WhatsApp</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
