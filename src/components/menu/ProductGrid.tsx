import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = "No cakes or bakery items found matching your criteria.",
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-3xl border border-chocolate-100 shadow-sm max-w-lg mx-auto my-8">
        <div className="w-14 h-14 rounded-full bg-pinksoft-100 text-strawberry-600 flex items-center justify-center mx-auto mb-4">
          <UtensilsCrossed className="w-7 h-7" />
        </div>
        <h3 className="font-serif text-xl font-bold text-chocolate-900 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-chocolate-600 text-xs sm:text-sm mb-6">
          Try searching for different flavours like Chocolate, Strawberry, or Rasmalai.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center justify-center bg-strawberry-600 hover:bg-strawberry-700 text-white font-semibold px-6 py-2.5 rounded-full text-xs transition-colors shadow-xs"
        >
          Explore All Cakes
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
