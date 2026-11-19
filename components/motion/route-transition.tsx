"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const scope = useRef<HTMLDivElement>(null);
  const previousPath = useRef<string | null>(null);

  useGSAP(() => {
    const isFirstRender = previousPath.current === null;
    previousPath.current = pathname;
    if (isFirstRender || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(scope.current, { autoAlpha: 0.72, y: 10 }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.34,
      ease: "power2.out",
      clearProps: "opacity,visibility,transform",
    });
  }, { scope, dependencies: [pathname], revertOnUpdate: true });

  return <div ref={scope} className="route-transition">{children}</div>;
}
