import { CARD } from "./card-style";
import type { Quote } from "@/content/gestao-prazos-content";

// Citação de dor do Discovery. Badge numerado (a ordem dos pontos de dor carrega informação
// real), categoria da dor como label separado (não misturado ao texto da citação), tipografia
// da citação em Figtree (família diferente do corpo em Inter) em vez de apenas itálico.
export function QuoteCard({ number, title, quote }: Quote) {
  return (
    <div className={`flex flex-col gap-4 ${CARD} p-5`}>
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-accent/40 font-figtree text-base text-accent">
          {number}
        </span>
        <span className="text-base font-medium text-white">{title}</span>
      </div>
      <p className="font-figtree text-base leading-[1.6]">&quot;{quote}&quot;</p>
    </div>
  );
}

export function QuoteCardGrid({ items }: { items: Quote[] }) {
  const isOdd = items.length % 2 !== 0;
  return (
    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
      {items.map((q, i) => (
        <div key={q.number} className={isOdd && i === items.length - 1 ? "tablet:col-span-2" : ""}>
          <QuoteCard {...q} />
        </div>
      ))}
    </div>
  );
}
