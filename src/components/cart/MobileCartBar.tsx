import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const MobileCartBar: React.FC = () => {
  const { cartTotalCount, cartSubtotal, setIsCartOpen } = useCart();

  if (cartTotalCount === 0) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-gradient-to-t from-chocolate-900/90 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full bg-strawberry-600 active:bg-strawberry-700 text-white p-3.5 rounded-2xl shadow-floating flex items-center justify-between transition-all transform active:scale-98"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div className="text-left leading-tight">
              <div className="font-bold text-xs">
                {cartTotalCount} {cartTotalCount === 1 ? 'item' : 'items'}
              </div>
              <div className="font-serif font-extrabold text-sm">
                {cartSubtotal > 0 ? `₹${cartSubtotal.toLocaleString('en-IN')}` : 'Price on request'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-xl font-bold text-xs tracking-wide uppercase">
            <span>View Cake Box</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
};
