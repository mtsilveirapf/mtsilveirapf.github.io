// Ilustração original comparando a jornada anterior (9 etapas) com a jornada atual (5 etapas),
// prova visual concreta do critério "Redução Cognitiva" — por isso vive dentro desse item do
// container "Alternativa escolhida" (ver CaseStudyPage.tsx), não como elemento solto entre
// seções. Sem borda/fundo/padding próprios: quem desenha essa moldura agora é o CriteriaBlock
// que a envolve, então um box aqui dentro criaria uma caixa dentro de caixa.
//
// Duas fileiras horizontais (não colunas) — cinza para a anterior, branco para a atual: a
// diferença de cor já comunica hierarquia sozinha, sem precisar da cor de acento da página. Os
// boxes de cada fileira quebram linha (flex-wrap) em vez de rolar horizontalmente — todos ficam
// sempre visíveis, sem interação necessária. A sequência é indicada por um número sutil dentro
// de cada box (não por seta): com flex-wrap, o CSS sozinho não sabe dizer se dois boxes
// consecutivos caíram na mesma linha visual ou quebraram — uma seta ao final de uma linha
// quebrada ficaria solta, apontando pra fora do container. Número evita esse problema por
// completo em qualquer largura de tela, sem precisar medir layout via JS. Texto em 14px (boxes e
// títulos de fileira) — exceção deliberada à regra de 16px mínimo da página, pedida
// explicitamente pelo usuário pra essa ilustração especificamente.
function JourneyRow({
  label,
  steps,
  tone,
}: {
  label: string;
  steps: string[];
  tone: "muted" | "primary";
}) {
  const isPrimary = tone === "primary";
  return (
    <div className="flex flex-col gap-3">
      <span className={`text-[14px] font-medium ${isPrimary ? "text-white" : "text-text-50"}`}>
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {steps.map((step, i) => (
          <span
            key={i}
            className={`flex h-9 shrink-0 items-center gap-2 border bg-black px-3 text-[14px] whitespace-nowrap ${
              isPrimary ? "border-white/20 text-white" : "border-border text-text-50"
            }`}
          >
            <span className={`tabular-nums ${isPrimary ? "text-white/40" : "text-text-50/50"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

export function JourneyFlowCompare({
  previousLabel,
  previousSteps,
  currentLabel,
  currentSteps,
}: {
  previousLabel: string;
  previousSteps: string[];
  currentLabel: string;
  currentSteps: string[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <JourneyRow label={previousLabel} steps={previousSteps} tone="muted" />
      <JourneyRow label={currentLabel} steps={currentSteps} tone="primary" />
    </div>
  );
}
