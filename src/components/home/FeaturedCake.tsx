import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, MessageCircle, ArrowRight, Sparkles, Clock, Check } from 'lucide-react';
import { products } from '../../data/products';
import { createProductWhatsAppUrl } from '../../utils/whatsapp';

export const FeaturedCake: React.FC = () => {
  const featuredProduct = products.find((p) => p.id === 'royal-rasmalai-fusion') || products[0];

  return (
    <section className="py-16 bg-gradient-to-b from-cream-100 to-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pinksoft-200/80 text-strawberry-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Crown className="w-3.5 h-3.5" />
            <span>Customer Favourite</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900 tracking-tight">
            Royal Rasmalai Fusion Cake
          </h2>
          <p className="text-chocolate-700 text-sm sm:text-base mt-2">
            One of our standout celebration cakes, loved by customers across Muzaffarpur.
          </p>
        </div>

        {/* Feature Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-card border border-chocolate-100 overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-md group">
                <img
                  src={featuredProduct.image}
                  alt="Royal Rasmalai Fusion Cake from Miss Cakist in Muzaffarpur"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width="600"
                  height="600"
                />
                <div className="absolute top-4 left-4 bg-chocolate-900/90 backdrop-blur-md text-gold-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Signature Recipe</span>
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <span className="text-xs font-bold tracking-widest text-strawberry-600 uppercase">
                  Indian Fusion Special
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate-900 mt-1">
                  {featuredProduct.name}
                </h3>
                <p className="text-chocolate-700 text-sm sm:text-base mt-3 leading-relaxed">
                  {featuredProduct.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-3 text-xs text-chocolate-800 pt-2">
                <div className="flex items-center gap-2 bg-cream-200/80 p-2.5 rounded-xl border border-chocolate-100">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real Cardamom & Saffron</span>
                </div>
                <div className="flex items-center gap-2 bg-cream-200/80 p-2.5 rounded-xl border border-chocolate-100">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Fresh Soaked Rasmalai</span>
                </div>
                <div className="flex items-center gap-2 bg-cream-200/80 p-2.5 rounded-xl border border-chocolate-100">
                  <Clock className="w-4 h-4 text-strawberry-600 shrink-0" />
                  <span>Freshly Baked to Order</span>
                </div>
                <div className="flex items-center gap-2 bg-cream-200/80 p-2.5 rounded-xl border border-chocolate-100">
                  <Crown className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Custom Sizes Available</span>
                </div>
              </div>

              {/* Pricing Notice */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-xl sm:text-2xl font-serif font-bold text-strawberry-600">
                  Price on request
                </span>
                <span className="text-xs text-chocolate-600">
                  (Customized based on weight & design)
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  to={`/product/${featuredProduct.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-chocolate-800 hover:bg-chocolate-900 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all shadow-sm"
                >
                  <span>View Cake Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={createProductWhatsAppUrl(featuredProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
