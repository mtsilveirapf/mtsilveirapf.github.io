"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "./LogoMark";
import { ContactNav } from "./ContactNav";
import { PAGE_PADDING_X, isCaseStudyRoute } from "@/lib/layout";

// Header compartilhado (docs/framer-audit.md, seção 3 — não é componente/layout template no
// Framer original, mas é estruturalmente idêntico nas 6 páginas, então foi extraído aqui).
export function Header() {
  const pathname = usePathname();

  // case-study-container: nas rotas gestao-prazos/app-mobile, o stroke vertical deste
  // container precisa bater com o do conteúdo (ver comentário em globals.css e
  // CaseStudyPage.tsx) — que na faixa 1366–1919.98px tem largura reduzida pela correção do
  // índice lateral. Fora dessas rotas (Home, data-driven), a classe não tem regra aplicada,
  // então max-w-[1269px] manda sozinho como sempre.
  const containerClassName = isCaseStudyRoute(pathname)
    ? "case-study-container mx-auto flex w-full max-w-[1269px] flex-col items-start gap-4 border-border py-4 tablet:h-[100px] tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-6 desktop:border-x desktop:px-10 desktop:py-0"
    : "mx-auto flex w-full max-w-[1269px] flex-col items-start gap-4 border-border py-4 tablet:h-[100px] tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-6 desktop:border-x desktop:px-10 desktop:py-0";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border bg-black ${PAGE_PADDING_X}`}
    >
      <div className={containerClassName}>
        <Link href="/" className="flex items-center gap-2">
          <LogoMark className="h-6 w-6 text-accent" />
          <span className="text-base leading-[1.2] text-white">
            MATHEUS FRANCISCO
          </span>
        </Link>

        <ContactNav />
      </div>
    </header>
  );
}
