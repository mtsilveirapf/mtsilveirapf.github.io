"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

// Índice de navegação lateral (desktop only, ver page.tsx). Fica em position:fixed a uma
// distância fixa da borda da viewport — fora do grid centralizado que header/conteúdo/footer
// compartilham — em vez de dividir largura com a coluna de leitura dentro desse grid.
// Scroll-spy via IntersectionObserver: a seção mais alta atualmente cruzando a faixa de
// ativação vira a ativa. Clique rola suave até a âncora (compensando a altura do header
// sticky via scroll-mt nas próprias seções).
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  // O índice é fixed (foge do grid centralizado), então precisa ser escondido manualmente
  // perto do footer — senão flutuaria por cima do conteúdo dele em vez de parar antes, como
  // aconteceria naturalmente com sticky contido no fluxo normal.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Índice de seções"
      className={`flex flex-col gap-1 transition-opacity duration-200 ${
        nearFooter ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={handleClick(item.id)}
            aria-current={isActive}
            className={`border-l-2 py-1.5 pl-4 text-[14px] leading-[1.3] transition-colors ${
              isActive ? "border-accent text-accent" : "border-border text-text-50 hover:text-white"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
