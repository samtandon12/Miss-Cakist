export type CakeCategory =
  | 'cakes'
  | 'birthday-cakes'
  | 'chocolate-cakes'
  | 'fruit-cakes'
  | 'designer-cakes'
  | 'rasmalai-cakes'
  | 'anniversary-cakes'
  | 'bento-cakes'
  | 'pastries';

export type Occasion =
  | 'birthday'
  | 'anniversary'
  | 'celebration'
  | 'surprise'
  | 'family'
  | 'just-because';

export interface CakeSizeOption {
  size: string; // e.g. "250g", "500g", "1kg", "1.5kg", "2kg"
  price: number | null; // Null if price on request
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CakeCategory;
  description: string;
  price: number | null; // null if "Price on request"
  priceLabel?: string; // e.g. "Price on request" or "Starts at ₹350"
  sizes: CakeSizeOption[];
  image: string;
  gallery?: string[];
  tags: string[];
  featured?: boolean;
  popular?: boolean;
  occasion: Occasion[];
  isAvailable: boolean;
  preparationTime?: string;
  flavour?: string;
}

export interface CategoryInfo {
  id: CakeCategory | 'all';
  name: string;
  slug: string;
  iconName: string;
  description: string;
  image?: string;
}
