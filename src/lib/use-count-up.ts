"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export const COUNT_UP_DURATION_MS = 1000;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type ParsedMetric = {
  target: number;
  decimals: number;
  decimalSep: "," | ".";
  suffix: string;
};

// Extrai a parte numérica de valores como "73%", "4,6/5" (pt-BR) ou "4.6/5" (en-US), mantendo o
// separador decimal original (usado depois pra formatar de volta) e qualquer sufixo ("%", "/5").
// Retorna null para valores sem número no início (ex: "Múltiplas etapas") — esses não contam.
function parseMetricValue(raw: string): ParsedMetric | null {
  const match = raw.match(/^(\d+)([.,](\d+))?(.*)$/);
  if (!match) return null;
  const [, intPart, sepPart, decimalPart = "", suffix = ""] = match;
  const decimalSep: "," | "." = sepPart === "." ? "." : ",";
  const decimals = decimalPart.length;
  const target = parseFloat(decimals > 0 ? `${intPart}.${decimalPart}` : intPart);
  return { target, decimals, decimalSep, suffix };
}

function formatValue(current: number, parsed: ParsedMetric): string {
  const fixed = current.toFixed(parsed.decimals);
  const withSeparator = parsed.decimalSep === "," ? fixed.replace(".", ",") : fixed;
  return `${withSeparator}${parsed.suffix}`;
}

// Contagem sequencial de uma métrica de StatCard. `active` vira true quando o grupo de cards
// entra em viewport (ver StatCardRow); `delayMs` é a posição do card na fila esquerda->direita
// (index * COUNT_UP_DURATION_MS), então cada card só começa a contar depois que o anterior
// termina. Valores não numéricos aparecem no seu horário sem contar. Roda uma única vez
// (startedRef trava reentrância se `active` piscar) e respeita prefers-reduced-motion mostrando
// o valor final direto, sem animação. `animated=false` desliga completamente (usado no grupo
// secundário do Discovery, a pedido do usuário) — mostra o valor final direto, sem fila/atraso.
export function useCountUp(
  rawValue: string,
  active: boolean,
  delayMs: number,
  animated: boolean = true,
): string {
  // Precisa de identidade estável entre renders: sem useMemo, cada setDisplay() durante a
  // contagem cria um `parsed` novo, o que muda a dependência do efeito abaixo, o que reexecuta
  // o efeito, o que roda a cleanup (cancela o requestAnimationFrame em andamento) — a animação
  // reiniciava a cada frame e nunca chegava ao fim.
  const parsed = useMemo(() => (animated ? parseMetricValue(rawValue) : null), [rawValue, animated]);
  const [display, setDisplay] = useState(() => (parsed ? formatValue(0, parsed) : rawValue));
  const startedRef = useRef(false);

  useEffect(() => {
    if (!animated || !active || startedRef.current) return;
    startedRef.current = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      // Sem stagger também: com reduced-motion, esperar a vez na fila ainda é uma forma de
      // movimento/tempo — mostra tudo de uma vez, sem contagem e sem atraso escalonado.
      const timeoutId = window.setTimeout(() => setDisplay(rawValue), 0);
      return () => window.clearTimeout(timeoutId);
    }
    if (!parsed) {
      const timeoutId = window.setTimeout(() => setDisplay(rawValue), delayMs);
      return () => window.clearTimeout(timeoutId);
    }

    let rafId = 0;
    const startTimeoutId = window.setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / COUNT_UP_DURATION_MS, 1);
        if (progress < 1) {
          setDisplay(formatValue(parsed.target * easeInOutCubic(progress), parsed));
          rafId = requestAnimationFrame(tick);
        } else {
          setDisplay(rawValue);
        }
      };
      rafId = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      window.clearTimeout(startTimeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [active, delayMs, parsed, rawValue, animated]);

  return display;
}
