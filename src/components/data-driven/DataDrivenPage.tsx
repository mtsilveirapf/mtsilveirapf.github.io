"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage, type Locale } from "@/lib/language-context";
import { PAGE_PADDING_X, PROSE_WIDTH } from "@/lib/layout";
import { dataDrivenContent, type TitleDescription } from "@/content/data-driven-content";
import { SectionHeader } from "@/components/case-study/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { GalleryPlaceholder } from "./GalleryPlaceholder";
import { ToolCard } from "./ToolCard";

// Página nova ("Estratégia e Pensamento de Produto" / categoria "Data-Driven Design"), Etapa 1:
// estrutura + texto, sem refinamento visual fino. Texto extraído do projeto Framer via MCP (rota
// /data-driven, ver data-driven-content.ts) — a ESTRUTURA VISUAL é um redesign autorizado
// explicitamente pelo usuário, mesma lógica já usada em gestao-prazos: não replica o layout do
// Framer 1:1, só reaproveita os tokens já validados do design system (tipografia, paleta,
// PAGE_PADDING_X, PROSE_WIDTH, container 1269px com stroke, radius de 4px). Layout ainda mais
// simples que gestao-prazos (sem índice fixo lateral) porque essa página é mais curta e porque a
// referência visual que o usuário vai enviar em seguida (framer.com/performance) provavelmente
// pede uma composição diferente da de "case study com capítulos numerados" — decisão de manter
// o skeleton leve agora pra não desperdiçar trabalho que a Etapa 2 (refinamento com a referência)
// pode substituir.
//
// Placeholders de imagem: GalleryPlaceholder (borda tracejada) reserva o lugar dos screenshots
// reais de dashboard ainda não disponíveis — a pedido explícito do usuário, não tentar replicá-
// los ainda.
function Section({
  id,
  number,
  title,
  children,
  paddingBottomClassName = "pb-10",
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
  // Override pontual do padding inferior de uma seção específica (ex: última seção da página
  // precisando de mais respiro antes do Footer) — separado do pt-10 pra não depender da ordem
  // de geração das classes do Tailwind, que não é garantida entre "py-10" e um "pb-*" avulso.
  paddingBottomClassName?: string;
}) {
  return (
    <section id={id} className={`flex w-full flex-col gap-4 pt-10 ${paddingBottomClassName}`}>
      {/* Motion: a seção inteira entra como uma unidade só, um único Reveal, sem stagger entre
          os filhos — mesmo padrão default de todas as páginas de conteúdo do site (ver
          MobileAppPage.tsx / CaseStudyPage.tsx). */}
      <Reveal className="flex flex-col gap-4">
        <SectionHeader number={number} title={title} />
        <div className="flex flex-col gap-6">{children}</div>
      </Reveal>
    </section>
  );
}

function MetricCard({ title, description }: TitleDescription) {
  return (
    <div className="flex flex-col gap-1 rounded border border-border bg-[rgb(10,10,10)] p-4">
      <span className="text-base font-medium text-accent">{title}</span>
      <span className="text-base leading-[1.4] text-text-50">{description}</span>
    </div>
  );
}

export function DataDrivenPage({ locale }: { locale: Locale }) {
  const { setLocale } = useLanguage();
  const t = dataDrivenContent[locale];

  useEffect(() => {
    setLocale(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return (
    <main className="flex flex-col">
      <div className={PAGE_PADDING_X}>
        {/* max-w-[1269px] + stroke: mesma largura de container e mesma lógica de linhas
            divisórias (margem a margem do container, nunca a viewport inteira) já usada em
            Header/Footer/Home/gestao-prazos. */}
        <div className="mx-auto flex w-full max-w-[1269px] flex-col items-center desktop:border-x desktop:border-border desktop:px-10">
          <div className="flex w-full max-w-[75ch] flex-col">
            {/* Hero */}
            <section className="flex flex-col gap-6 pt-12 pb-10 tablet:pt-16">
              <Reveal>
                <div className="flex flex-col gap-10">
                  <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-fit items-center gap-2 text-base text-text-50 transition-colors hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    {t.backLink}
                  </Link>

                  <h1 className="max-w-[20ch] text-[32px] leading-[1.1] font-medium tracking-[-0.02em] text-white tablet:text-[48px]">
                    {t.hero.title}
                  </h1>
                </div>
              </Reveal>
            </section>
          </div>

          <div className="flex w-full max-w-[75ch] flex-col">
            {/* 01 — Como penso sobre dados */}
            <Section id="approach" number={t.approach.number} title={t.approach.eyebrow}>
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.approach.intro}</p>
              <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                {t.approach.metrics.map((m) => (
                  <MetricCard key={m.title} title={m.title} description={m.description} />
                ))}
              </div>
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.approach.closing}</p>
            </Section>

            {/* 02 — Rotina */}
            <Section id="routine" number={t.routine.number} title={t.routine.eyebrow}>
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.routine.body}</p>
            </Section>

            {/* 03 — Ferramentas */}
            <Section id="tools" number={t.tools.number} title={t.tools.eyebrow}>
              {/* grid-cols-5 a partir do tablet: com 5 ferramentas cabendo numa linha só (coluna
                  de leitura ~757px, 4 gaps de 24px, ~132px por item — coube confortavelmente), a
                  última linha incompleta deixa de existir por completo em vez de precisar
                  centralizar uma sobra. No mobile, grid-cols-1 (empilhado, cada item ocupa a
                  linha toda) pelo mesmo motivo: qualquer grade de 2+ colunas ali também deixaria
                  1 item sobrando sozinho (2+2+1). Testado antes com flex-wrap + justify-center —
                  centralizava a sobra corretamente, mas um único item centralizado abaixo de uma
                  fileira de 4 ainda lia como desequilibrado; grid-cols-5 resolve na raiz, sem
                  depender de recalcular o split toda vez que a lista de ferramentas mudar. Gap de
                  24px (gap-6) a pedido explícito do usuário. */}
              <div className="grid grid-cols-1 gap-6 tablet:grid-cols-5">
                {t.tools.items.map((tool) => (
                  <ToolCard key={tool.name} name={tool.name} logo={tool.logo} />
                ))}
              </div>
            </Section>

            {/* 04 — Dashboards que construo (última seção da página desde a remoção de
                "Aprendizado com dados") — pb-[120px] a pedido explícito do usuário, mais respiro
                antes do Footer do que o pb-10 padrão das demais seções. */}
            <Section
              id="gallery"
              number={t.gallery.number}
              title={t.gallery.eyebrow}
              paddingBottomClassName="pb-[120px]"
            >
              <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2">
                {t.gallery.items.map((item) => (
                  <GalleryPlaceholder
                    key={item.placeholderLabel}
                    label={item.placeholderLabel}
                    caption={item.caption}
                    image={item.image}
                  />
                ))}
              </div>
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>
                {t.gallery.closingLead}
                <span className="text-accent">{t.gallery.closingEmphasis}</span>
              </p>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}
