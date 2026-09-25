import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { business } from '../data/business';
import { Cake, Heart, Sparkles, Star, MapPin, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About Miss Cakist | Homemade Bakery in Muzaffarpur"
        description="Learn about Miss Cakist, a homemade cake and bakery brand in Muzaffarpur, Bihar, creating fresh cakes for birthdays and special moments."
        canonicalPath="/about"
      />

      <main className="pt-24 pb-20 bg-cream-200 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ name: 'About Miss Cakist' }]} />

          {/* Hero Banner */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-chocolate-100 shadow-card mb-10 text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pinksoft-200 text-strawberry-700 text-xs font-bold uppercase tracking-wider">
              <Cake className="w-4 h-4" />
              <span>Homemade Bakery Studio</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-chocolate-900 tracking-tight">
              Homemade Cakes for Every Celebration
            </h1>
            <p className="text-chocolate-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Miss Cakist is a homemade cake and bakery brand serving customers in Muzaffarpur, Bihar, with cakes and bakery treats for birthdays, celebrations and special moments.
            </p>
          </div>

          {/* Features / Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-chocolate-100 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-pinksoft-100 text-strawberry-600 flex items-center justify-center font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-chocolate-900 text-lg">Freshly Baked</h3>
              <p className="text-chocolate-700 text-xs sm:text-sm leading-relaxed">
                Every cake and slice is handcrafted fresh upon order using selected quality ingredients and authentic recipes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-chocolate-100 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gold-400/20 text-gold-600 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-chocolate-900 text-lg">Signature Flavours</h3>
              <p className="text-chocolate-700 text-xs sm:text-sm leading-relaxed">
                From our customer favourite Royal Rasmalai Fusion Cake to rich dark chocolate truffle, we create unforgettable sweet moments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-chocolate-100 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cream-200 text-chocolate-800 flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6 text-strawberry-600" />
              </div>
              <h3 className="font-serif font-bold text-chocolate-900 text-lg">Rooted in Muzaffarpur</h3>
              <p className="text-chocolate-700 text-xs sm:text-sm leading-relaxed">
                Located near Naunihal International School on Anandpuri Bibiganj Road, providing reliable delivery across the city.
              </p>
            </div>
          </div>

          {/* Verified Google Business Snapshot */}
          <div className="bg-gradient-to-r from-chocolate-900 to-chocolate-800 text-cream-100 rounded-3xl p-8 sm:p-10 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gold-400 font-bold text-lg">
                <Star className="w-5 h-5 fill-gold-400" />
                <span>{business.rating} Rating ({business.reviewCount} Reviews on Google)</span>
              </div>
              <p className="text-chocolate-200 text-xs sm:text-sm max-w-md">
                Rated highly by local dessert lovers for taste, design, and personalized service in Muzaffarpur.
              </p>
            </div>

            <Link
              to="/menu"
              className="bg-strawberry-600 hover:bg-strawberry-700 text-white font-bold text-xs px-6 py-3.5 rounded-full shadow-md transition-colors shrink-0"
            >
              Explore Our Cake Menu
            </Link>
          </div>

        </div>
      </main>
    </>
  );
};
