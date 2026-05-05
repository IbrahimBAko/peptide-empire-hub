import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  slug: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  remove: (slug: string, size: string) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "pe.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    return {
      items,
      add: (i) => {
        setItems((prev) => {
          const existing = prev.find((p) => p.slug === i.slug && p.size === i.size);
          const qty = i.quantity ?? 1;
          if (existing) {
            return prev.map((p) =>
              p.slug === i.slug && p.size === i.size ? { ...p, quantity: p.quantity + qty } : p,
            );
          }
          return [...prev, { ...i, quantity: qty }];
        });
      },
      remove: (slug, size) =>
        setItems((prev) => prev.filter((p) => !(p.slug === slug && p.size === size))),
      updateQty: (slug, size, qty) =>
        setItems((prev) =>
          prev
            .map((p) => (p.slug === slug && p.size === size ? { ...p, quantity: Math.max(1, qty) } : p))
            .filter((p) => p.quantity > 0),
        ),
      clear: () => setItems([]),
      count: items.reduce((n, p) => n + p.quantity, 0),
      subtotal: items.reduce((n, p) => n + p.quantity * p.price, 0),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}