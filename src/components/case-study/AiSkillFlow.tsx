"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, User } from "lucide-react";

// Símbolo oficial da Claude (arquivo fornecido pelo usuário, Claude_Symbol_0.svg) — fill trocado
// de #fff fixo para currentColor, pra herdar a mesma cor do IconCircle (branco inativo, accent
// ativo) igual aos ícones lucide dos outros dois passos.
function ClaudeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} aria-hidden="true">
      <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
    </svg>
  );
}

// Ilustração animada original (referência consultada via Framer MCP, frame lMHXyBZAQ — ícones e
// textos recriados com o sistema de ícones do projeto (lucide-react) e a paleta do site, não
// copiados literalmente da referência). Fluxo: materiais de pesquisa/definição de problema ->
// skills de IA -> refinamento de artefatos. Única ilustração da seção "Processo de Design" — o
// ProcessFlow (ícones + linha conectora acima dos cards) que existia antes foi removido a
// pedido do usuário; as 3 etapas agora são texto corrido, sem cards/títulos numerados.
//
// Sequência ao entrar em viewport (uma única vez, via IntersectionObserver): ícone 1 ativa (cor
// de acento) -> textos da etapa 1 aparecem em sequência -> conector 1->2 preenche da esquerda
// pra direita -> ícone 2 ativa -> textos da etapa 2 em sequência -> conector 2->3 preenche ->
// ícone 3 ativa -> texto da etapa 3. Ciclo completo: ~2,9s (ver timing abaixo). Ícones das
// etapas seguintes ficam sempre visíveis, só não ativos — só o TEXTO fica oculto até sua vez.
// prefers-reduced-motion pula direto pro estado final (tudo ativo). Durações de transição CSS
// (ícone 300ms, fade de texto 250ms) ficam hardcoded direto nas classes Tailwind abaixo — não
// dá pra reusar uma constante JS ali, o Tailwind precisa da classe literal no código-fonte.
const TEXT_STAGGER_MS = 200;
const GAP_AFTER_ICON_MS = 150;
const GAP_BEFORE_CONNECTOR_MS = 200;
const CONNECTOR_FILL_MS = 500;

type FlowState = {
  icon1: boolean;
  texts1: number;
  connector1: boolean;
  icon2: boolean;
  texts2: number;
  connector2: boolean;
  icon3: boolean;
  texts3: number;
};

const INITIAL_STATE: FlowState = {
  icon1: false,
  texts1: 0,
  connector1: false,
  icon2: false,
  texts2: 0,
  connector2: false,
  icon3: false,
  texts3: 0,
};

const FINAL_STATE: FlowState = {
  icon1: true,
  texts1: Infinity,
  connector1: true,
  icon2: true,
  texts2: Infinity,
  connector2: true,
  icon3: true,
  texts3: Infinity,
};

