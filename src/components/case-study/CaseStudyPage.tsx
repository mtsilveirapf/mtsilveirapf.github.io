"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import { useLanguage, type Locale } from "@/lib/language-context";
import { PAGE_PADDING_X, PROSE_WIDTH } from "@/lib/layout";
import { gestaoPrazosContent } from "@/content/gestao-prazos-content";
import { SectionHeader } from "@/components/case-study/SectionHeader";
import { StatCardRow } from "@/components/case-study/StatCard";
import { QuoteCardGrid } from "@/components/case-study/QuoteCard";
import { LawCardGrid } from "@/components/case-study/LawCard";
import { ComparisonCard, CriteriaBlock } from "@/components/case-study/ComparisonCard";
import { CognitiveLoadFlow } from "@/components/case-study/CognitiveLoadFlow";
import { JourneyFlowCompare } from "@/components/case-study/JourneyFlowCompare";
import { AiSkillFlow } from "@/components/case-study/AiSkillFlow";
import { SolutionCarousel } from "@/components/case-study/SolutionCarousel";
import { DataGrid } from "@/components/case-study/DataGrid";
import { TableOfContents, type TocItem } from "@/components/case-study/TableOfContents";
import { Reveal } from "@/components/motion/Reveal";

// Página de case study reconstruída do zero (a pedido explícito do usuário) — não reaproveita
// componentes/hierarquia da versão anterior. Mantido do site: PAGE_PADDING_X (mesmo respiro
// lateral do resto do site), tipografia e paleta de cores. Layout inspirado em leitura estilo
// Medium: coluna de texto centralizada a ~75ch, índice de seções fixo à esquerda (desktop only,
// >=1200px — reaproveita o breakpoint `desktop` já existente em vez de criar um novo). Sem
// índice, mobile/tablet ficam com scroll linear puro, apoiado na numeração das seções.
// scroll-mt-[120px] nas seções compensa a altura do header sticky ao rolar via TOC.
// Regra dura de acessibilidade tipográfica: nenhum texto da página fica abaixo de 16px
// (text-base), incluindo labels e legendas — só cor/tracking/família diferenciam hierarquia.
//
// Componente compartilhado pelas duas rotas do case study (pt-BR em /gestao-prazos, en-US em
// /en/deadline-control — ver src/app/gestao-prazos/page.tsx e src/app/en/deadline-control/page.tsx).
// `locale` vem fixo da rota (prop), não do LanguageContext: cada rota é dedicada a um idioma, e
// ler do Context aqui abriria brecha pra uma rota /gestao-prazos exibir conteúdo em inglês (ou
// vice-versa) se o usuário tivesse trocado o idioma em outra aba antes. O componente ainda
// escreve no Context (setLocale) ao montar, só pra manter o idioma global sincronizado com a
// rota atual — é o que faz "Voltar ao portfólio" cair na home no idioma certo.
function Chapter({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex w-full scroll-mt-[120px] flex-col gap-4 py-10">
      {/* Motion: a seção inteira (número + título + todo o conteúdo) entra como uma unidade só,
          um único Reveal, sem stagger entre os filhos — mesmo padrão aplicado em
          MobileAppPage.tsx (app-mobile), promovido aqui a pedido explícito do usuário. Ilustrações
          com timing próprio (AiSkillFlow, CognitiveLoadFlow, JourneyFlowCompare) mantêm sua
          própria lógica de reveal interna intocada; só ganham o fade+translateY do Chapter por
          fora, como qualquer outro filho. */}
      <Reveal className="flex flex-col gap-4">
        <SectionHeader number={number} title={title} />
        {/* gap-6 (24px): espaçamento vertical padrão entre elementos de tipos diferentes dentro
            de uma mesma seção (parágrafo -> grid, grid -> parágrafo, ilustração -> texto etc.) —
            era 16px (gap-4) numa auditoria anterior, ajustado pra 24px a pedido do usuário. Não
            confundir com o gap INTERNO de cada grid de cards (StatCardRow, QuoteCardGrid,
            LawCardGrid, DataGrid...), que continua com seu próprio valor, intocado. */}
        <div className="flex flex-col gap-6">{children}</div>
      </Reveal>
    </section>
  );
}

