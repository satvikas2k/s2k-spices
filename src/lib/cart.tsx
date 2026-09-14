import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Product, CONTACT } from "./catalog";

export type CartItem = {
  id: string;
  productName: string;
  category: string;
  sizeLabel: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, sizeIndex: number, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalPrice: number;
  discount: number;
  finalPrice: number;
  isFreeShipping: boolean;
  totalItemsCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  checkoutWhatsApp: (customerDetails: {
    name: string;
    phone: string;
    address: string;
    pincode: string;
    notes?: string;
  }) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("s2k_cart");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore error
        }
      }
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("s2k_cart", JSON.stringify(items));
    }
  }, [items]);

  const addItem = (product: Product, sizeIndex: number, qty = 1) => {
    const selectedSize = product.sizes[sizeIndex] || product.sizes[0];
    const id = `${product.name}-${selectedSize.label}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          id,
          productName: product.name,
          category: product.category,
          sizeLabel: selectedSize.label,
          price: selectedSize.price,
          quantity: qty,
        },
      ];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isFreeShipping = totalPrice >= 500;
  const discount = totalPrice >= 1000 ? Math.round(totalPrice * 0.1) : 0;
  const finalPrice = Math.max(0, totalPrice - discount);

  const checkoutWhatsApp = (details: {
    name: string;
    phone: string;
    address: string;
    pincode: string;
    notes?: string;
  }) => {
    let text = `*NEW ORDER - S2K SPICES* 🌶️\n`;
    text += `----------------------------------------\n`;
    text += `*Customer Details:*\n`;
    text += `👤 *Name:* ${details.name}\n`;
    text += `📱 *Phone:* ${details.phone}\n`;
    text += `📍 *Address:* ${details.address}\n`;
    text += `📌 *Pincode:* ${details.pincode}\n`;
    if (details.notes?.trim()) {
      text += `📝 *Notes:* ${details.notes.trim()}\n`;
    }
    text += `----------------------------------------\n`;
    text += `*Ordered Items:*\n`;

    items.forEach((item, index) => {
      text += `${index + 1}. *${item.productName}* (${item.sizeLabel}) x ${item.quantity} = ₹${
        item.price * item.quantity
      }\n`;
    });

    text += `----------------------------------------\n`;
    text += `💰 *Subtotal:* ₹${totalPrice}\n`;
    if (discount > 0) {
      text += `✨ *Flat 10% Offer:* -₹${discount} (Bill above ₹1000)\n`;
    }
    if (isFreeShipping) {
      text += `🚚 *Shipping:* FREE (Bill above ₹500)\n`;
    }
    text += `💵 *Final Amount Payable:* ₹${finalPrice}\n`;
    text += `----------------------------------------\n`;
    text += `🏢 *GSTIN:* ${CONTACT.gst}\n`;
    text += `Please confirm my order & share payment details. Thank you!`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/91${CONTACT.phone}?text=${encoded}`;
    window.open(waUrl, "_blank");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalPrice,
        discount,
        finalPrice,
        isFreeShipping,
        totalItemsCount,
        isOpen,
        setIsOpen,
        checkoutWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
