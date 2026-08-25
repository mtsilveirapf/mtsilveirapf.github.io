"use client";

import { useEffect, useState } from "react";

const STAGGER_MS = 150;
const DURATION_MS = 900;
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)"; // ease-out suave

// Animação de entrada (fade + translateY) só para o hero da Home, disparada uma vez no mount
// da página (load/refresh) — não é scroll-reveal, não usa IntersectionObserver. Respeita
// prefers-reduced-motion.
export function useHeroReveal(index: number): React.CSSProperties {
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setTimeout(
      () => {
        if (mql.matches) {
          setReducedMotion(true);
        }
        setVisible(true);
      },
      mql.matches ? 0 : index * STAGGER_MS,
    );
    return () => window.clearTimeout(timer);
  }, [index]);

  if (reducedMotion) return {};

  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition: `opacity ${DURATION_MS}ms ${EASING}, transform ${DURATION_MS}ms ${EASING}`,
  };
}
