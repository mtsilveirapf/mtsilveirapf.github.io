"use client";

import { useEffect, useRef, useState } from "react";

const TYPE_SPEED_MS = 35;

// Corpo da xícara sem vapor embutido. O Coffee do lucide-react (usado na 1ª versão) já vem com
// 3 tracinhos retos de vapor no topo do próprio glyph (node_modules/lucide-react/.../coffee.mjs:
// 3 paths curtos, M10 2v2 / M14 2v2 / M6 2v2) — em 24px eles renderizam como "pontinhos"
// estáticos, duplicando a animação de vapor deste componente. Path do corpo reaproveitado do
// lucide (mesmo visual/stroke, pra continuar consistente com o resto dos ícones do site), só sem
// os 3 traços. viewBox recortado (y de 6 a 24, não 0 a 24): o desenho da xícara só ocupa a
// metade inferior do box original de 24x24 — sem o corte, sobra um respiro vazio no topo do
// ícone e o vapor animado (posicionado logo acima do ícone) fica longe demais da borda real da
// xícara.
function CupIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="1 6 22 18"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
    </svg>
  );
}

// Curva fina simulando uma linha de vapor — SVG estático, a animação (translateY + opacity, via
// .steam-line em globals.css) é aplicada por fora. currentColor herda a cor do texto do pai
// (text-text-50), sem precisar declarar cor por linha. Proporção pequena de propósito (4x10, bem
// menor que os 24x24 do ícone) — vapor é um detalhe sutil, não pode competir em tamanho com a
// xícara.
function SteamLine() {
  return (
    <svg className="steam-line h-2.5 w-1" viewBox="0 0 4 10" fill="none" aria-hidden="true">
      <path
        d="M2 10C2 10 0.5 8 2 6C3.5 4 2 2 2 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Card "fantasma" no fim da grade de Projetos — não é um projeto real, não é clicável, avisa de
// forma descontraída que mais cases estão a caminho. Full-width (col-span-full) e compacto
// (bem mais baixo que os cards reais ao lado), borda tracejada + fundo levemente diferenciado
// (rgb(8,8,8), mais sutil que o rgb(13,13,13) já usado no footer dos cards reais), radius
// consistente com o resto do design system (rounded = 4px). Cor neutra (text-text-50) no ícone e
// no texto — sem accent, porque não é um CTA.
//
// Efeito de digitação dispara uma única vez ao entrar em viewport (IntersectionObserver, mesmo
// padrão de AiSkillFlow.tsx/useScrollReveal.ts). O vapor é a única animação em loop — o texto não
// re-digita. prefers-reduced-motion: mostra o texto inteiro direto (sem digitação) e o vapor via
// CSS já fica estático sozinho (ver globals.css), sem precisar de lógica extra aqui pra isso.
export function GhostProjectCard({ message }: { message: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [typedLength, setTypedLength] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // setState direto e síncrono no corpo do efeito é o que a regra react-hooks/set-state-
      // in-effect proíbe — mesmo ajuste já usado em use-scroll-reveal.ts e AiSkillFlow.tsx
      // (setTimeout 0) pro caso de reduced-motion "mostrar tudo de uma vez".
      const id = window.setTimeout(() => {
        setReducedMotion(true);
        setTypedLength(message.length);
      }, 0);
      return () => window.clearTimeout(id);
    }

    const el = containerRef.current;
    if (!el) return;

    let intervalId: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        let i = 0;
        intervalId = window.setInterval(() => {
          i += 1;
          setTypedLength(i);
          if (i >= message.length && intervalId) {
            window.clearInterval(intervalId);
          }
        }, TYPE_SPEED_MS);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [message]);

  return (
    <div
      ref={containerRef}
      className="col-span-full flex flex-col items-center gap-3 rounded border border-dashed border-border bg-[rgb(8,8,8)] px-6 pt-12 pb-8 text-center"
    >
      <div className="relative flex flex-col items-center text-text-50">
        <div className="absolute bottom-full mb-0.5 flex gap-1">
          <SteamLine />
          <SteamLine />
          <SteamLine />
        </div>
        <CupIcon className="h-6 w-6" />
      </div>
      <p className="text-base text-text-50">
        {message.slice(0, typedLength)}
        {!reducedMotion && typedLength < message.length && (
          <span className="animate-pulse">|</span>
        )}
      </p>
    </div>
  );
}
