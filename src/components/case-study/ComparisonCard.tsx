import type { ReactNode } from "react";

// Descartada vs. escolhida, empilhadas (não lado a lado). Diferenciação: opacidade reduzida na
// descartada — a borda usa a mesma cor neutra do resto do site (border-border), não
// verde/vermelho, e o header não leva ícone de status (título sozinho). children carrega os
// critérios (mini-cards), só na escolhida.
export function ComparisonCard({
  status,
  title,
  description,
  children,
}: {
  status: "discarded" | "chosen";
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  const isChosen = status === "chosen";
  return (
    <div
      className={`flex flex-col gap-4 rounded border border-border bg-[rgb(10,10,10)] p-5 ${
        isChosen ? "" : "opacity-60"
      }`}
    >
      <h3 className="text-base font-medium text-white">{title}</h3>
      {description && <p className="text-base leading-[1.5]">{description}</p>}
      {children}
    </div>
  );
}

// `children` opcional: conteúdo visual de apoio a um critério específico (hoje só "Redução
// Cognitiva" usa isso, com o JourneyFlowCompare) — fica dentro da mesma caixa do critério, não
// como elemento solto, com um respiro (pt-3) acima pra não colar no texto da descrição.
export function CriteriaBlock({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 rounded border border-border bg-black p-4">
      <span className="text-base font-medium text-accent">{title}</span>
      <span className="text-base leading-[1.4] text-text-50">{description}</span>
      {children && <div className="pt-3">{children}</div>}
    </div>
  );
}
