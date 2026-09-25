import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { createCartOrderWhatsAppUrl } from '../utils/whatsapp';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, MessageCircle } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, cartSubtotal, cartTotalCount } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Your Cake Box | Miss Cakist Muzaffarpur"
        description="Review selected cakes and pastries in your cake box at Miss Cakist."
        canonicalPath="/cart"
      />

      <main className="pt-24 pb-20 bg-cream-200 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ name: 'Cake Box' }]} />

          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-3xl font-bold text-chocolate-900">
              Your Cake Box ({cartTotalCount})
            </h1>
            {cart.length > 0 && (
              <Link
                to="/menu"
                className="text-xs font-bold text-strawberry-600 hover:underline"
              >
                + Add More Cakes
              </Link>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-chocolate-100 shadow-soft space-y-4">
              <div className="w-16 h-16 rounded-full bg-pinksoft-100 text-strawberry-600 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="font-serif font-bold text-xl text-chocolate-900">
                Your Cake Box is Empty
              </h2>
              <p className="text-xs text-chocolate-600 max-w-sm mx-auto">
                Discover homemade cakes, pastries, and rasmalai fusion creations in Muzaffarpur.
              </p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-strawberry-600 hover:bg-strawberry-700 text-white font-bold text-xs px-6 py-3 rounded-full shadow-sm"
              >
                <span>Browse Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Item List */}
              <div className="lg:col-span-7 space-y-4">
                {cart.map((item, idx) => {
                  const linePrice = item.selectedPrice !== null ? item.selectedPrice * item.quantity : null;
                  return (
                    <div
                      key={`${item.product.id}-${item.selectedSize || idx}`}
                      className="bg-white p-4 rounded-2xl border border-chocolate-100 shadow-xs flex items-center gap-4"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-bold text-chocolate-900 text-base line-clamp-1">
                          {item.product.name}
                        </h3>
                        {item.selectedSize && (
                          <span className="text-xs font-semibold text-chocolate-500 block">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        <span className="font-serif font-bold text-strawberry-600 text-sm mt-1 block">
                          {formatPrice(linePrice, 'Price on request')}
                        </span>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-chocolate-400 hover:text-strawberry-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center bg-cream-200 text-chocolate-900 rounded-lg px-2.5 py-1 border border-chocolate-200 text-xs font-bold gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                            className="hover:text-strawberry-600"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                            className="hover:text-strawberry-600"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Side Card */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-chocolate-100 shadow-card space-y-4">
                <h2 className="font-serif font-bold text-chocolate-900 text-lg border-b border-chocolate-100 pb-3">
                  Order Summary
                </h2>

                <div className="space-y-2 text-xs text-chocolate-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-chocolate-900">
                      {cartSubtotal > 0 ? `₹${cartSubtotal.toLocaleString('en-IN')}` : 'Price on request'}
                    </span>
                  </div>
                  <div className="flex justify-between text-chocolate-500">
                    <span>Delivery Fee</span>
                    <span className="italic">Confirmed at order time</span>
                  </div>
                </div>

                <div className="border-t border-chocolate-100 pt-3 flex justify-between items-baseline font-serif font-bold text-lg text-chocolate-900">
                  <span>Total</span>
                  <span className="text-strawberry-600">
                    {cartSubtotal > 0 ? `₹${cartSubtotal.toLocaleString('en-IN')}` : 'Price on request'}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-strawberry-600 hover:bg-strawberry-700 text-white font-bold py-3.5 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={createCartOrderWhatsAppUrl(cart)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Order via WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </>
  );
};
