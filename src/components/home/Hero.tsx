import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { business } from '../../data/business';
import { createGeneralWhatsAppUrl } from '../../utils/whatsapp';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-b from-cream-100 via-cream-200 to-cream-100">
      {/* Decorative background blur blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-pinksoft-300/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-5 left-5 w-80 h-80 bg-gold-400/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Local Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pinksoft-200/70 border border-pinksoft-300 text-chocolate-900 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-strawberry-600" />
              <span>Homemade Bakery in Muzaffarpur, Bihar</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-chocolate-900 leading-[1.15]">
              Homemade Cakes, <br className="hidden sm:inline" />
              <span className="text-strawberry-600 italic">Made for Your Special</span> Moments.
            </h1>

            {/* Supporting Text */}
            <p className="text-chocolate-800 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Freshly made cakes and bakery treats in Muzaffarpur for birthdays, celebrations and every sweet moment.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/menu/cakes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-strawberry-600 hover:bg-strawberry-700 text-white font-semibold px-7 py-3.5 rounded-full shadow-card hover:shadow-floating transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
              >
                <span>Explore Cakes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={createGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-chocolate-800 hover:bg-chocolate-900 text-cream-100 font-semibold px-7 py-3.5 rounded-full shadow-soft hover:shadow-card transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Trust Element */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm font-medium text-chocolate-800">
              <div className="flex items-center gap-1 text-gold-500 bg-white/80 px-3 py-1.5 rounded-full shadow-xs border border-chocolate-100">
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <span className="font-bold text-chocolate-900 ml-1.5">{business.rating} on Google</span>
              </div>
              <span className="text-chocolate-400">•</span>
              <div className="flex items-center gap-1 text-chocolate-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-strawberry-600" />
                <span>{business.reviewCount} Reviews</span>
              </div>
            </div>

          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Outer Glow Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-pinksoft-300 via-gold-400 to-strawberry-500 rounded-3xl blur opacity-30"></div>

              {/* Card Container */}
              <div className="relative bg-white rounded-3xl p-3 sm:p-4 shadow-card border border-chocolate-100 overflow-hidden">
                <img
                  src="/images/miss-cakist-royal-rasmalai-fusion-cake.webp"
                  alt="Royal Rasmalai Fusion Cake from Miss Cakist in Muzaffarpur"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl transform hover:scale-102 transition-transform duration-500"
                  loading="eager"
                  width="600"
                  height="600"
                />

                {/* Floating Feature Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-lg border border-chocolate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-strawberry-600 uppercase">
                      Bestseller Special
                    </span>
                    <h3 className="font-serif font-bold text-chocolate-900 text-sm sm:text-base leading-tight">
                      Royal Rasmalai Fusion Cake
                    </h3>
                  </div>
                  <span className="bg-pinksoft-100 text-chocolate-900 font-bold text-xs px-2.5 py-1 rounded-md border border-pinksoft-200 shrink-0">
                    Price on Request
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
