import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { ShoppingCart, Check } from "lucide-react";

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const variants = product.variants ?? [];
  const [size, setSize] = useState<string>(variants[0]?.size ?? "Inquire");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = variants.find((v) => v.size === size);
  const price = variant?.price ?? 0;

  function handleAdd() {
    add({
      slug: product.slug,
      name: product.name,
      size,
      price,
      quantity: qty,
      inquireOnly: product.inquireOnly,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="space-y-3">
      {variants.length > 0 && (
        <div>
          <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">
            Size
          </label>
          <div className="flex flex-wrap gap-1.5">
            {variants.map((v) => (
              <button
                key={v.size}
                type="button"
                onClick={() => setSize(v.size)}
                className={`text-xs px-2.5 py-1.5 rounded border transition ${
                  size === v.size
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border text-muted-foreground hover:border-gold/40"
                }`}
              >
                {v.size} <span className="text-gold ml-1">${v.price}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-md border border-border">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-2.5 py-1.5 text-muted-foreground hover:text-gold"
          >
            −
          </button>
          <span className="px-3 text-sm w-8 text-center">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="px-2.5 py-1.5 text-muted-foreground hover:text-gold"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold-bright px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-gold)] hover:brightness-110 transition"
        >
          {added ? (
            <>
              <Check size={14} /> Added
            </>
          ) : (
            <>
              <ShoppingCart size={14} /> {product.inquireOnly ? "Add to Inquiry" : "Add to Cart"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}