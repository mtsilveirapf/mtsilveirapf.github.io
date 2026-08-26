"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, FolderOpen, ListChecks, Share2, type LucideIcon } from "lucide-react";
import { useLanguage, type Locale } from "@/lib/language-context";
import { PAGE_PADDING_X, PROSE_WIDTH } from "@/lib/layout";
import { mobileAppContent } from "@/content/mobile-app-content";
import type { TitleDescription } from "@/content/gestao-prazos-content";
import { SectionHeader } from "@/components/case-study/SectionHeader";
import { StatCardRow } from "@/components/case-study/StatCard";
import { CARD } from "@/components/case-study/card-style";
import { TableOfContents, type TocItem } from "@/components/case-study/TableOfContents";
import { Reveal } from "@/components/motion/Reveal";
import { ImageLightbox } from "@/components/ImageLightbox";

// Case study novo ("Criação de aplicativo mobile com Google Material Design", rota /app-mobile
// pt-BR e /en/mobile-app en-US) — mesma estrutura de layout do CaseStudyPage.tsx (gestao-prazos):
// coluna de leitura ~75ch, índice lateral fixo com scroll-spy (desktop only, gestao-prazos
// também não tem substituto em mobile/tablet — decisão do usuário: não inventar um componente
// novo pra isso), mesmo sistema de cards. O que muda é a composição das seções: esse case não
// tem "Leis de UX" nem "Alternativas descartadas", então a sequência é outra (ver conteúdo em
// mobile-app-content.ts). Chapter local (não importado de CaseStudyPage.tsx, que é privado e
// específico de gestao-prazos) — mesmo padrão já usado por DataDrivenPage.tsx com seu próprio
// Section local.
//
// Motion: a seção inteira (número + título + todo o conteúdo interno) entra como uma unidade só
// — um único Reveal por Chapter, sem stagger entre os filhos. Correção explícita do usuário: a
// primeira versão revelava cada parágrafo/card/imagem com seu próprio delay, o que ficou
// fragmentado ("carregamento picotado"). Cards de grid (FeatureGrid) e imagens empilhadas
// (StackedImage) não têm mais Reveal individual — só o Chapter ao redor deles anima; eles
// aparecem juntos, já visíveis, no mesmo frame em que a seção termina de entrar. Hover
// (StackedImage, cards do MVP) não é afetado por essa mudança: não é animação de entrada, é
// microinteração, mantida como estava. Contagem numérica dos StatCards (useCountUp) também não
// foi tocada — exceção explícita do usuário, é animação de valor, não de entrada.
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
      <Reveal className="flex flex-col gap-4">
        <SectionHeader number={number} title={title} />
        <div className="flex flex-col gap-6">{children}</div>
      </Reveal>
    </section>
  );
}

// Ícone temático por funcionalidade do MVP, na ordem fixa em que o content sempre as declara
// (Agenda/Andamentos/Pastas de processo/Compartilhamento) — por índice, mesmo princípio do
// LawCard.tsx (títulos pt-BR/en-US divergem). Não reaproveita LawCard.tsx: aquele componente já
// tem ícones fixos e específicos das Leis de UX de gestao-prazos: usar aqui pintaria os ícones
// errados. Mesma estrutura visual (CARD, ícone+título, descrição), implementação local.
const FEATURE_ICONS: LucideIcon[] = [Calendar, ListChecks, FolderOpen, Share2];

// Imagem real (não placeholder) empilhada a toda largura da coluna — mesmo tratamento visual do
// SolutionCarousel (gestao-prazos): moldura CARD + object-cover. Local porque só essa página usa
// esse padrão de "várias imagens cheias empilhadas" (MVP: 2 telas do FigJam, Arquitetura: 3
// mockups reais) — sem caption, igual à referência enviada pelo usuário.
function StackedImage({ src, alt, aspect }: { src: string; alt: string; aspect: string }) {
  return (
    <ImageLightbox images={[{ src, alt }]}>
      <div
        className={`relative w-full overflow-hidden ${CARD} transition-all duration-300 hover:scale-[1.01] hover:border-white/25`}
        style={{ aspectRatio: aspect }}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    </ImageLightbox>
  );
}

