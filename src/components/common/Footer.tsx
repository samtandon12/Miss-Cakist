import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, MessageCircle, Star, Cake, Navigation } from 'lucide-react';
import { business } from '../../data/business';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-chocolate-900 text-cream-200 pt-16 pb-12 border-t border-chocolate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-chocolate-800/80">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-strawberry-600 flex items-center justify-center text-white">
                <Cake className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                MISS CAKIST
              </span>
            </Link>
            <p className="text-chocolate-200 text-sm max-w-sm leading-relaxed">
              Homemade cakes and fresh bakery treats in Muzaffarpur, Bihar. Freshly baked with premium ingredients for your special celebrations.
            </p>

            {/* Google Rating Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-chocolate-800/90 border border-chocolate-700 text-xs">
              <div className="flex items-center text-gold-400">
                <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                <span className="ml-1 font-bold text-white">{business.rating}</span>
              </div>
              <span className="text-chocolate-200">({business.reviewCount} Google Reviews)</span>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white tracking-wide uppercase text-xs mb-4">
              Explore Menu
            </h3>
            <ul className="space-y-2.5 text-sm text-chocolate-200">
              <li>
                <Link to="/" className="hover:text-pinksoft-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-pinksoft-300 transition-colors">
                  Full Menu
                </Link>
              </li>
              <li>
                <Link to="/menu/cakes" className="hover:text-pinksoft-300 transition-colors">
                  Cakes in Muzaffarpur
                </Link>
              </li>
              <li>
                <Link to="/menu/birthday-cakes" className="hover:text-pinksoft-300 transition-colors">
                  Birthday Cakes
                </Link>
              </li>
              <li>
                <Link to="/menu/pastries" className="hover:text-pinksoft-300 transition-colors">
                  Fresh Pastries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Information */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white tracking-wide uppercase text-xs mb-4">
              Information
            </h3>
            <ul className="space-y-2.5 text-sm text-chocolate-200">
              <li>
                <Link to="/about" className="hover:text-pinksoft-300 transition-colors">
                  About Miss Cakist
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-pinksoft-300 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-pinksoft-300 transition-colors">
                  Location & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Order */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white tracking-wide uppercase text-xs mb-4">
              Contact & Order
            </h3>
            <ul className="space-y-3 text-sm text-chocolate-200">
              <li>
                <a
                  href={business.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-pinksoft-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp Order</span>
                </a>
              </li>
              <li>
                <a href={business.callUrl} className="flex items-center gap-2 hover:text-pinksoft-300 transition-colors">
                  <Phone className="w-4 h-4 text-strawberry-500 shrink-0" />
                  <span>{business.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={business.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-pinksoft-300 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Get Directions</span>
                </a>
              </li>
              <li className="pt-2 text-xs text-chocolate-300 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-strawberry-500 shrink-0 mt-0.5" />
                <span>Anandpuri Bibiganj Road, Near Naunihal International School, Muzaffarpur, Bihar 842001</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-chocolate-400">
          <p>© {new Date().getFullYear()} Miss Cakist. All rights reserved. Homemade Bakery in Muzaffarpur, Bihar.</p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:underline">Contact</Link>
            <span>•</span>
            <Link to="/faq" className="hover:underline">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
