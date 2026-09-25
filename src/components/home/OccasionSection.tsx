import React from 'react';
import { Link } from 'react-router-dom';
import { PartyPopper, Heart, Sparkles, Gift, Users, Smile, ArrowRight } from 'lucide-react';

export const OccasionSection: React.FC = () => {
  const occasions = [
    {
      title: 'Birthday',
      description: 'Make birthdays unforgettable with personalized theme & photo cakes.',
      icon: PartyPopper,
      link: '/menu/birthday-cakes',
      badge: 'Most Popular',
      color: 'from-pinksoft-200 to-pinksoft-100 text-chocolate-900 border-pinksoft-300',
    },
    {
      title: 'Anniversary',
      description: 'Romantic multi-tier and elegant flower cakes for milestones.',
      icon: Heart,
      link: '/menu?occasion=anniversary',
      badge: 'Romantic',
      color: 'from-cream-100 to-pinksoft-100 text-chocolate-900 border-pinksoft-200',
    },
    {
      title: 'Celebration',
      description: 'Festive treats, rasmalai fusion cakes & dessert boxes.',
      icon: Sparkles,
      link: '/menu?category=rasmalai-cakes',
      badge: 'Special',
      color: 'from-cream-100 to-cream-300 text-chocolate-900 border-chocolate-200',
    },
    {
      title: 'Surprise',
      description: 'Cute Bento bento lunchbox cakes delivered to surprise loved ones.',
      icon: Gift,
      link: '/menu?category=bento-cakes',
      badge: 'Cute Bento',
      color: 'from-pinksoft-100 to-cream-200 text-chocolate-900 border-pinksoft-200',
    },
    {
      title: 'Family Moment',
      description: 'Delicious chocolate truffle & fruit cakes everyone shares.',
      icon: Users,
      link: '/menu?category=fruit-cakes',
      badge: 'Family Size',
      color: 'from-cream-200 to-cream-100 text-chocolate-900 border-chocolate-200',
    },
    {
      title: 'Just Because',
      description: 'Fresh daily single pastry slices and small sweet indulgences.',
      icon: Smile,
      link: '/menu/pastries',
      badge: 'Fresh Pastries',
      color: 'from-pinksoft-200/50 to-cream-100 text-chocolate-900 border-pinksoft-200',
    },
  ];

  return (
    <section className="py-16 bg-cream-200 border-t border-chocolate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-wider text-strawberry-600 uppercase">
              Handcrafted With Love
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900 tracking-tight mt-1">
              Something Sweet for Every Occasion
            </h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-chocolate-800 hover:text-strawberry-600 transition-colors"
          >
            <span>Browse All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Occasion Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {occasions.map((occ, idx) => {
            const Icon = occ.icon;
            return (
              <Link
                key={idx}
                to={occ.link}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${occ.color} border shadow-soft hover:shadow-card transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center text-chocolate-900 shadow-xs group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-strawberry-600" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-chocolate-800 border border-chocolate-100/50">
                    {occ.badge}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-chocolate-900 mb-1.5 group-hover:text-strawberry-600 transition-colors">
                  {occ.title}
                </h3>
                <p className="text-chocolate-700 text-xs sm:text-sm leading-relaxed mb-4">
                  {occ.description}
                </p>

                <div className="inline-flex items-center gap-1 text-xs font-bold text-chocolate-900 group-hover:translate-x-1 transition-transform">
                  <span>Explore {occ.title} Cakes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
