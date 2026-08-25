"use client";

import { useEffect, useRef, useState } from "react";
import { CARD } from "./card-style";
import { COUNT_UP_DURATION_MS, useCountUp } from "@/lib/use-count-up";

// Métrica + label dentro de um card. Duas variantes de peso: "hero" para as métricas de maior
// importância da página (Overview e Resultados PoC), "secondary" para dados de apoio
// (tira de dados do Discovery). Mesma família visual, escala diferente — não dois componentes.
type StatCardSize = "hero" | "secondary";

export function StatCard({
  value,
  label,
  size = "secondary",
  active = true,
  delayMs = 0,
  animated = true,
}: {
  value: string;
  label: string;
  size?: StatCardSize;
  active?: boolean;
  delayMs?: number;
  animated?: boolean;
}) {
  const display = useCountUp(value, active, delayMs, animated);
  const isHero = size === "hero";
  return (
    <div className={`flex flex-col gap-2 ${CARD} ${isHero ? "p-6" : "p-4"}`}>
      <span
        className={`font-medium tracking-[-0.02em] text-accent tabular-nums ${
          isHero ? "text-[24px] leading-[1.1] tablet:text-[28px]" : "text-lg leading-[1.1]"
        }`}
      >
        {display}
      </span>
      {/* Regra dura: nenhum texto abaixo de 16px — label nunca fica menor que text-base,
          mesmo na variante secundária. */}
      <span className={`text-base text-text-50 leading-[1.4] ${isHero ? "max-w-[22ch]" : ""}`}>
        {label}
      </span>
    </div>
  );
}

export function StatCardRow({
  items,
  size = "hero",
  animated = true,
}: {
  items: { value: string; label: string }[];
  size?: StatCardSize;
  animated?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // Dispara a contagem sequencial (esquerda->direita, um card de cada vez) quando o grupo de
  // cards entra em viewport — uma única vez, desconecta o observer depois. Não roda quando
  // animated=false (nada pra observar/disparar nesse caso).
  useEffect(() => {
    if (!animated) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  const gridClass =
    size === "hero"
      ? "grid grid-cols-1 gap-4 tablet:grid-cols-3"
      : "grid grid-cols-2 gap-3 tablet:grid-cols-3";
  return (
    <div ref={containerRef} className={gridClass}>
      {items.map((item, index) => (
        <StatCard
          key={item.label}
          value={item.value}
          label={item.label}
          size={size}
          active={active}
          delayMs={index * COUNT_UP_DURATION_MS}
          animated={animated}
        />
      ))}
    </div>
  );
}
