import React from 'react';
import { Star, MessageSquare, Tag, MapPin, Truck } from 'lucide-react';
import { business } from '../../data/business';

export const TrustBar: React.FC = () => {
  const stats = [
    {
      icon: Star,
      iconColor: 'text-gold-500',
      title: `${business.rating} ★`,
      subtitle: 'Google Rating',
    },
    {
      icon: MessageSquare,
      iconColor: 'text-strawberry-600',
      title: `${business.reviewCount}+`,
      subtitle: 'Verified Reviews',
    },
    {
      icon: Tag,
      iconColor: 'text-chocolate-800',
      title: business.priceRange,
      subtitle: 'Price Range',
    },
    {
      icon: MapPin,
      iconColor: 'text-strawberry-600',
      title: 'Muzaffarpur',
      subtitle: 'Local Bakery',
    },
    {
      icon: Truck,
      iconColor: 'text-emerald-600',
      title: 'Delivery',
      subtitle: 'Available',
    },
  ];

  return (
    <section className="bg-white border-y border-chocolate-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-chocolate-100/70">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 ${
                  idx !== 0 ? 'pt-3 sm:pt-0 sm:pl-4 lg:pl-6' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center shrink-0 border border-chocolate-100/50">
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <div className="font-serif font-bold text-chocolate-900 text-sm sm:text-base leading-tight">
                    {stat.title}
                  </div>
                  <div className="text-xs text-chocolate-600 font-medium">
                    {stat.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
