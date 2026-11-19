"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { Product } from "@/data/products";

gsap.registerPlugin(useGSAP);

export function ProductGallery({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(product.images[0] ?? product.image);
  const images = product.images.length ? product.images : [product.image];
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(".product-detail-image img", { autoAlpha: 0.45, scale: 1.035 }, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.48,
      ease: "power2.out",
      clearProps: "opacity,visibility,transform",
    });
  }, { scope, dependencies: [activeImage], revertOnUpdate: true });

  return (
    <div ref={scope}>
      <div className="product-detail-image">
        <Image src={activeImage} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain mix-blend-multiply" />
        <span className="absolute bottom-5 left-5 rounded-full border border-ink/10 bg-white/75 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/55">BDM · {product.category}</span>
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {images.map((src, index) => (
            <button key={src} type="button" aria-label={`Show product image ${index + 1}`} aria-pressed={activeImage === src} onClick={() => setActiveImage(src)} className={`product-thumb ${activeImage === src ? "is-active" : ""}`}>
              <Image src={src} alt="" width={90} height={90} className="h-full w-full object-contain mix-blend-multiply" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
