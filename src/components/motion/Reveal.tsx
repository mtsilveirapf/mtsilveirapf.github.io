"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

// Wrapper de conveniência para useScrollReveal — cobre o caso comum (envolver um bloco inteiro
// num fade+translateY ao entrar em viewport) sem precisar espalhar `ref`/`style` manualmente em
// cada seção. Sempre renderiza uma div: elementos que precisam ser uma tag semântica específica
// (h2, li...) vivem DENTRO da div, não substituem ela — evita a complicação de tipagem de ref
// polimórfico por um ganho semântico marginal (uma div extra em volta de um heading não quebra
// hierarquia de documento). Usar o hook diretamente quando o elemento já precisa de um ref por
// outro motivo (ex: StatCardRow, que já tem um ref próprio pro observer do count-up).
export function Reveal({
  children,
  index = 0,
  translateY,
  className,
}: {
  children: ReactNode;
  index?: number;
  translateY?: number;
  className?: string;
}) {
  const { ref, style } = useScrollReveal<HTMLDivElement>(index, { translateY });
  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