function IconCircle({
  active,
  noTransition,
  children,
}: {
  active: boolean;
  noTransition: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border ${
        noTransition ? "transition-none" : "transition-colors duration-300"
      } ${
        active
          ? "border-accent/40 bg-accent/5 text-accent"
          : "border-border bg-[rgb(10,10,10)] text-white"
      }`}
    >
      {children}
    </span>
  );
}

function Connector({ filled, noTransition }: { filled: boolean; noTransition: boolean }) {
  return (
    // tablet:mt-7 (28px = metade dos 56px do IconCircle) alinha o centro vertical do conector
    // com o centro vertical dos ícones na linha horizontal — sem isso a linha fica rente ao
    // topo (items-start no container pai), acima do centro do círculo. Só se aplica tablet+:
    // no mobile (flex-col) o conector é só um divisor entre blocos empilhados, sem esse
    // problema de alinhamento.
    //
    // tablet:mr-10 (40px): ajuste manual do usuário via devtools — gap só do lado direito da
    // linha (encostada no círculo à esquerda, respiro antes do próximo círculo), substituindo o
    // gap simétrico de 51px/51px medido anteriormente no frame de referência do Framer.
    <div
      className="relative h-0.5 w-10 shrink-0 overflow-hidden rounded-full bg-border tablet:mt-7 tablet:mr-10 tablet:w-16"
      aria-hidden="true"
    >
      <div
        className={`h-full bg-accent ${noTransition ? "transition-none" : "transition-transform duration-500 ease-out"}`}
        style={{ transform: filled ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left" }}
      />
    </div>
  );
}

function StepTexts({
  items,
  visibleCount,
  noTransition,
}: {
  items: string[];
  visibleCount: number;
  noTransition: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-1">
      {items.map((text, i) => (
        <span
          key={text}
          className={`font-mono text-[14px] leading-[1.2] text-text-50 ${
            noTransition ? "transition-none" : "transition-opacity duration-[250ms]"
          } ${visibleCount > i ? "opacity-100" : "opacity-0"}`}
        >
          {text}
        </span>
      ))}
    </div>
  );
}

export function AiSkillFlow({
  step1Texts,
  step2Texts,
  step3Texts,
}: {
  step1Texts: string[];
  step2Texts: string[];
  step3Texts: string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<FlowState>(INITIAL_STATE);
  const [reducedMotion, setReducedMotion] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Precisa viver fora do callback do IntersectionObserver: o valor retornado por esse
    // callback não é um cleanup function (a API do IntersectionObserver ignora o retorno) —
    // por isso os timeouts agendados são coletados aqui, num array do escopo do efeito, pra
    // poderem ser cancelados de verdade no cleanup do useEffect.
    const timeouts: number[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
          // Sem sequência E sem as transições CSS individuais (cor do ícone, opacidade do
          // texto) — "sem a sequência animada" pedido pelo usuário é lido aqui como "sem
          // nenhuma animação", não só "sem o escalonamento no tempo".
          timeouts.push(
            window.setTimeout(() => {
              setReducedMotion(true);
              setState(FINAL_STATE);
            }, 0),
          );
          return;
        }

        let t = 0;
        const after = (ms: number) => {
          t += ms;
        };
        const at = (fn: () => void) => {
          timeouts.push(window.setTimeout(fn, t));
        };
        const revealTexts = (count: number, apply: (n: number) => void) => {
          for (let i = 0; i < count; i++) {
            if (i > 0) after(TEXT_STAGGER_MS);
            const n = i + 1;
            at(() => apply(n));
          }
        };

        at(() => setState((s) => ({ ...s, icon1: true })));
        after(GAP_AFTER_ICON_MS);
        revealTexts(step1Texts.length, (n) => setState((s) => ({ ...s, texts1: n })));
        after(GAP_BEFORE_CONNECTOR_MS);
        at(() => setState((s) => ({ ...s, connector1: true })));

        after(CONNECTOR_FILL_MS);
        at(() => setState((s) => ({ ...s, icon2: true })));
        after(GAP_AFTER_ICON_MS);
        revealTexts(step2Texts.length, (n) => setState((s) => ({ ...s, texts2: n })));
        after(GAP_BEFORE_CONNECTOR_MS);
        at(() => setState((s) => ({ ...s, connector2: true })));

        after(CONNECTOR_FILL_MS);
        at(() => setState((s) => ({ ...s, icon3: true })));
        after(GAP_AFTER_ICON_MS);
        revealTexts(step3Texts.length, (n) => setState((s) => ({ ...s, texts3: n })));
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [step1Texts, step2Texts, step3Texts]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-start gap-6 tablet:flex-row tablet:items-start tablet:justify-center tablet:gap-0"
    >
      <div className="flex flex-col items-start gap-3">
        <IconCircle active={state.icon1} noTransition={reducedMotion}>
          <FileText className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
        </IconCircle>
        <StepTexts items={step1Texts} visibleCount={state.texts1} noTransition={reducedMotion} />
      </div>

      <Connector filled={state.connector1} noTransition={reducedMotion} />

      <div className="flex flex-col items-start gap-3">
        <IconCircle active={state.icon2} noTransition={reducedMotion}>
          <ClaudeLogo className="h-6 w-6" />
        </IconCircle>
        <StepTexts items={step2Texts} visibleCount={state.texts2} noTransition={reducedMotion} />
      </div>

      <Connector filled={state.connector2} noTransition={reducedMotion} />

      <div className="flex flex-col items-start gap-3">
        <IconCircle active={state.icon3} noTransition={reducedMotion}>
          <User className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
        </IconCircle>
        <StepTexts items={step3Texts} visibleCount={state.texts3} noTransition={reducedMotion} />
      </div>
    </div>
  );
}
