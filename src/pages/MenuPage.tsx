import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/menu/ProductGrid';
import { FilterSidebar, FilterState } from '../components/menu/FilterSidebar';
import { MobileFilterModal } from '../components/menu/MobileFilterModal';
import { products } from '../data/products';
import { CakeCategory, Occasion } from '../types/product';
import { Filter, Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const [filters, setFilters] = useState<FilterState>({
    category: (searchParams.get('category') as CakeCategory) || 'all',
    occasion: (searchParams.get('occasion') as Occasion) || 'all',
    priceRange: 'all',
    sortBy: 'popular',
  });

  useEffect(() => {
    const queryCat = searchParams.get('category') as CakeCategory;
    const queryOcc = searchParams.get('occasion') as Occasion;
    const querySearch = searchParams.get('search');

    if (queryCat) setFilters((prev) => ({ ...prev, category: queryCat }));
    if (queryOcc) setFilters((prev) => ({ ...prev, occasion: queryOcc }));
    if (querySearch !== null) setSearchQuery(querySearch);
  }, [searchParams]);

  const handleReset = () => {
    setFilters({
      category: 'all',
      occasion: 'all',
      priceRange: 'all',
      sortBy: 'popular',
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Occasion filter
    if (filters.occasion !== 'all') {
      result = result.filter((p) => p.occasion.includes(filters.occasion as Occasion));
    }

    // Price range filter
    if (filters.priceRange === 'under-400') {
      result = result.filter((p) => p.price !== null && p.price < 400);
    } else if (filters.priceRange === '400-800') {
      result = result.filter((p) => p.price !== null && p.price >= 400 && p.price <= 800);
    } else if (filters.priceRange === 'request') {
      result = result.filter((p) => p.price === null);
    }

    // Sort
    if (filters.sortBy === 'popular') {
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    } else if (filters.sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => (a.price ?? 9999) - (b.price ?? 9999));
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return result;
  }, [filters, searchQuery]);

  return (
    <>
      <SEO
        title="Miss Cakist Menu | Cakes & Bakery in Muzaffarpur"
        description="Explore the Miss Cakist menu in Muzaffarpur, including homemade cakes, pastries and celebration treats."
        canonicalPath="/menu"
      />

      <main className="pt-24 pb-20 bg-cream-200 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ name: 'Menu' }]} />

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900 tracking-tight">
              Miss Cakist Bakery Menu
            </h1>
            <p className="text-chocolate-700 text-sm mt-1">
              Freshly baked homemade cakes, pastries, and Indian fusion delicacies in Muzaffarpur.
            </p>
          </div>

          {/* Search Bar & Mobile Filter Toggle */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
            
            {/* Search Input */}
            <div className="relative w-full flex-1">
              <Search className="w-4 h-4 text-strawberry-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cakes by name, flavour or occasion..."
                className="w-full bg-white text-chocolate-900 placeholder:text-chocolate-400 text-xs sm:text-sm font-medium pl-10 pr-4 py-3 rounded-2xl border border-chocolate-200/80 shadow-xs focus:outline-none focus:ring-2 focus:ring-strawberry-500"
              />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden w-full sm:w-auto flex items-center justify-center gap-2 bg-chocolate-800 text-cream-100 font-semibold px-5 py-3 rounded-2xl text-xs shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-strawberry-500" />
              <span>Filters & Sort ({filteredProducts.length})</span>
            </button>

          </div>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Desktop Left Sidebar Filter */}
            <div className="hidden lg:block lg:col-span-3 sticky top-24">
              <FilterSidebar
                filters={filters}
                onChange={(f) => setFilters(f)}
                onReset={handleReset}
                totalResults={filteredProducts.length}
              />
            </div>

            {/* Right Product Grid */}
            <div className="lg:col-span-9">
              <ProductGrid products={filteredProducts} />
            </div>

          </div>

        </div>
      </main>

      {/* Mobile Filter Modal */}
      <MobileFilterModal
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        onChange={(f) => setFilters(f)}
        onReset={handleReset}
        totalResults={filteredProducts.length}
      />
    </>
  );
};
