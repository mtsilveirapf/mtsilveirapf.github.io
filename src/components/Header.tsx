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
  // flex-row items-center justify-between gap-3: só no mobile, a pedido explícito do usuário —
  // antes era flex-col (logo numa linha, E-MAIL/LINKEDIN quebrando pra uma segunda), agora tudo
  // cabe numa linha só com fonte reduzida (ver text-sm no logo abaixo e ContactNav.tsx).
  // tablet/desktop mantêm o layout original (flex-row/items-center/justify-between/gap-6 já
  // eram os valores de lá, só ficaram redundantes com o novo default e puderam ser removidos).
  const containerClassName = isCaseStudyRoute(pathname)
    ? "case-study-container mx-auto flex w-full max-w-[1269px] flex-row items-center justify-between gap-3 border-border py-4 tablet:h-[100px] tablet:gap-6 desktop:border-x desktop:px-10 desktop:py-0"
    : "mx-auto flex w-full max-w-[1269px] flex-row items-center justify-between gap-3 border-border py-4 tablet:h-[100px] tablet:gap-6 desktop:border-x desktop:px-10 desktop:py-0";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border bg-black ${PAGE_PADDING_X}`}
    >
      <div className={containerClassName}>
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <LogoMark className="h-5 w-5 shrink-0 text-accent tablet:h-6 tablet:w-6" />
          {/* text-sm tablet:text-base: só no mobile, pra caber na mesma linha do ContactNav
              (ver comentário acima). truncate evita quebra caso o espaço ainda aperte. */}
          <span className="truncate text-sm leading-[1.2] text-white tablet:text-base">
            MATHEUS FRANCISCO
          </span>
        </Link>

        <ContactNav />
      </div>
    </header>
  );
}