function FeatureGrid({ items }: { items: TitleDescription[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
      {items.map((item, index) => {
        const Icon = FEATURE_ICONS[index] ?? Calendar;
        return (
          <div key={item.title} className={`flex flex-col gap-3 ${CARD} p-5`}>
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
              <h3 className="text-base font-medium text-white">{item.title}</h3>
            </div>
            <p className="text-base leading-[1.5]">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export function MobileAppPage({ locale }: { locale: Locale }) {
  const { setLocale } = useLanguage();
  const t = mobileAppContent[locale];

  useEffect(() => {
    setLocale(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const tocItems: TocItem[] = [
    { id: "overview", label: t.hero.navLabel },
    { id: "contexto", label: t.context.eyebrow },
    { id: "ideacao", label: t.ideation.eyebrow },
    { id: "pesquisa-qualitativa", label: t.research.eyebrow },
    { id: "o-mvp", label: t.mvp.eyebrow },
    { id: "arquitetura-design-system", label: t.architecture.eyebrow },
    { id: "teste-usabilidade", label: t.usability.eyebrow },
    { id: "lancamento", label: t.launch.eyebrow },
    { id: "desenho-da-feature", label: t.featureDesign.eyebrow },
    { id: "retencao", label: t.retention.eyebrow },
  ];

  return (
    <main className="flex flex-col">
      {/* case-study-sidebar/case-study-container: correção de alinhamento na faixa
          1366–1919.98px (ver globals.css) — fora dessa faixa, essas classes não têm nenhuma
          regra aplicada, então left-10/w-[220px]/max-w-[1269px] mandam sozinhas como antes. */}
      <aside className="case-study-sidebar fixed top-[120px] left-10 z-40 hidden w-[220px] desktop:block">
        <TableOfContents items={tocItems} />
      </aside>

      <div className={PAGE_PADDING_X}>
        <div className="case-study-container mx-auto flex w-full max-w-[1269px] flex-col items-center desktop:border-x desktop:border-border desktop:px-10">
          <div className="flex w-full max-w-[75ch] flex-col">
            {/* Hero — mesmo princípio do Chapter: um único Reveal para o bloco inteiro (link +
                título + intro + StatCards), sem stagger entre eles. */}
            <section
              id="overview"
              className="flex scroll-mt-[120px] flex-col gap-6 pt-12 pb-10 tablet:pt-16"
            >
              <Reveal className="flex flex-col gap-6">
                <div className="flex flex-col gap-10">
                  <Link
                    href="/"
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
          </div>

          <div className="flex w-full max-w-[75ch] flex-col">
            {/* 01 — Contexto */}
            <Chapter id="contexto" number={t.context.number} title={t.context.eyebrow}>
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.context.body}</p>
            </Chapter>

            {/* 02 — Ideação */}
            <Chapter id="ideacao" number={t.ideation.number} title={t.ideation.eyebrow}>
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.ideation.body}</p>
            </Chapter>

            {/* 03 — Pesquisa qualitativa */}
            <Chapter
              id="pesquisa-qualitativa"
              number={t.research.number}
              title={t.research.eyebrow}
            >
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.research.intro}</p>
              <ul className="flex flex-col gap-6">
                {t.research.quotes.map((q) => (
                  <li
                    key={q.number}
                    className={`${PROSE_WIDTH} flex gap-3 text-base leading-[1.5] text-text-50`}
                  >
                    <span className="text-accent">—</span>
                    {q.quote}
                  </li>
                ))}
              </ul>
            </Chapter>

            {/* 04 — O MVP */}
            <Chapter id="o-mvp" number={t.mvp.number} title={t.mvp.eyebrow}>
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.mvp.intro}</p>
              <FeatureGrid items={t.mvp.features} />
              <StackedImage
                src="/case-studies/app-mobile/figjam-userflow.png"
                alt={locale === "en-US" ? "FigJam user flow" : "Fluxo de usuário no FigJam"}
                aspect="1586 / 854"
              />
            </Chapter>

            {/* 05 — Arquitetura e Design System */}
            <Chapter
              id="arquitetura-design-system"
              number={t.architecture.number}
              title={t.architecture.eyebrow}
            >
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.architecture.body}</p>
              <div className="flex flex-col gap-6">
                <StackedImage
                  src="/case-studies/app-mobile/app-home.png"
                  alt={locale === "en-US" ? "App schedule screen" : "Tela de agenda do aplicativo"}
                  aspect="4296 / 2324"
                />
                <StackedImage
                  src="/case-studies/app-mobile/app-task.png"
                  alt={locale === "en-US" ? "App links screen" : "Tela de vínculos do aplicativo"}
                  aspect="4296 / 2324"
                />
                <StackedImage
                  src="/case-studies/app-mobile/app-case.png"
                  alt={
                    locale === "en-US"
                      ? "App appointment and updates screen"
                      : "Tela de compromisso e andamentos do aplicativo"
                  }
                  aspect="4296 / 2324"
                />
              </div>
            </Chapter>

            {/* 06 — Teste de usabilidade */}
            <Chapter
              id="teste-usabilidade"
              number={t.usability.number}
              title={t.usability.eyebrow}
            >
              <StatCardRow items={t.usability.metrics} size="secondary" />
              <ImageLightbox
                images={[
                  {
                    src: "/case-studies/app-mobile/sus.png",
                    alt:
                      locale === "en-US"
                        ? "SUS score interpretation scale"
                        : "Escala de interpretação do SUS Score",
                  },
                ]}
              >
                <div className="overflow-hidden rounded border border-border transition-all duration-300 hover:scale-[1.01] hover:border-white/25">
                  <Image
                    src="/case-studies/app-mobile/sus.png"
                    alt={
                      locale === "en-US"
                        ? "SUS score interpretation scale"
                        : "Escala de interpretação do SUS Score"
                    }
                    width={815}
                    height={274}
                    className="h-auto w-full"
                  />
                </div>
              </ImageLightbox>
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.usability.body}</p>
            </Chapter>

            {/* 07 — Lançamento */}
            <Chapter id="lancamento" number={t.launch.number} title={t.launch.eyebrow}>
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.launch.body}</p>
            </Chapter>

            {/* 08 — Desenho da feature */}
            <Chapter
              id="desenho-da-feature"
              number={t.featureDesign.number}
              title={t.featureDesign.eyebrow}
            >
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.featureDesign.intro}</p>
              <StackedImage
                src="/case-studies/app-mobile/new-task.png"
                alt={
                  locale === "en-US"
                    ? "Create and edit schedule screen"
                    : "Tela de criar e editar agenda"
                }
                aspect="6401 / 4800"
              />
              <StatCardRow items={t.featureDesign.metrics} size="secondary" />
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.featureDesign.note}</p>
            </Chapter>

            {/* 09 — Retenção */}
            <Chapter id="retencao" number={t.retention.number} title={t.retention.eyebrow}>
              <p className={`${PROSE_WIDTH} text-base leading-[1.6]`}>{t.retention.body}</p>
              <ImageLightbox
                images={[
                  {
                    src: "/case-studies/app-mobile/retention.png",
                    alt:
                      locale === "en-US"
                        ? "Cohort retention chart"
                        : "Gráfico de retenção por cohort",
                  },
                ]}
              >
                <div className="overflow-hidden rounded border border-border transition-all duration-300 hover:scale-[1.01] hover:border-white/25">
                  <Image
                    src="/case-studies/app-mobile/retention.png"
                    alt={
                      locale === "en-US"
                        ? "Cohort retention chart"
                        : "Gráfico de retenção por cohort"
                    }
                    width={4296}
                    height={1600}
                    className="h-auto w-full"
                  />
                </div>
              </ImageLightbox>
              <p className={`${PROSE_WIDTH} text-base leading-[1.4]`}>
                {t.retention.imageNote}
              </p>
            </Chapter>
          </div>
        </div>
      </div>
    </main>
  );
}
