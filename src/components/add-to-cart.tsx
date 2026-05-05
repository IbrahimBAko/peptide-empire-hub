import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const variants = product.variants ?? [];
  const [size, setSize] = useState(variants[0]?.size ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (variants.length === 0) return null;
  const variant = variants.find((v) => v.size === size) ?? variants[0];

  const handleAdd = () => {
    add({
      slug: product.slug,
      name: product.name,
      size: variant.size,
      price: variant.price,
      image: product.image,
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-card px-2 py-1.5 text-xs focus:border-gold focus:outline-none"
          >
            {variants.map((v) => (
              <option key={v.size} value={v.size}>
                {v.size} — ${v.price}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Qty</label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className="mt-1 w-full rounded-md border border-border bg-card px-2 py-1.5 text-xs focus:border-gold focus:outline-none"
          />
        </div>
      </div>
      <button
        onClick={handleAdd}
        className={`w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition shadow-[var(--shadow-gold)] ${
          added
            ? "bg-emerald-500 text-black"
            : "bg-gradient-to-r from-gold to-gold-bright text-primary-foreground hover:brightness-110"
        }`}
      >
        {added ? (
          <>
            <Check size={14} /> Added
          </>
        ) : (
          <>
            <ShoppingCart size={14} /> Add to Cart · ${variant.price * qty}
          </>
        )}
      </button>
    </div>
  );
}