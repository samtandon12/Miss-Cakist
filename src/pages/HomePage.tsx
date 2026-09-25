import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Hero } from '../components/home/Hero';
import { TrustBar } from '../components/home/TrustBar';
import { QuickActions } from '../components/home/QuickActions';
import { CategoryScroller } from '../components/home/CategoryScroller';
import { FeaturedCake } from '../components/home/FeaturedCake';
import { OccasionSection } from '../components/home/OccasionSection';
import { BusinessInfoSection } from '../components/home/BusinessInfoSection';
import { ProductGrid } from '../components/menu/ProductGrid';
import { products } from '../data/products';
import { CakeCategory } from '../types/product';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CakeCategory | 'all'>('all');

  const filteredProducts = selectedCategory === 'all'
    ? products.filter((p) => p.featured || p.popular).slice(0, 8)
    : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <SEO
        title="Miss Cakist | Homemade Cakes & Bakery in Muzaffarpur"
        description="Order homemade cakes and bakery treats from Miss Cakist in Muzaffarpur, Bihar. Explore cakes for birthdays, celebrations and special moments."
        canonicalPath="/"
      />

      <main className="min-h-screen">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Trust Bar */}
        <TrustBar />

        {/* 3. Quick Actions */}
        <QuickActions />

        {/* 4. Category Scroller */}
        <CategoryScroller
          activeCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* 5. Featured Cake (Royal Rasmalai Fusion Cake) */}
        <FeaturedCake />

        {/* 6. Popular Cake Grid */}
        <section className="py-14 bg-cream-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold tracking-wider text-strawberry-600 uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Freshly Baked
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate-900 tracking-tight">
                  {selectedCategory === 'all' ? 'Popular Cakes & Pastries' : `Category: ${selectedCategory}`}
                </h2>
              </div>
              <Link
                to="/menu"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-chocolate-800 hover:text-strawberry-600 transition-colors"
              >
                <span>View Full Menu ({products.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <ProductGrid products={filteredProducts} />

            <div className="text-center mt-10 sm:hidden">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-chocolate-800 text-cream-100 font-semibold px-6 py-3 rounded-full text-xs"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Occasion Section */}
        <OccasionSection />

        {/* 8. Google Profile Business Info */}
        <BusinessInfoSection />
      </main>
    </>
  );
};
