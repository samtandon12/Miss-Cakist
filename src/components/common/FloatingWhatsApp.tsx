import React from 'react';
import { MessageCircle } from 'lucide-react';
import { createGeneralWhatsAppUrl } from '../../utils/whatsapp';
import { useCart } from '../../context/CartContext';

export const FloatingWhatsApp: React.FC = () => {
  const { cartTotalCount } = useCart();

  return (
    <div
      className={`fixed right-4 z-40 transition-all duration-300 ${
        cartTotalCount > 0 ? 'bottom-20 md:bottom-6' : 'bottom-6'
      }`}
    >
      <a
        href={createGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp with Miss Cakist"
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-floating transition-all transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-[2.2]" />

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 whitespace-nowrap bg-chocolate-900 text-cream-100 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Order on WhatsApp
        </span>

        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 pointer-events-none"></span>
      </a>
    </div>
  );
};
