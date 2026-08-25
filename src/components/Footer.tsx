"use client";

import { LogoMark } from "./LogoMark";
import { ContactNav } from "./ContactNav";
import { useLanguage } from "@/lib/language-context";
import { homeContent } from "@/content/home-content";
import { PAGE_PADDING_X } from "@/lib/layout";

// Footer compartilhado (docs/framer-audit.md, seção 3 — duplicado manualmente por página no
// Framer, mas estruturalmente idêntico; extraído aqui como componente).
//
// DESVIO DELIBERADO da fonte de verdade (docs/framer-audit.md, seções 10 e 13): no Framer o
// footer usa `position: sticky; top: 0`, o que no Home tinha um `top: 4214px` herdado sem
// confirmação de que fosse intencional. Reproduzir esse sticky literalmente faria o footer
// grudar no topo da viewport (como um segundo header) assim que entrasse em tela, o que não
// pôde ser confirmado como comportamento desejado. Implementado como bloco estático até
// validação visual no Framer.
export function Footer() {
  const { locale } = useLanguage();
  const { thanks, message } = homeContent[locale].footer;

  return (
    <footer className={`w-full border-t border-border bg-black ${PAGE_PADDING_X}`}>
      <div className="mx-auto flex w-full max-w-[1269px] flex-col items-start gap-6 border-border py-6 desktop:border-x desktop:px-10">
        <LogoMark className="h-6 w-6 text-accent" />

        <h2 className="text-[32px] leading-[1.05] tracking-[-0.05em] font-medium text-white">
          {thanks}
        </h2>

        <p className="text-2xl leading-[1.05] tracking-[-0.05em] font-medium">
          {message[0]}
          <br />
          {message[1]}
        </p>

        <div className="flex w-full flex-col items-start gap-4 pt-4 tablet:flex-row tablet:items-center tablet:justify-between">
          <ContactNav />
          <span className="font-inter-display text-sm font-semibold text-smoke-gray">
            © 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
