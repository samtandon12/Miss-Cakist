import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/menu/ProductGrid';
import { products } from '../data/products';
import { Coffee } from 'lucide-react';

export const PastriesPage: React.FC = () => {
  const pastryProducts = products.filter((p) => p.category === 'pastries');

  return (
    <>
      <SEO
        title="Pastries in Muzaffarpur | Miss Cakist"
        description="Explore pastries and bakery treats from Miss Cakist in Muzaffarpur, Bihar."
        canonicalPath="/menu/pastries"
      />

      <main className="pt-24 pb-20 bg-cream-200 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs
            items={[{ name: 'Menu', path: '/menu' }, { name: 'Fresh Pastries' }]}
          />

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-chocolate-100 shadow-soft mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pinksoft-200 text-strawberry-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Coffee className="w-3.5 h-3.5" />
              <span>Daily Fresh Single Slices</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900 tracking-tight">
              Fresh Pastries in Muzaffarpur
            </h1>
            <p className="text-chocolate-700 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              Explore pastries and bakery treats from Miss Cakist in Muzaffarpur, Bihar. Baked fresh every morning with light whipped cream and premium toppings.
            </p>
          </div>

          <ProductGrid products={pastryProducts} />

        </div>
      </main>
    </>
  );
};
