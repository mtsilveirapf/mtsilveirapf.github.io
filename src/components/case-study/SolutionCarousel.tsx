"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CARD } from "./card-style";
import { ImageLightbox } from "@/components/ImageLightbox";
import type { SolutionItem } from "@/content/gestao-prazos-content";

const TRANSITION_MS = 200;

// Carrossel das 3 telas da solução — item por vez, com as capturas de tela reais do protótipo
// (fornecidas pelo usuário, ver empresas-logos/ → public/case-studies/gestao-prazos/). aspect-
// [8/5] (não 3:2) porque é a proporção real dos arquivos (1440x900 / 1425x884), evitando cortar
// conteúdo da interface com object-cover. Navegação circular, múltiplos dots clicáveis, teclado
// via <button> nativo. Mesmo mecanismo de fade já usado alhures no site.
export function SolutionCarousel({
  items,
  prevLabel,
  nextLabel,
}: {
  items: SolutionItem[];
  prevLabel: string;
  nextLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = (next: number) => {
    setVisible(false);
    window.setTimeout(() => {
      setIndex(next);
      setVisible(true);
    }, TRANSITION_MS);
  };

  const goPrev = () => goTo((index - 1 + items.length) % items.length);
  const goNext = () => goTo((index + 1) % items.length);

  const item = items[index];

  return (
    <div className="flex flex-col gap-6">
      <div
        className="flex flex-col gap-6 transition-opacity ease-in-out"
        style={{ transitionDuration: `${TRANSITION_MS}ms`, opacity: visible ? 1 : 0 }}
      >
        <div>
          <h3 className="text-lg font-medium text-white">{item.title}</h3>
          <p className="mt-6 max-w-[75ch] text-base leading-[1.5]">
            {item.description}
          </p>
        </div>
        <ImageLightbox images={[{ src: item.image, alt: item.alt }]}>
          <div
            className={`relative aspect-[8/5] w-full overflow-hidden ${CARD} transition-all duration-300 hover:scale-[1.01] hover:border-white/25`}
          >
            <Image src={item.image} alt={item.alt} fill className="object-cover object-top" />
          </div>
        </ImageLightbox>
        <p className="max-w-[75ch] text-base leading-[1.4]">
          {item.ndaNote}
        </p>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label={prevLabel}
          className="flex h-8 w-8 shrink-0 items-center justify-center border border-border text-white transition-colors hover:border-white"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-2">
          {items.map((it, i) => (
            <button
              key={it.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${i + 1}/${items.length}`}
              aria-current={i === index}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? "bg-accent" : "bg-border"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label={nextLabel}
          className="flex h-8 w-8 shrink-0 items-center justify-center border border-border text-white transition-colors hover:border-white"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
