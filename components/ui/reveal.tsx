"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(ref.current, { autoAlpha: 0, y: 22 }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.72,
      delay: delay / 1000,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
    });
  }, { scope: ref, dependencies: [delay], revertOnUpdate: true });

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
