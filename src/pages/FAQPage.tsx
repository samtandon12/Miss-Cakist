import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';

export const FAQPage: React.FC = () => {
  return (
    <>
      <SEO
        title="FAQ | Frequently Asked Questions | Miss Cakist"
        description="Find answers to common questions about ordering homemade cakes, delivery, location, and opening hours at Miss Cakist in Muzaffarpur."
        canonicalPath="/faq"
      />

      <main className="pt-24 pb-20 bg-cream-200 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ name: 'FAQ' }]} />

          <div className="bg-white rounded-3xl p-8 border border-chocolate-100 shadow-soft mb-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-pinksoft-100 text-strawberry-600 flex items-center justify-center mx-auto mb-2">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-chocolate-900">
              Frequently Asked Questions
            </h1>
            <p className="text-chocolate-700 text-xs sm:text-sm max-w-lg mx-auto">
              Everything you need to know about ordering homemade cakes and pastries from Miss Cakist in Muzaffarpur.
            </p>
          </div>

          <FAQAccordion />

          <div className="mt-12 bg-white rounded-2xl p-6 text-center border border-chocolate-100 shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-chocolate-900 text-lg">
              Have a custom question or order request?
            </h3>
            <p className="text-xs text-chocolate-600">
              Connect with Miss Cakist directly on WhatsApp for immediate help.
            </p>
            <a
              href={createGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-full transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>
      </main>
    </>
  );
};
