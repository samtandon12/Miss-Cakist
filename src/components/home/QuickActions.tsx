import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Navigation, MessageCircle, UtensilsCrossed } from 'lucide-react';
import { business } from '../../data/business';
import { createGeneralWhatsAppUrl } from '../../utils/whatsapp';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      label: 'Call Us',
      sublabel: business.phone,
      icon: Phone,
      href: business.callUrl,
      isExternal: true,
      color: 'bg-chocolate-800 text-cream-100 hover:bg-chocolate-900',
      iconBg: 'bg-chocolate-700',
    },
    {
      label: 'Get Directions',
      sublabel: 'Bibiganj Road, Muzaffarpur',
      icon: Navigation,
      href: business.googleMapsDirectionsUrl,
      isExternal: true,
      color: 'bg-gold-500 text-chocolate-900 hover:bg-gold-600',
      iconBg: 'bg-gold-400/50 text-chocolate-900',
    },
    {
      label: 'WhatsApp',
      sublabel: 'Quick Order & Inquiry',
      icon: MessageCircle,
      href: createGeneralWhatsAppUrl(),
      isExternal: true,
      color: 'bg-emerald-600 text-white hover:bg-emerald-700',
      iconBg: 'bg-emerald-500',
    },
    {
      label: 'View Menu',
      sublabel: 'Explore all cakes & pastries',
      icon: UtensilsCrossed,
      href: '/menu',
      isExternal: false,
      color: 'bg-strawberry-600 text-white hover:bg-strawberry-700',
      iconBg: 'bg-strawberry-700',
    },
  ];

  return (
    <section className="py-8 bg-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {actions.map((action, idx) => {
            const Icon = action.icon;
            const content = (
              <div
                className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 ${action.color}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${action.iconBg}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm leading-snug truncate">
                    {action.label}
                  </div>
                  <div className="text-[11px] opacity-80 truncate font-normal">
                    {action.sublabel}
                  </div>
                </div>
              </div>
            );

            if (action.isExternal) {
              return (
                <a
                  key={idx}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={idx} to={action.href} className="block">
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
