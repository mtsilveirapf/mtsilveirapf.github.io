"use client";

import { usePathname } from "next/navigation";
import { LogoMark } from "./LogoMark";
import { ContactNav } from "./ContactNav";
import { useLanguage } from "@/lib/language-context";
import { homeContent } from "@/content/home-content";
import { PAGE_PADDING_X, isCaseStudyRoute } from "@/lib/layout";

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
  const pathname = usePathname();

  // case-study-container: mesmo motivo do Header.tsx — o stroke vertical precisa bater com
  // o do conteúdo nas rotas gestao-prazos/app-mobile dentro da faixa 1366–1919.98px.
  const containerClassName = isCaseStudyRoute(pathname)
    ? "case-study-container mx-auto flex w-full max-w-[1269px] flex-col items-start gap-6 border-border py-6 desktop:border-x desktop:px-10"
    : "mx-auto flex w-full max-w-[1269px] flex-col items-start gap-6 border-border py-6 desktop:border-x desktop:px-10";

  return (
    <footer className={`w-full border-t border-border bg-black ${PAGE_PADDING_X}`}>
      <div className={containerClassName}>
        <LogoMark className="h-5 w-5 text-accent tablet:h-6 tablet:w-6" />

        {/* text-2xl/text-lg: só no mobile, mesmo pedido de redução de fonte do header/ContactNav
            aplicado aqui — tablet/desktop mantêm os tamanhos originais (text-[32px]/text-2xl). */}
        <h2 className="text-2xl leading-[1.05] tracking-[-0.05em] font-medium text-white tablet:text-[32px]">
          {thanks}
        </h2>

        {/* br hidden tablet:block: só no mobile as duas frases viram uma só, fluindo e
            quebrando naturalmente pela largura da tela — o espaço antes do br garante que
            "mensagem." e "Vamos" não colem quando a quebra some. tablet/desktop mantêm a
            quebra fixa original entre as duas frases. */}
        <p className="text-lg leading-[1.05] tracking-[-0.05em] font-medium tablet:text-2xl">
          {message[0]}{" "}
          <br className="hidden tablet:block" />
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
