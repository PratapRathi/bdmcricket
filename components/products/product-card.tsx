import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog-types";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const subcategories = product.subcategories;
  return (
    <article className="product-card group">
      <Link href={`/products/${product.slug}`} className="block" aria-label={`View ${product.name}`}>
        <div className={`product-image-wrap ${index % 5 === 1 ? "tone-blue" : index % 5 === 3 ? "tone-red" : ""}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 42vw, 25vw"
            className="product-image mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.045]"
          />
          <span className="product-view" aria-hidden="true">View product ↗</span>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">{product.category}{subcategories.length ? ` · ${subcategories.map((subcategory) => subcategory.name).join(" / ")}` : ""}</p>
            <h3 className="mt-2 max-w-[18rem] text-base font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-lg">{product.name}</h3>
          </div>
          <span aria-hidden="true" className="mt-1 shrink-0 text-lg text-brand-red transition-transform duration-300 group-hover:translate-x-1">↗</span>
        </div>
        {product.price && <p className="mt-2 text-sm text-ink/60">{product.price}</p>}
      </Link>
    </article>
  );
}
