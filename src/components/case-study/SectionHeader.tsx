// Cabeçalho de seção do case study — substitui a antiga faixa full-bleed (CaseTitle) por um
// eyebrow numerado + regra fina, a pedido explícito do usuário (reconstrução da página do
// zero). Número e título usam os mesmos tokens de cor/tipografia do resto do site (accent,
// Figtree para o número, Inter para o título).
export function SectionHeader({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-figtree text-base tracking-[0.1em] text-accent">
        {number}
      </span>
      <h2 className="text-[20px] leading-[1.15] font-medium tracking-[-0.02em] text-white tablet:text-[22px]">
        {title}
      </h2>
    </div>
  );
}
