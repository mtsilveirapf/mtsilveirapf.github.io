import Image from "next/image";

// Ferramenta: só o círculo do logo + nome, sem card/borda/fundo ao redor — a pedido explícito do
// usuário. Sem `logo`, o círculo vira um placeholder reservado (borda tracejada, mesma
// linguagem visual do GalleryPlaceholder desta página); com `logo`, a borda vira sólida — mesma
// cor/espessura já usada nas bordas dos cards do site (border-border) — em vez de tracejada, já
// que deixa de ser uma "moldura de reservado" e passa a ser um logo de verdade. A imagem some
// dentro do círculo via overflow-hidden — os assets são ícones quadrados de app
// (fundo próprio, cores da marca), não recortados em círculo de origem, então o corte circular
// acontece aqui via CSS, não no arquivo. object-contain (não cover) evita cortar o logo quando
// ele não é perfeitamente quadrado; p-3 no círculo reduz ainda mais a área da imagem — um
// quadrado que preenche a caixa toda ainda teria os 4 cantos fora do círculo inscrito nela (a
// máscara é redonda, a caixa é quadrada), então o padding garante que o logo inteiro (cantos
// incluídos) caiba dentro da área realmente visível do círculo. Sem brightness-0/invert: esse
// filtro era pra forçar logos de linha simples (mono, fundo transparente) a ficarem brancos,
// igual aos logos de empresa da Home — mas os ícones de ferramenta são coloridos e com fundo
// opaco próprio (roxo do Datadog, preto do FullStory etc.), então o filtro os transformaria num
// retângulo sólido branco/preto, destruindo o logo. Cor original, sem tratamento.
export function ToolCard({ name, logo }: { name: string; logo?: string | null }) {
  return (
    <div className="flex w-full flex-col items-center gap-3 text-center">
      <div
        className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border ${
          logo ? "border-border p-3" : "border-dashed border-border"
        }`}
      >
        {logo && (
          <Image src={logo} alt={name} width={64} height={64} className="h-full w-full object-contain" />
        )}
      </div>
      <span className="text-[14px] text-white">{name}</span>
    </div>
  );
}
