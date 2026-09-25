import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';

interface ToastState {
  id: number;
  message: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedSize?: string, priceOverride?: number | null) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, selectedSize: string | undefined, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  getItemQuantity: (productId: string, selectedSize?: string) => number;
  cartTotalCount: number;
  cartSubtotal: number;
  toasts: ToastState[];
  removeToast: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'miss_cakist_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cart]);

  const showToast = (message: string) => {
    const newToast = { id: Date.now(), message };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(newToast.id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, selectedSize?: string, priceOverride?: number | null) => {
    // Determine target size & price
    const defaultSize = selectedSize || (product.sizes.length > 0 ? product.sizes[0].size : undefined);
    const matchedSizeObj = product.sizes.find((s) => s.size === defaultSize);
    const targetPrice = priceOverride !== undefined 
      ? priceOverride 
      : (matchedSizeObj ? matchedSizeObj.price : product.price);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === defaultSize
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            selectedSize: defaultSize,
            selectedPrice: targetPrice,
            quantity: 1,
          },
        ];
      }
    });

    showToast(`Added ${product.name} to your cake box 🎂`);
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (productId: string, selectedSize: string | undefined, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === selectedSize) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const getItemQuantity = (productId: string, selectedSize?: string): number => {
    const found = cart.find(
      (item) => item.product.id === productId && item.selectedSize === selectedSize
    );
    return found ? found.quantity : 0;
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce((total, item) => {
    if (item.selectedPrice !== null) {
      return total + item.selectedPrice * item.quantity;
    }
    return total;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        getItemQuantity,
        cartTotalCount,
        cartSubtotal,
        toasts,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
