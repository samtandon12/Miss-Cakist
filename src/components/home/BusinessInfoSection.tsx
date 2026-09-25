import React from 'react';
import { Star, MapPin, Clock, Phone, Navigation, MessageCircle, Truck, Tag, ShieldCheck } from 'lucide-react';
import { business } from '../../data/business';
import { createGeneralWhatsAppUrl } from '../../utils/whatsapp';

export const BusinessInfoSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-chocolate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-cream-100 via-cream-200 to-pinksoft-100 rounded-3xl p-6 sm:p-10 border border-chocolate-100/80 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Details Left */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-strawberry-600 text-white text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Bakery Listing</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900 tracking-tight">
                  Miss Cakist in Muzaffarpur
                </h2>
                <p className="text-chocolate-700 text-sm sm:text-base mt-2">
                  Homemade bakery and custom cake studio located near Naunihal International School, Bibiganj.
                </p>
              </div>

              {/* Rating & Category Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                
                {/* Rating */}
                <div className="bg-white p-4 rounded-2xl border border-chocolate-100 shadow-xs">
                  <div className="flex items-center gap-1 text-gold-500 font-bold text-lg">
                    <Star className="w-5 h-5 fill-gold-500 text-gold-500" />
                    <span>{business.rating} ★</span>
                  </div>
                  <div className="text-xs text-chocolate-600 font-medium mt-0.5">
                    {business.reviewCount} Google Reviews
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white p-4 rounded-2xl border border-chocolate-100 shadow-xs">
                  <div className="flex items-center gap-1.5 text-chocolate-900 font-bold text-sm">
                    <Clock className="w-4 h-4 text-strawberry-600" />
                    <span>Closes 10:00 PM</span>
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">
                    Open Today
                  </div>
                </div>

                {/* Price */}
                <div className="bg-white p-4 rounded-2xl border border-chocolate-100 shadow-xs col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-1.5 text-chocolate-900 font-bold text-sm">
                    <Tag className="w-4 h-4 text-chocolate-800" />
                    <span>{business.priceRange}</span>
                  </div>
                  <div className="text-xs text-chocolate-600 font-medium mt-1">
                    Pocket Friendly
                  </div>
                </div>

              </div>

              {/* Location Detail */}
              <div className="flex items-start gap-3 bg-white/80 p-4 rounded-2xl border border-chocolate-100">
                <MapPin className="w-5 h-5 text-strawberry-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-chocolate-800 leading-relaxed">
                  <strong className="block text-chocolate-900 font-semibold mb-0.5">Location Address:</strong>
                  {business.address}
                </div>
              </div>

              {/* Features List */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-chocolate-800 pt-1">
                <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Home Delivery Available</span>
                </div>
                <div className="flex items-center gap-1.5 bg-chocolate-800 text-cream-100 px-3 py-1.5 rounded-full">
                  <span>Bakery & Cake Shop</span>
                </div>
              </div>

            </div>

            {/* Actions Right Card */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-chocolate-100 shadow-md space-y-4">
              <h3 className="font-serif font-bold text-chocolate-900 text-lg">
                Connect With Us Directly
              </h3>
              <p className="text-xs text-chocolate-600">
                Have questions about custom cake designs or flavor availability? Reach out to Miss Cakist now.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={business.callUrl}
                  className="flex items-center justify-between bg-chocolate-800 hover:bg-chocolate-900 text-cream-100 p-3.5 rounded-xl text-sm font-semibold transition-all shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-strawberry-500" />
                    <span>Call +91 99555 27910</span>
                  </div>
                  <span className="text-xs bg-chocolate-700 px-2 py-0.5 rounded text-chocolate-200">Instant</span>
                </a>

                <a
                  href={createGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-xl text-sm font-semibold transition-all shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </div>
                  <span className="text-xs bg-emerald-500/40 px-2 py-0.5 rounded">Fast Reply</span>
                </a>

                <a
                  href={business.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-cream-200 hover:bg-cream-300 text-chocolate-900 p-3.5 rounded-xl text-sm font-semibold transition-all border border-chocolate-200"
                >
                  <div className="flex items-center gap-2.5">
                    <Navigation className="w-4 h-4 text-gold-600" />
                    <span>Get Directions on Google Maps</span>
                  </div>
                  <span className="text-xs text-chocolate-600">Map</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
