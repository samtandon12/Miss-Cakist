import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/menu/ProductGrid';
import { products } from '../data/products';
import { CakeCategory } from '../types/product';
import { Cake, Sparkles } from 'lucide-react';

export const CakesPage: React.FC = () => {
  const [selectedSubCat, setSelectedSubCat] = useState<string>('all');

  const cakeProducts = products.filter((p) => p.category !== 'pastries');

  const subCategories = [
    { id: 'all', name: 'All Cakes' },
    { id: 'chocolate-cakes', name: 'Chocolate' },
    { id: 'rasmalai-cakes', name: 'Rasmalai Fusion' },
    { id: 'fruit-cakes', name: 'Fruit Cakes' },
    { id: 'birthday-cakes', name: 'Birthday' },
    { id: 'bento-cakes', name: 'Bento Cakes' },
  ];

  const displayedProducts = selectedSubCat === 'all'
    ? cakeProducts
    : cakeProducts.filter((p) => p.category === selectedSubCat);

  return (
    <>
      <SEO
        title="Cakes in Muzaffarpur | Miss Cakist"
        description="Explore homemade cakes in Muzaffarpur from Miss Cakist, including chocolate, fruit, birthday and celebration cakes."
        canonicalPath="/menu/cakes"
      />

      <main className="pt-24 pb-20 bg-cream-200 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ name: 'Menu', path: '/menu' }, { name: 'Cakes' }]} />

          {/* Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-chocolate-100 shadow-soft mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pinksoft-200 text-strawberry-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Cake className="w-3.5 h-3.5" />
              <span>Muzaffarpur Bakery</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900 tracking-tight">
              Cakes in Muzaffarpur
            </h1>
            <p className="text-chocolate-700 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              Explore homemade cakes from Miss Cakist for birthdays, anniversaries, celebrations and special moments in Muzaffarpur. Freshly baked to order with premium ingredients.
            </p>

            {/* Sub category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6">
              {subCategories.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSubCat(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedSubCat === tab.id
                      ? 'bg-chocolate-800 text-white shadow-xs'
                      : 'bg-cream-200 text-chocolate-800 hover:bg-chocolate-100'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <ProductGrid products={displayedProducts} />

        </div>
      </main>
    </>
  );
};
