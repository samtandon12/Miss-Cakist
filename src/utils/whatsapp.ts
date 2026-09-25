import { business } from '../data/business';
import { CartItem, CustomerDetails } from '../types/cart';
import { Product } from '../types/product';

export const createGeneralWhatsAppUrl = (customMessage?: string): string => {
  const text = customMessage || "Hello Miss Cakist, I would like to know more about your cakes and bakery items.";
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
};

export const createProductWhatsAppUrl = (product: Product, size?: string): string => {
  const sizeText = size ? ` (${size})` : '';
  const text = `Hello Miss Cakist, I am interested in ${product.name}${sizeText}. Please share availability and price details.`;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
};

export const createCartOrderWhatsAppUrl = (
  items: CartItem[],
  customer?: Partial<CustomerDetails>
): string => {
  if (items.length === 0) {
    return createGeneralWhatsAppUrl();
  }

  let text = `Hello Miss Cakist,\n\nI would like to place an order from your website.\n\n📦 *Order Items:*\n`;

  let totalAmount = 0;
  let hasPriceOnRequest = false;

  items.forEach((item, index) => {
    const sizeStr = item.selectedSize ? ` [${item.selectedSize}]` : '';
    let priceStr = 'Price on request';
    if (item.selectedPrice !== null) {
      const lineTotal = item.selectedPrice * item.quantity;
      totalAmount += lineTotal;
      priceStr = `₹${lineTotal} (₹${item.selectedPrice} × ${item.quantity})`;
    } else {
      hasPriceOnRequest = true;
    }
    text += `${index + 1}. *${item.product.name}*${sizeStr} x${item.quantity} — ${priceStr}\n`;
  });

  text += `\n💰 *Total:* ${
    totalAmount > 0
      ? `₹${totalAmount}${hasPriceOnRequest ? ' (+ items with price on request)' : ''}`
      : 'Price on request'
  }\n`;

  if (customer && customer.fullName) {
    text += `\n👤 *Customer Details:*`;
    text += `\n- Name: ${customer.fullName}`;
    if (customer.phone) text += `\n- Phone: ${customer.phone}`;
    if (customer.address) text += `\n- Delivery Address: ${customer.address}`;
    if (customer.landmark) text += `\n- Landmark: ${customer.landmark}`;
    if (customer.pincode) text += `\n- Pincode: ${customer.pincode}`;
    if (customer.deliveryInstructions) text += `\n- Instructions: ${customer.deliveryInstructions}`;
    if (customer.paymentMethod) text += `\n- Preferred Payment: ${customer.paymentMethod.toUpperCase()}`;
  }

  text += `\n\nPlease confirm product availability and delivery time. Thank you!`;

  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
};
