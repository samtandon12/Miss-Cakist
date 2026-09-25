import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, MessageCircle, Crown } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { createProductWhatsAppUrl } from '../../utils/whatsapp';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes.length > 0 ? product.sizes[0].size : undefined
  );

  // Get current quantity in cart for selected size
  const quantity = getItemQuantity(product.id, selectedSize);

  const matchedSizeObj = product.sizes.find((s) => s.size === selectedSize);
  const currentPrice = matchedSizeObj ? matchedSizeObj.price : product.price;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, currentPrice);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, selectedSize, 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, selectedSize, -1);
  };

  return (
    <div className="group bg-white rounded-2xl border border-chocolate-100/90 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      <div>
        {/* Product Image */}
        <div className="relative aspect-4/3 overflow-hidden bg-cream-200">
          <Link to={`/product/${product.slug}`}>
            <img
              src={product.image}
              alt={`${product.name} from Miss Cakist in Muzaffarpur`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              width="400"
              height="300"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {product.featured && (
              <span className="bg-chocolate-900/95 text-gold-400 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs backdrop-blur-xs flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Featured
              </span>
            )}
            {product.popular && !product.featured && (
              <span className="bg-strawberry-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                Popular
              </span>
            )}
          </div>

          {/* WhatsApp Direct Icon */}
          <a
            href={createProductWhatsAppUrl(product, selectedSize)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-emerald-600 hover:text-white text-emerald-600 flex items-center justify-center shadow-md transition-colors z-10"
            title="Inquire on WhatsApp"
            aria-label={`Inquire about ${product.name} on WhatsApp`}
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          
          {/* Size Pill Selector if product has multiple sizes */}
          {product.sizes.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(s.size);
                  }}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md transition-colors shrink-0 ${
                    selectedSize === s.size
                      ? 'bg-chocolate-800 text-white'
                      : 'bg-cream-200 text-chocolate-700 hover:bg-chocolate-100'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          )}

          {/* Title */}
          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-serif font-bold text-chocolate-900 text-base group-hover:text-strawberry-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-chocolate-600 text-xs line-clamp-2 leading-relaxed">
            {product.description}
          </p>

        </div>
      </div>

      {/* Footer: Price & Add Button */}
      <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-chocolate-100/50 mt-2">
        <div className="flex flex-col">
          <span className="font-serif font-bold text-chocolate-900 text-base">
            {formatPrice(currentPrice, product.priceLabel || "Price on request")}
          </span>
          {selectedSize && (
            <span className="text-[10px] text-chocolate-500 font-medium">
              Size: {selectedSize}
            </span>
          )}
        </div>

        {/* Food Delivery Style Quantity / Add Button */}
        {quantity > 0 ? (
          <div className="flex items-center bg-chocolate-800 text-cream-100 rounded-xl px-2 py-1 shadow-sm text-xs font-bold gap-2">
            <button
              onClick={handleDecrement}
              className="p-1 hover:text-pinksoft-300 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="min-w-[14px] text-center font-bold">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="p-1 hover:text-pinksoft-300 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 bg-strawberry-600 hover:bg-strawberry-700 active:scale-95 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>ADD</span>
          </button>
        )}
      </div>

    </div>
  );
};
