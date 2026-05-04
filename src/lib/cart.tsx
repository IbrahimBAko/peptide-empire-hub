import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  slug: string;
  name: string;
  size: string; // variant size or "Inquire"
  price: number; // 0 for inquire-only
  quantity: number;
  inquireOnly?: boolean;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (slug: string, size: string) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "pe_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    add: (item) =>
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.slug === item.slug && i.size === item.size);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
          return next;
        }
        return [...prev, item];
      }),
    remove: (slug, size) => setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size))),
    updateQty: (slug, size, qty) =>
      setItems((prev) =>
        prev
          .map((i) => (i.slug === slug && i.size === size ? { ...i, quantity: Math.max(1, qty) } : i))
      ),
    clear: () => setItems([]),
    count: items.reduce((n, i) => n + i.quantity, 0),
    subtotal: items.reduce((n, i) => n + i.price * i.quantity, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}