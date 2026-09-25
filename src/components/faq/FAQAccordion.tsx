import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { business } from '../../data/business';

export interface FAQItem {
  question: string;
  answer: string;
}

export const defaultFaqs: FAQItem[] = [
  {
    question: "Where is Miss Cakist located?",
    answer: `Miss Cakist is located at ${business.address}. We are conveniently situated near Naunihal International School on Anandpuri Bibiganj Road in Muzaffarpur, Bihar.`
  },
  {
    question: "What type of cakes does Miss Cakist offer?",
    answer: "We offer freshly baked homemade cakes including our signature Royal Rasmalai Fusion Cake, Chocolate Truffle, Black Forest, Red Velvet, Butterscotch, Strawberry, Fresh Pineapple, Bento lunchbox cakes, custom designer birthday cakes, and daily fresh pastry slices."
  },
  {
    question: "Can I order a birthday cake?",
    answer: "Yes! Custom birthday cakes are our specialty. You can choose your favourite flavour, size (500g, 1kg, 2kg+), and design theme. You can place your order online or connect directly via WhatsApp."
  },
  {
    question: "How can I contact Miss Cakist?",
    answer: `You can call us directly at ${business.phone} or send us a WhatsApp message at +91 ${business.phoneRaw}. We are always happy to help with your cake orders.`
  },
  {
    question: "How can I order through WhatsApp?",
    answer: "Simply browse our website, add items to your cake box, or click the 'Order on WhatsApp' button on any cake product page. Our website automatically prepares a formatted WhatsApp order message with your selected items, weight, and delivery address."
  },
  {
    question: "What are Miss Cakist's opening hours?",
    answer: `Miss Cakist is open daily and closes at 10:00 PM. We recommend placing custom cake orders a few hours in advance.`
  },
  {
    question: "Does Miss Cakist offer delivery?",
    answer: "Yes! Delivery is available across Muzaffarpur. Delivery details and delivery charges (if applicable) are confirmed at the time of order confirmation."
  }
];

export const FAQAccordion: React.FC<{ items?: FAQItem[] }> = ({ items = defaultFaqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-chocolate-100/90 shadow-xs overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-chocolate-900 text-sm sm:text-base hover:text-strawberry-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-strawberry-600 shrink-0" />
                <span>{item.question}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-chocolate-500 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180 text-strawberry-600' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-chocolate-700 leading-relaxed border-t border-chocolate-100/50 pt-3">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
