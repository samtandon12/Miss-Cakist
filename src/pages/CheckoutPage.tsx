import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { CustomerDetails } from '../types/cart';
import { formatPrice } from '../utils/formatters';
import { createCartOrderWhatsAppUrl } from '../utils/whatsapp';
import { CheckCircle2, MessageCircle, Truck, CreditCard, ShieldCheck } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    address: '',
    landmark: '',
    pincode: '842001',
    deliveryInstructions: '',
    paymentMethod: 'cod',
  });

  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = createCartOrderWhatsAppUrl(cart, form);
    setWhatsappUrl(url);
    setSubmitted(true);
  };

  const handleFinalWhatsAppRedirect = () => {
    clearCart();
    window.open(whatsappUrl, '_blank');
    navigate('/');
  };

  if (cart.length === 0 && !submitted) {
    return (
      <div className="pt-32 pb-20 text-center bg-cream-200 min-h-screen">
        <h2 className="font-serif font-bold text-2xl text-chocolate-900">Your Cake Box is Empty</h2>
        <p className="text-chocolate-600 text-sm mt-2">Please add cakes to your box before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/menu')}
          className="mt-4 bg-strawberry-600 text-white font-bold text-xs px-6 py-2.5 rounded-full"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Checkout Order | Miss Cakist Muzaffarpur"
        description="Complete your homemade cake order with Miss Cakist in Muzaffarpur, Bihar."
        canonicalPath="/checkout"
      />

      <main className="pt-24 pb-20 bg-cream-200 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ name: 'Cake Box', path: '/cart' }, { name: 'Checkout' }]} />

          {submitted ? (
            /* Order Submitted Success Card */
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-chocolate-100 shadow-card max-w-lg mx-auto space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h1 className="font-serif text-3xl font-bold text-chocolate-900">
                  Your order is ready to send!
                </h1>
                <p className="text-chocolate-700 text-sm mt-2 leading-relaxed">
                  We have prepared your detailed order summary for Miss Cakist bakery in Muzaffarpur.
                </p>
              </div>

              <div className="bg-cream-100 p-4 rounded-2xl border border-chocolate-100 text-xs text-left text-chocolate-800 space-y-1">
                <div><strong>Customer:</strong> {form.fullName} ({form.phone})</div>
                <div><strong>Delivery Address:</strong> {form.address}, {form.landmark} ({form.pincode})</div>
                <div><strong>Payment Choice:</strong> {form.paymentMethod.toUpperCase()}</div>
              </div>

              <button
                onClick={handleFinalWhatsAppRedirect}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold py-4 rounded-2xl shadow-floating transition-all flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Continue on WhatsApp</span>
              </button>

              <p className="text-[11px] text-chocolate-500">
                Clicking will open WhatsApp with your pre-filled order details to confirm delivery time with Miss Cakist.
              </p>
            </div>
          ) : (
            /* Checkout Form */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Left */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-chocolate-100 shadow-card space-y-6">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-chocolate-900">
                    Delivery Details
                  </h1>
                  <p className="text-chocolate-600 text-xs mt-1">
                    Provide your delivery address in Muzaffarpur.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-chocolate-800 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Anjali Sharma"
                      className="w-full bg-cream-100 text-chocolate-900 text-xs font-medium px-3.5 py-3 rounded-xl border border-chocolate-200 focus:outline-none focus:ring-2 focus:ring-strawberry-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-chocolate-800 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="9955527910"
                        className="w-full bg-cream-100 text-chocolate-900 text-xs font-medium px-3.5 py-3 rounded-xl border border-chocolate-200 focus:outline-none focus:ring-2 focus:ring-strawberry-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-chocolate-800 uppercase tracking-wider mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        value={form.pincode}
                        onChange={handleChange}
                        className="w-full bg-cream-100 text-chocolate-900 text-xs font-medium px-3.5 py-3 rounded-xl border border-chocolate-200 focus:outline-none focus:ring-2 focus:ring-strawberry-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-chocolate-800 uppercase tracking-wider mb-1">
                      Delivery Address *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={2}
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House/Flat No., Colony, Street name"
                      className="w-full bg-cream-100 text-chocolate-900 text-xs font-medium px-3.5 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:ring-2 focus:ring-strawberry-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-chocolate-800 uppercase tracking-wider mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={form.landmark}
                      onChange={handleChange}
                      placeholder="e.g. Near Naunihal International School"
                      className="w-full bg-cream-100 text-chocolate-900 text-xs font-medium px-3.5 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:ring-2 focus:ring-strawberry-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-chocolate-800 uppercase tracking-wider mb-1">
                      Special Delivery Instructions / Cake Message
                    </label>
                    <textarea
                      name="deliveryInstructions"
                      rows={2}
                      value={form.deliveryInstructions}
                      onChange={handleChange}
                      placeholder="Name to write on cake (e.g. Happy Birthday Rahul!), preferred delivery time..."
                      className="w-full bg-cream-100 text-chocolate-900 text-xs font-medium px-3.5 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:ring-2 focus:ring-strawberry-500"
                    />
                  </div>

                  {/* Payment Selection */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-chocolate-800 uppercase tracking-wider mb-2">
                      Select Payment Option
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'cod', label: 'Cash on Delivery' },
                        { id: 'upi', label: 'UPI / GPay' },
                        { id: 'online', label: 'Online Payment' },
                      ].map((pm) => (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, paymentMethod: pm.id as CustomerDetails['paymentMethod'] }))}
                          className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                            form.paymentMethod === pm.id
                              ? 'bg-chocolate-800 text-white border-chocolate-800 shadow-xs'
                              : 'bg-cream-100 text-chocolate-800 border-chocolate-200 hover:bg-cream-200'
                          }`}
                        >
                          {pm.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-strawberry-600 hover:bg-strawberry-700 text-white font-bold py-4 rounded-2xl shadow-md transition-all text-sm mt-4"
                  >
                    Place Order & Continue to WhatsApp
                  </button>
                </form>
              </div>

              {/* Order Summary Right */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-chocolate-100 shadow-soft space-y-4">
                <h2 className="font-serif font-bold text-chocolate-900 text-lg border-b border-chocolate-100 pb-3">
                  Summary ({cart.length} items)
                </h2>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-chocolate-900 truncate">{item.product.name}</div>
                        <div className="text-[10px] text-chocolate-500">Qty: {item.quantity} {item.selectedSize ? `(${item.selectedSize})` : ''}</div>
                      </div>
                      <div className="font-bold text-chocolate-900 font-serif">
                        {formatPrice(item.selectedPrice !== null ? item.selectedPrice * item.quantity : null, 'Req')}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-chocolate-100 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-chocolate-700">
                    <span>Subtotal</span>
                    <span className="font-bold text-chocolate-900">
                      {cartSubtotal > 0 ? `₹${cartSubtotal.toLocaleString('en-IN')}` : 'Price on request'}
                    </span>
                  </div>
                  <div className="flex justify-between text-chocolate-500">
                    <span>Delivery Fee</span>
                    <span className="italic">Confirmed at order</span>
                  </div>
                </div>

                <div className="border-t border-chocolate-100 pt-3 flex justify-between items-baseline font-serif font-bold text-lg text-chocolate-900">
                  <span>Total</span>
                  <span className="text-strawberry-600">
                    {cartSubtotal > 0 ? `₹${cartSubtotal.toLocaleString('en-IN')}` : 'Price on request'}
                  </span>
                </div>

                <div className="bg-cream-100 p-3 rounded-xl border border-chocolate-100/70 text-[11px] text-chocolate-700 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No payment charged now. Order is finalized directly with bakery on WhatsApp.</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </>
  );
};
