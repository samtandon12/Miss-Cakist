import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/menu/ProductGrid';
import { products } from '../data/products';
import { PartyPopper, MessageCircle, Gift } from 'lucide-react';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';

export const BirthdayCakesPage: React.FC = () => {
  const birthdayProducts = products.filter(
    (p) => p.category === 'birthday-cakes' || p.occasion.includes('birthday')
  );

  return (
    <>
      <SEO
        title="Birthday Cakes in Muzaffarpur | Miss Cakist"
        description="Find homemade birthday cakes in Muzaffarpur from Miss Cakist for special celebrations and memorable moments."
        canonicalPath="/menu/birthday-cakes"
      />

      <main className="pt-24 pb-20 bg-cream-200 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs
            items={[{ name: 'Menu', path: '/menu' }, { name: 'Cakes', path: '/menu/cakes' }, { name: 'Birthday Cakes' }]}
          />

          {/* Banner */}
          <div className="bg-gradient-to-r from-strawberry-600 to-chocolate-900 rounded-3xl p-6 sm:p-10 text-white shadow-card mb-8 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-cream-100 text-xs font-bold uppercase tracking-wider">
                <PartyPopper className="w-3.5 h-3.5 text-gold-400" />
                <span>Celebration Special</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                Birthday Cakes in Muzaffarpur
              </h1>
              <p className="text-pinksoft-100 text-sm sm:text-base leading-relaxed">
                Find homemade birthday cakes in Muzaffarpur from Miss Cakist for special celebrations and memorable moments. Customize weight, flavor, and theme design.
              </p>

              <div className="pt-2">
                <a
                  href={createGeneralWhatsAppUrl("Hello Miss Cakist, I want to order a custom birthday cake in Muzaffarpur.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Request Custom Birthday Design</span>
                </a>
              </div>
            </div>
          </div>

          {/* Birthday Cake Inspiration Note */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-chocolate-100 shadow-xs mb-8 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-pinksoft-100 text-strawberry-600 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm text-chocolate-800 leading-relaxed">
              <strong className="font-semibold text-chocolate-900">Custom Theme & Name Piping:</strong> Have a specific birthday theme or photo design in mind? Share your inspiration photo with Miss Cakist on WhatsApp for custom pricing!
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid products={birthdayProducts} />

        </div>
      </main>
    </>
  );
};
