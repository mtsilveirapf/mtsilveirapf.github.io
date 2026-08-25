"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type LightboxImage = { src: string; alt: string };

// Lightbox de imagem — a pedido explícito do usuário, toda imagem de case study (inclusive
// dentro de carrosséis, ex: SolutionCarousel) abre em um modal ao ser clicada. Layout de
// referência fornecido pelo usuário: painel claro centralizado, fundo escuro com grade de pontos
// sutil, botão de fechar circular no canto superior direito. `images` é um array (a referência
// mostra 2 imagens lado a lado) mesmo que hoje todo uso real no site seja de uma imagem só —
// suporte a múltiplas fica pronto pra quando fizer sentido agrupar.
//
// Wrapper vira um <button> em vez de um onClick solto na div: preserva navegação por teclado
// (Enter/Espaço abre) sem precisar de tabIndex/role manuais. Portal pro <body>: as imagens hoje
// vivem dentro de containers com overflow-hidden (CARD, StackedImage) — sem portal, o modal
// ficaria cortado pela máscara do card em vez de cobrir a tela inteira.
export function ImageLightbox({
  images,
  children,
  className,
}: {
  images: LightboxImage[];
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // setState direto e síncrono no corpo do efeito é o que a regra react-hooks/set-state-
    // in-effect proíbe — mesmo ajuste já usado em use-scroll-reveal.ts (setTimeout 0).
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`block w-full appearance-none border-0 bg-transparent p-0 text-left ${className ?? ""}`}
        aria-label="Ampliar imagem"
      >
        {children}
      </button>
      {mounted &&
        open &&
        createPortal(<LightboxModal images={images} onClose={() => setOpen(false)} />, document.body)}
    </>
  );
}

function LightboxModal({
  images,
  onClose,
}: {
  images: LightboxImage[];
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // Ambos setState agrupados no mesmo callback assíncrono (rAF) — mesmo motivo do setTimeout
    // acima: nada de setState síncrono direto no corpo do efeito.
    const id = requestAnimationFrame(() => {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setVisible(true);
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transition = reducedMotion ? "none" : "opacity 200ms ease-out, transform 200ms ease-out";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{
        backgroundColor: "rgba(0,0,0,0.85)",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        opacity: reducedMotion || visible ? 1 : 0,
        transition,
      }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="fixed top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[rgb(10,10,10)] text-white shadow-lg transition-transform hover:scale-105"
      >
        <X className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <div
        className="flex max-h-[85vh] w-full max-w-[1100px] items-center justify-center gap-6 overflow-auto rounded-2xl border border-border bg-[rgb(10,10,10)] p-6"
        style={{
          transform: reducedMotion || visible ? "scale(1)" : "scale(0.96)",
          transition,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <img> nativo em vez de next/image: dimensões variam muito por imagem (SUS: 815x274,
            capturas de app: até 6401x4800), então declarar width/height por instância não
            escala — <img> respeita a proporção real sozinho. Modal client-only, fora do caminho
            crítico de renderização inicial, então a otimização do next/image importa menos aqui. */}
        {images.map((img) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="max-h-[75vh] w-auto rounded-lg object-contain"
          />
        ))}
      </div>
    </div>
  );
}
