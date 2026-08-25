import { CARD } from "./card-style";

// Ilustração original (não a imagem de referência do usuário, recriada com a paleta do site):
// lado esquerdo, 9 tarefas soltas sem agrupamento (cada retângulo repete "Atividade" em 14px,
// reforçando que são indistinguíveis entre si); lado direito, as mesmas tarefas reunidas em 3
// prazos nomeados (A/B/C), cada uma com seus retângulos internos repetindo "Atividade" em 12px
// (fonte menor que a do lado esquerdo, a pedido explícito do usuário — retângulos mais estreitos
// aqui) — mesmo princípio do lado esquerdo, só que já agrupada. Primeiro elemento dentro do card
// "Alternativa escolhida" — apoio visual imediato ao critério "Redução Cognitiva" logo abaixo.
// Esses retângulos e os labels de prazo (3 no total) usam tamanhos abaixo de text-base a pedido
// explícito do usuário (exceção deliberada à regra de 16px mínimo da página, só para esses
// rótulos repetidos/decorativos — mesma cor de texto já usada em cada lado,
// text-text-50/text-white). As legendas de cada lado usam text-base.
// Lado direito (jornada redesenhada) em branco/neutro, igual ao esquerdo — nenhum dos dois usa
// a cor de acento da página aqui (a diferença "antes/depois" já fica clara pela estrutura:
// blocos soltos vs. agrupados em prazo). Cantos do container em 4px, mesmo tratamento dos
// CriteriaBlock vizinhos.
const GROUP_SIZES = [3, 2, 1];

export function CognitiveLoadFlow({
  beforeLabel,
  afterLabel,
  groups,
}: {
  beforeLabel: string;
  afterLabel: string;
  groups: string[];
}) {
  return (
    <div className={`grid grid-cols-1 gap-6 ${CARD} p-4 tablet:grid-cols-2`}>
      <div className="flex flex-col gap-3">
        <span className="text-base font-medium text-text-50">{beforeLabel}</span>
        <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="flex h-6 items-center justify-center border border-border bg-black text-[14px] text-text-50"
            >
              Atividade
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-base font-medium text-white">{afterLabel}</span>
        <div className="flex flex-col gap-2">
          {groups.map((group, i) => (
            <div key={group} className="flex items-center gap-2 border border-border bg-black p-2">
              <span className="shrink-0 text-[14px] text-white">{group}</span>
              <div className="flex flex-1 gap-1.5" aria-hidden="true">
                {Array.from({ length: GROUP_SIZES[i] ?? 1 }).map((_, j) => (
                  <div
                    key={j}
                    className="flex h-5 flex-1 items-center justify-center border border-border text-[12px] text-white"
                  >
                    Atividade
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
