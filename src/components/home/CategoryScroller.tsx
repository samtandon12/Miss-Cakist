import React from 'react';
import { categories } from '../../data/categories';
import { CakeCategory } from '../../types/product';
import * as Icons from 'lucide-react';

interface CategoryScrollerProps {
  activeCategory: CakeCategory | 'all';
  onSelectCategory: (category: CakeCategory | 'all') => void;
}

export const CategoryScroller: React.FC<CategoryScrollerProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full bg-cream-100 border-y border-chocolate-100 py-3.5 sticky top-[61px] md:top-[69px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            
            // Dynamically resolve icon
            const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[cat.iconName] || Icons.Cake;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border ${
                  isActive
                    ? 'bg-chocolate-800 text-cream-100 border-chocolate-800 shadow-sm'
                    : 'bg-white text-chocolate-800 border-chocolate-100 hover:border-chocolate-300 hover:bg-cream-200'
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-strawberry-500' : 'text-chocolate-600'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
