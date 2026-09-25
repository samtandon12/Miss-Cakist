import { Product } from './product';

export interface CartItem {
  product: Product;
  selectedSize?: string;
  selectedPrice: number | null;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  address: string;
  landmark: string;
  pincode: string;
  deliveryInstructions: string;
  paymentMethod: 'cod' | 'upi' | 'online';
}