export function CaseStudyPage({ locale }: { locale: Locale }) {
  const { setLocale } = useLanguage();
  const t = gestaoPrazosContent[locale];

  useEffect(() => {
    setLocale(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const tocItems: TocItem[] = [
    { id: "overview", label: t.hero.navLabel },
    { id: "discovery", label: t.discovery.eyebrow },
    { id: "leis-de-ux", label: t.lawsOfUx.eyebrow },
    { id: "processo-de-design", label: t.process.eyebrow },
    { id: "alternativas-avaliadas", label: t.alternatives.eyebrow },
    { id: "construcao-da-solucao", label: t.solution.eyebrow },
    { id: "poc", label: t.poc.eyebrow },
    { id: "resultados-poc", label: t.pocResults.eyebrow },
    { id: "aprendizados", label: t.learnings.eyebrow },
    { id: "proximos-passos", label: t.nextSteps.eyebrow },
  ];

  return (
    <main className="flex flex-col">
      {/* Índice fixo a uma distância fixa da borda da viewport (left-10), fora do grid
          centralizado — não divide largura com a coluna de leitura. O stroke esquerdo do
          bloco de conteúdo abaixo é ao mesmo tempo o "separador índice/coluna" pedido e o
          stroke compartilhado com Header/Footer: com o índice fora do grid, os dois papéis
          coincidem na mesma linha. */}
      {/* case-study-sidebar/case-study-container: correção de alinhamento na faixa
          1366–1919.98px (ver globals.css) — fora dessa faixa, essas classes não têm nenhuma
          regra aplicada, então left-10/w-[220px]/max-w-[1269px] mandam sozinhas como antes. */}
      <aside className="case-study-sidebar fixed top-[120px] left-10 z-40 hidden w-[220px] desktop:block">
        <TableOfContents items={tocItems} />
      </aside>

      <div className={PAGE_PADDING_X}>
        {/* max-w-[1269px]: mesma largura de container do Header/Footer/Home — precisa ser
            idêntica para os strokes verticais da página baterem com os do header, não um
            valor "parecido". Mesmas classes de padding/max-width usadas em Header.tsx,
            Footer.tsx e app/page.tsx (não só o mesmo valor computado). */}
        <div className="case-study-container mx-auto flex w-full max-w-[1269px] flex-col items-center desktop:border-x desktop:border-border desktop:px-10">
          <div className="flex w-full max-w-[75ch] flex-col">
            {/* Hero */}
            <section
              id="overview"
              className="flex scroll-mt-[120px] flex-col gap-4 pt-12 pb-10 tablet:pt-16"
            >
              <Reveal className="flex flex-col gap-4">
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

                <div className="flex flex-col gap-6">
                  <p className="text-base leading-[1.6]">{t.hero.intro}</p>
                  <StatCardRow items={t.hero.metrics} size="hero" />
                </div>
              </Reveal>
            </section>

            {/* 01 — Discovery */}
            <Chapter id="discovery" number={t.discovery.number} title={t.discovery.eyebrow}>
              {t.discovery.intro.map((paragraph, i) => (
                <p key={i} className={`${PROSE_WIDTH} text-base leading-[1.6]`}>
                  {paragraph}
                </p>
              ))}

              <StatCardRow items={t.discovery.dataStrip} size="secondary" animated={false} />

              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>
                {t.discovery.interviewsNote}
              </p>

              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>
                {t.discovery.saturationNote}
              </p>

              <QuoteCardGrid items={t.discovery.quotes} />
            </Chapter>

            {/* 02 — Leis de UX */}
            <Chapter id="leis-de-ux" number={t.lawsOfUx.number} title={t.lawsOfUx.eyebrow}>
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>
                {t.lawsOfUx.intro}
              </p>
              <LawCardGrid items={t.lawsOfUx.items} />
            </Chapter>

            {/* 03 — Processo de Design */}
            <Chapter id="processo-de-design" number={t.process.number} title={t.process.eyebrow}>
              {t.process.steps.map((paragraph, i) => (
                <p key={i} className={`${PROSE_WIDTH} text-base leading-[1.6]`}>
                  {paragraph}
                </p>
              ))}
              <AiSkillFlow {...t.process.aiSkillFlow} />
            </Chapter>

            {/* 04 — Alternativas avaliadas */}
            <Chapter
              id="alternativas-avaliadas"
              number={t.alternatives.number}
              title={t.alternatives.eyebrow}
            >
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>
                {t.alternatives.intro}
              </p>

              <div className="grid grid-cols-1 gap-6">
                <ComparisonCard
                  status="discarded"
                  title={t.alternatives.discarded.title}
                  description={t.alternatives.discarded.description}
                />
                <ComparisonCard status="chosen" title={t.alternatives.chosenTitle}>
                  <div className="flex flex-col gap-6">
                    <CognitiveLoadFlow {...t.alternatives.cognitiveLoadFlow} />
                    {t.alternatives.criteria.map((c, i) => (
                      <CriteriaBlock key={c.title} title={c.title} description={c.description}>
                        {i === 0 && <JourneyFlowCompare {...t.alternatives.journeyFlow} />}
                      </CriteriaBlock>
                    ))}
                  </div>
                </ComparisonCard>
              </div>
            </Chapter>

            {/* 05 — Construção da Solução */}
            <Chapter
              id="construcao-da-solucao"
              number={t.solution.number}
              title={t.solution.eyebrow}
            >
              <div className="flex items-start gap-3 rounded-lg bg-[rgb(8,44,102)] p-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-white" strokeWidth={1.5} />
                <p className="text-base leading-[1.4] text-white">{t.solution.privacyNotice}</p>
              </div>

              <SolutionCarousel
                items={t.solution.items}
                prevLabel={t.solution.carouselPrevLabel}
                nextLabel={t.solution.carouselNextLabel}
              />
            </Chapter>

            {/* 06 — PoC */}
            <Chapter id="poc" number={t.poc.number} title={t.poc.eyebrow}>
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.poc.intro}</p>
              <DataGrid items={t.poc.sample} />
            </Chapter>

            {/* 07 — Resultados PoC */}
            <Chapter id="resultados-poc" number={t.pocResults.number} title={t.pocResults.eyebrow}>
              <StatCardRow items={t.pocResults.metrics} size="hero" />
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>
                {t.pocResults.note}
              </p>
            </Chapter>

            {/* 08 — Aprendizados */}
            <Chapter id="aprendizados" number={t.learnings.number} title={t.learnings.eyebrow}>
              <ul className="flex flex-col gap-6">
                {t.learnings.items.map((item, i) => (
                  <li
                    key={i}
                    className={`${PROSE_WIDTH} flex gap-3 text-base leading-[1.5] text-text-50`}
                  >
                    <span className="text-accent">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Chapter>

            {/* 09 — Próximos passos */}
            <Chapter id="proximos-passos" number={t.nextSteps.number} title={t.nextSteps.eyebrow}>
              <ul className="flex flex-col gap-6">
                {t.nextSteps.items.map((item, i) => (
                  <li
                    key={i}
                    className={`${PROSE_WIDTH} flex gap-3 text-base leading-[1.5] text-text-50`}
                  >
                    <span className="text-accent">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Chapter>
          </div>
        </div>
      </div>
    </main>
  );
}
