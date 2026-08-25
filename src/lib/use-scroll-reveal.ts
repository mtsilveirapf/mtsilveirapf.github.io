"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

// Extensão scroll-triggered do padrão de entrada já usado em useHeroReveal.ts (Home): mesmos
// timing/easing (900ms, cubic-bezier(0.16,1,0.3,1)) e mesmo stagger (150ms por índice), só que
// disparado por IntersectionObserver (uma vez, ao entrar em viewport) em vez de no mount da
// página — pensado para seções que aparecem via scroll ao longo de uma página longa (case
// studies), não no primeiro paint. Constantes deliberadamente duplicadas de useHeroReveal.ts (não
// importadas) para não arriscar nenhuma mudança de comportamento na Home antes de aprovação —
// candidato a consolidar as duas fontes numa só se este padrão for promovido para o design
// system global (ver observação separada na entrega do preview).
const STAGGER_MS = 150;
const DURATION_MS = 900;
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

// Só usado pela página /preview/motion-concepts, para deixar o reviewer alternar
// prefers-reduced-motion direto no navegador sem precisar mudar a configuração do SO. Em
// qualquer página real o Provider nunca é montado, então o Context sempre resolve pro valor
// default (false) e o hook cai no matchMedia de verdade — zero efeito fora do preview.
export const ReducedMotionDemoContext = createContext(false);

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  index: number = 0,
  options?: { threshold?: number; translateY?: number },
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const startedRef = useRef(false);
  const forcedReducedMotion = useContext(ReducedMotionDemoContext);
  const translateY = options?.translateY ?? 12;
  const threshold = options?.threshold ?? 0.15;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = forcedReducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      // setState direto e síncrono no corpo do efeito é o que a regra react-hooks/set-state-
      // in-effect proíbe — mesmo ajuste já usado em AiSkillFlow.tsx (setTimeout 0) pro caso de
      // reduced-motion "mostrar tudo de uma vez".
      const reducedTimeoutId = window.setTimeout(() => {
        setReducedMotion(true);
        setVisible(true);
      }, 0);
      return () => window.clearTimeout(reducedTimeoutId);
    }

    let timeoutId: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();
        timeoutId = window.setTimeout(() => setVisible(true), index * STAGGER_MS);
      },
      // rootMargin negativo no fim: a seção só é considerada "visível" quando já cruzou um
      // pouco pra dentro do viewport, não assim que a borda encosta — evita o reveal disparar
      // cedo demais em telas altas.
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [index, threshold, forcedReducedMotion]);

  const style: React.CSSProperties = reducedMotion
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${translateY}px)`,
        transition: `opacity ${DURATION_MS}ms ${EASING}, transform ${DURATION_MS}ms ${EASING}`,
      };

  return { ref, style };
}
