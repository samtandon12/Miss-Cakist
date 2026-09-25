import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { business } from '../data/business';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { Phone, MapPin, Clock, Navigation, MessageCircle, Star, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Miss Cakist Muzaffarpur | Address, Phone & Hours"
        description="Find Miss Cakist in Muzaffarpur, Bihar. View the address, phone number, opening hours and ways to contact the bakery."
        canonicalPath="/contact"
      />

      <main className="pt-24 pb-20 bg-cream-200 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ name: 'Contact & Location' }]} />

          {/* Header */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-chocolate-100 shadow-soft mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-strawberry-600">
              Get in Touch
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900 tracking-tight mt-1">
              Miss Cakist Muzaffarpur
            </h1>
            <p className="text-chocolate-700 text-sm sm:text-base mt-2 max-w-2xl">
              We are located in Brahmpura, Muzaffarpur. Reach out for custom cake orders, flavor inquiries, and instant delivery assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Details Card Left */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-chocolate-100 shadow-card space-y-6">
              
              <div className="flex items-center gap-2 text-gold-500 font-bold text-sm bg-pinksoft-100/70 p-3 rounded-2xl border border-pinksoft-200">
                <Star className="w-4 h-4 fill-gold-500" />
                <span className="text-chocolate-900">{business.rating} ★ Google Rated ({business.reviewCount} Reviews)</span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pinksoft-100 text-strawberry-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-chocolate-900 text-base">
                    Bakery Address
                  </h3>
                  <p className="text-xs sm:text-sm text-chocolate-700 leading-relaxed mt-1">
                    {business.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-chocolate-100 text-chocolate-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-chocolate-900 text-base">
                    Phone Number
                  </h3>
                  <a
                    href={business.callUrl}
                    className="text-sm font-bold text-strawberry-600 hover:underline block mt-0.5"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cream-200 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-chocolate-900 text-base">
                    Opening Hours
                  </h3>
                  <p className="text-xs sm:text-sm text-chocolate-700 mt-0.5">
                    {business.hoursDisplay}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-chocolate-100">
                <a
                  href={business.callUrl}
                  className="flex items-center justify-center gap-2 bg-chocolate-800 hover:bg-chocolate-900 text-white py-3 rounded-2xl font-bold text-xs shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Us</span>
                </a>
                <a
                  href={createGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold text-xs shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={business.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-chocolate-900 py-3 rounded-2xl font-bold text-xs shadow-xs"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Directions</span>
                </a>
              </div>

            </div>

            {/* Location Visual Card Right */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-chocolate-100 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-strawberry-600 font-bold text-sm">
                <Navigation className="w-4 h-4" />
                <span>Find Us on Map</span>
              </div>
              
              <div className="bg-cream-200 p-6 rounded-2xl border border-chocolate-100 text-center space-y-3">
                <MapPin className="w-8 h-8 text-strawberry-600 mx-auto" />
                <h4 className="font-serif font-bold text-chocolate-900 text-base">
                  Anandpuri Bibiganj Road
                </h4>
                <p className="text-xs text-chocolate-600">
                  Near Naunihal International School, Muzaffarpur, Bihar 842001
                </p>
                <a
                  href={business.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-chocolate-800 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xs hover:bg-chocolate-900"
                >
                  <span>Open Directions</span>
                </a>
              </div>

              <div className="text-[11px] text-chocolate-500 text-center">
                Delivery Available Across Muzaffarpur • Pocket Friendly (₹1–200 / person)
              </div>
            </div>

          </div>

        </div>
      </main>
    </>
  );
};
