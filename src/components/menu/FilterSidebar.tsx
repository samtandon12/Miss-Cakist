import React from 'react';
import { categories } from '../../data/categories';
import { CakeCategory, Occasion } from '../../types/product';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

export interface FilterState {
  category: CakeCategory | 'all';
  occasion: Occasion | 'all';
  priceRange: 'all' | 'under-400' | '400-800' | 'request';
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'name-asc';
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
}) => {
  const occasions: { id: Occasion | 'all'; label: string }[] = [
    { id: 'all', label: 'All Occasions' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'celebration', label: 'Celebration' },
    { id: 'surprise', label: 'Surprise' },
    { id: 'family', label: 'Family Moment' },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-chocolate-100 shadow-soft space-y-6">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-chocolate-100">
        <div className="flex items-center gap-2 text-chocolate-900 font-serif font-bold text-base">
          <Filter className="w-4 h-4 text-strawberry-600" />
          <span>Filters</span>
          <span className="text-xs bg-cream-200 text-chocolate-700 px-2 py-0.5 rounded-full font-sans font-normal ml-1">
            {totalResults} items
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-chocolate-600 hover:text-strawberry-600 flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-800 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
          className="w-full bg-cream-100 text-chocolate-900 text-xs font-semibold px-3 py-2 rounded-xl border border-chocolate-200 focus:outline-none focus:ring-2 focus:ring-strawberry-500"
        >
          <option value="popular">Most Popular</option>
          <option value="name-asc">Alphabetical (A-Z)</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-800 mb-2">
          Category
        </label>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange({ ...filters, category: cat.id })}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                filters.category === cat.id
                  ? 'bg-chocolate-800 text-white font-semibold'
                  : 'text-chocolate-800 hover:bg-cream-200'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Occasions */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-800 mb-2">
          Occasion
        </label>
        <div className="space-y-1">
          {occasions.map((occ) => (
            <button
              key={occ.id}
              onClick={() => onChange({ ...filters, occasion: occ.id })}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filters.occasion === occ.id
                  ? 'bg-strawberry-600 text-white font-semibold'
                  : 'text-chocolate-800 hover:bg-cream-200'
              }`}
            >
              {occ.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-800 mb-2">
          Price Range
        </label>
        <div className="space-y-1">
          {[
            { id: 'all', label: 'All Prices' },
            { id: 'under-400', label: 'Under ₹400' },
            { id: '400-800', label: '₹400 – ₹800' },
            { id: 'request', label: 'Price on Request' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => onChange({ ...filters, priceRange: p.id as FilterState['priceRange'] })}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filters.priceRange === p.id
                  ? 'bg-chocolate-800 text-white font-semibold'
                  : 'text-chocolate-800 hover:bg-cream-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
