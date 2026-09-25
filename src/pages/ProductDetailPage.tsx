import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/menu/ProductGrid';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { createProductWhatsAppUrl } from '../utils/whatsapp';
import {
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  Clock,
  Crown,
  Heart,
  PartyPopper,
  Sparkles,
  Users,
  CheckCircle2,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, getItemQuantity, updateQuantity } = useCart();

  const product = products.find((p) => p.slug === slug);

  // Fallback size selection
  const [selectedSize, setSelectedSize] = useState<string>(
    product && product.sizes.length > 0 ? product.sizes[0].size : ''
  );

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center bg-cream-200 min-h-screen">
        <h2 className="font-serif font-bold text-2xl text-chocolate-900">Cake Not Found</h2>
        <p className="text-chocolate-600 text-sm mt-2">The cake you are looking for does not exist.</p>
        <Link
          to="/menu"
          className="inline-block mt-4 bg-strawberry-600 text-white font-bold text-xs px-6 py-2.5 rounded-full"
        >
          Return to Menu
        </Link>
      </div>
    );
  }

  const matchedSizeObj = product.sizes.find((s) => s.size === selectedSize);
  const currentPrice = matchedSizeObj ? matchedSizeObj.price : product.price;

  const currentQty = getItemQuantity(product.id, selectedSize || undefined);

  const handleAddToCart = () => {
    addToCart(product, selectedSize || undefined, currentPrice);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.popular))
    .slice(0, 4);

  // Occasions list for "Perfect For" section
  const perfectForItems = [
    { label: 'Birthday Celebrations', icon: PartyPopper },
    { label: 'Anniversaries & Milestones', icon: Heart },
    { label: 'Family Gatherings', icon: Users },
    { label: 'Surprise Sweet Moments', icon: Sparkles },
  ];

  // Product JSON-LD schema
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": currentPrice !== null ? currentPrice : "0",
      "availability": product.isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <>
      <SEO
        title={`${product.name} | Miss Cakist Muzaffarpur`}
        description={`${product.description} Order freshly baked ${product.name} from Miss Cakist in Muzaffarpur, Bihar.`}
        canonicalPath={`/product/${product.slug}`}
        image={product.image}
        jsonLd={productJsonLd}
      />

      <main className="pt-24 pb-20 bg-cream-200 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs
            items={[
              { name: 'Menu', path: '/menu' },
              { name: product.category, path: `/menu?category=${product.category}` },
              { name: product.name },
            ]}
          />

          {/* Main Product Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-chocolate-100 shadow-card mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Image / Gallery */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden shadow-md bg-cream-200">
                  <img
                    src={product.image}
                    alt={`${product.name} from Miss Cakist in Muzaffarpur`}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {product.featured && (
                    <span className="absolute top-4 left-4 bg-chocolate-900/90 backdrop-blur-md text-gold-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Crown className="w-3.5 h-3.5" />
                      <span>Signature Special</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Details & Actions */}
              <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-strawberry-600">
                      {product.category.replace('-', ' ')}
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900 mt-1">
                      {product.name}
                    </h1>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl font-bold text-chocolate-900">
                      {formatPrice(currentPrice, product.priceLabel || 'Price on request')}
                    </span>
                    {selectedSize && (
                      <span className="text-xs font-semibold text-chocolate-600">
                        ({selectedSize})
                      </span>
                    )}
                  </div>

                  <p className="text-chocolate-700 text-sm leading-relaxed border-t border-b border-chocolate-100 py-3">
                    {product.description}
                  </p>

                  {/* Configurable Cake Size Selector */}
                  {product.sizes.length > 0 && (
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-800">
                        Select Cake Weight / Size
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((s) => {
                          const isSelected = selectedSize === s.size;
                          return (
                            <button
                              key={s.size}
                              onClick={() => setSelectedSize(s.size)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                isSelected
                                  ? 'bg-chocolate-800 text-white border-chocolate-800 shadow-xs'
                                  : 'bg-cream-100 text-chocolate-800 border-chocolate-200 hover:bg-cream-200'
                              }`}
                            >
                              <span>{s.size}</span>
                              {s.price !== null && (
                                <span className="ml-1.5 opacity-80">₹{s.price}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Additional info badge */}
                  {product.preparationTime && (
                    <div className="flex items-center gap-2 text-xs font-medium text-chocolate-700 bg-cream-100 px-3.5 py-2 rounded-xl border border-chocolate-100 w-fit">
                      <Clock className="w-4 h-4 text-strawberry-600" />
                      <span>Preparation: {product.preparationTime}</span>
                    </div>
                  )}

                </div>

                {/* Action Controls */}
                <div className="space-y-3 pt-4 border-t border-chocolate-100">
                  
                  {/* Quantity & Add to Cart */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    
                    {currentQty > 0 ? (
                      <div className="w-full sm:w-auto flex items-center justify-between bg-chocolate-800 text-cream-100 rounded-full px-4 py-3 text-sm font-bold gap-4 shadow-sm">
                        <span className="text-xs text-chocolate-200">In Cake Box:</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(product.id, selectedSize || undefined, -1)}
                            className="p-1 hover:text-strawberry-500"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-extrabold">{currentQty}</span>
                          <button
                            onClick={() => updateQuantity(product.id, selectedSize || undefined, 1)}
                            className="p-1 hover:text-strawberry-500"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-strawberry-600 hover:bg-strawberry-700 active:scale-95 text-white font-bold py-3.5 px-6 rounded-full shadow-md text-sm transition-all"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cake Box</span>
                      </button>
                    )}

                    <a
                      href={createProductWhatsAppUrl(product, selectedSize)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-full shadow-md text-sm transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order on WhatsApp</span>
                    </a>

                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Perfect For Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-chocolate-100 shadow-soft mb-12">
            <h3 className="font-serif font-bold text-chocolate-900 text-xl mb-4">
              Perfect For
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {perfectForItems.map((pf, i) => {
                const Icon = pf.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-cream-100 border border-chocolate-100/70"
                  >
                    <Icon className="w-5 h-5 text-strawberry-600 shrink-0" />
                    <span className="text-xs font-semibold text-chocolate-900">{pf.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Products Grid */}
          {relatedProducts.length > 0 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-chocolate-900">
                More Cakes You May Like
              </h2>
              <ProductGrid products={relatedProducts} />
            </div>
          )}

        </div>
      </main>
    </>
  );
};
