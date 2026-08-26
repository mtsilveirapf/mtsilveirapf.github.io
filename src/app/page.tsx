"use client";

import Image from "next/image";
import Link from "next/link";
import { Code2, LayoutGrid, Plus, Mic } from "lucide-react";
import { LanguageTab } from "@/components/LanguageTab";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/Badge";
import { StatusBadge } from "@/components/StatusBadge";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ProjectCard } from "@/components/ProjectCard";
import { GhostProjectCard } from "@/components/GhostProjectCard";
import { WorkHistory } from "@/components/WorkHistory";
import { TypingAnimation } from "@/components/TypingAnimation";
import { UsersLineChart } from "@/components/UsersLineChart";
import { useLanguage } from "@/lib/language-context";
import { useHeroReveal } from "@/lib/use-hero-reveal";
import { PAGE_PADDING_X } from "@/lib/layout";
import { homeContent } from "@/content/home-content";
import { Reveal } from "@/components/motion/Reveal";

export default function Home() {
  const { locale } = useLanguage();
  const t = homeContent[locale];
  const langTabStyle = useHeroReveal(0);
  const profileStyle = useHeroReveal(1);
  const titleStyle = useHeroReveal(2);
  const companiesStyle = useHeroReveal(3);

  return (
    <main className="flex flex-col">
      {/* Hero — docs/framer-audit.md, seção 2.1 (height: 86vh / min-height: 85vh no Framer) */}
      <section className={`flex min-h-[85vh] flex-col ${PAGE_PADDING_X}`}>
        <div className="mx-auto flex h-full w-full max-w-[1269px] flex-1 flex-col justify-between gap-9 border-border pt-10 desktop:border-x">
          {/* mx-0 self-start tablet:mx-6 tablet:self-center: só no mobile o chip de idioma
              alinha à esquerda (mesmo inset do resto do conteúdo, sem margem própria somando
              em cima do px-6 da section) em vez de centralizado — tablet/desktop mantêm
              mx-6/self-center originais, inalterados. */}
          <div
            className="mx-0 w-fit self-start tablet:mx-6 tablet:self-center desktop:mx-10"
            style={langTabStyle}
          >
            <LanguageTab className="border-x-0" />
          </div>

          {/* px-0 tablet:px-6: só no mobile o próprio padding do bloco de perfil some — ele já
              herda o px-6 da section por fora, então ficava com inset dobrado (24+24=48px). A
              partir do tablet volta ao px-6 de sempre (inalterado), a pedido explícito do
              usuário só pro mobile. */}
          <div
            className="flex flex-col items-start gap-4 px-0 pb-10 tablet:flex-row tablet:items-center tablet:px-6 desktop:px-10"
            style={profileStyle}
          >
            <div className="h-[119px] w-[119px] shrink-0 overflow-hidden rounded">
              <Image
                src="https://framerusercontent.com/images/qykUV1P2LbGoPD3hue4zSiNMwbQ.jpeg"
                alt="Matheus Francisco"
                width={119}
                height={119}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="font-secondary-home flex flex-col gap-1 text-sm leading-[1.5] text-text-50">
              <p className="text-base text-accent">{t.hero.greeting}</p>
              {t.hero.credentials.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          {/* pl-0 tablet:pl-6: mesmo motivo do bloco de perfil acima — só o mobile perde o
              próprio padding (já tem o px-6 da section por fora); tablet/desktop inalterados. */}
          <h1
            className="w-full pl-0 text-[40px] leading-[1.05] font-semibold tracking-[-0.05em] text-white tablet:pl-6 tablet:text-[64px] desktop:pl-10 desktop:text-[80px]"
            style={titleStyle}
          >
            {t.hero.titleLine1}
            <br />
            <span className="text-dark-gray">{t.hero.titleLine2Prefix}</span>{" "}
            {t.hero.titleLine2Rest}
          </h1>

          {/* 4 empresas confirmadas via screenshot de referência do Framer: Zenvia, Thomson
              Reuters, BETC Havas, Pecege. Assets originais fornecidos pelo usuário em
              empresas-logos/ e copiados para public/logos/. Nomes de empresas não traduzem. */}
          {/* -mx-6 tablet:mx-0: full-bleed só no mobile, a pedido explícito do usuário — o
              grid precisa ocupar 100% da viewport, ignorando o px-6 herdado da section (única
              largura que cria o inset aqui, já que o container mx-auto max-w-[1269px] não
              restringe nada nessa faixa). Margem negativa igual ao padding cancela esse inset.
              A partir do tablet volta a ficar flush com o container (tablet:mx-0), como
              sempre esteve nesse breakpoint. */}
          <div
            className="-mx-6 grid grid-cols-2 divide-x divide-border rounded-none border-t border-b border-border tablet:mx-0 tablet:grid-cols-4"
            style={companiesStyle}
          >
            <div className="flex items-center justify-center bg-[rgb(10,10,10)] p-6">
              <Image
                src="/logos/zenvia.png"
                alt="Zenvia"
                width={160}
                height={40}
                className="h-auto max-h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <div className="flex items-center justify-center bg-[rgb(10,10,10)] p-6">
              <Image
                src="/logos/thomson-reuters.png"
                alt="Thomson Reuters"
                width={146}
                height={64}
                className="h-[64px] w-[146px] object-contain brightness-0 invert"
              />
            </div>
            {/* border-t: no grid-cols-2 do mobile, BETC Havas e Pecege formam a 2ª linha —
                divide-x sozinho não separa linhas, só colunas. A partir do tablet o grid vira
                4 colunas (1 linha só), então a borda soma nas laterais (border-l, já coberta
                por divide-x) e precisa sumir. */}
            <div className="flex items-center justify-center border-t border-border bg-[rgb(10,10,10)] p-6 tablet:border-t-0">
              <Image
                src="/logos/betc-havas.png"
                alt="BETC Havas"
                width={64}
                height={56}
                unoptimized
                className="h-[56px] w-[64px] object-contain"
              />
            </div>
            <div className="flex items-center justify-center border-t border-border bg-[rgb(10,10,10)] p-6 tablet:border-t-0">
              <Image
                src="/logos/pecege.png"
                alt="Pecege"
                width={82}
                height={82}
                className="h-[82px] w-[82px] object-contain brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Destaques / Projetos — motion: seção inteira entra como uma unidade só (Reveal), sem
          stagger entre os filhos, mesmo padrão default de todo o site a partir daqui (a Home só
          não aplica isso no Hero acima, que já tem sua própria animação própria via
          useHeroReveal, intocada). */}
      <section className={PAGE_PADDING_X}>
        <div className="mx-auto flex max-w-[1269px] flex-col border-border desktop:border-x desktop:border-b desktop:px-10 py-10">
          <Reveal className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={t.destaques.eyebrow}
              title={t.destaques.title}
            />

            {/* Grade única pros 2 cards — mesma largura de coluna, mesma estrutura interna, sem
                tratamento especial pro card em destaque. */}
            <div className="grid grid-cols-1 gap-6 desktop:grid-cols-2">
              <ProjectCard
                href={locale === "en-US" ? "/en/deadline-control" : "/gestao-prazos"}
                image={{
                  src: "https://framerusercontent.com/images/YCLwbdBsZEPpVLhgwjZO1PfUQ0.png",
                  alt: t.destaques.main.title,
                }}
                title={t.destaques.main.title}
                description={t.destaques.main.description}
                stats={t.destaques.main.stats}
              />

              <ProjectCard
                href={locale === "en-US" ? "/en/mobile-app" : "/app-mobile"}
                image={{
                  src: "/case-studies/app-mobile/app-case.png",
                  alt: t.destaques.secondary1.title,
                }}
                title={t.destaques.secondary1.title}
                description={t.destaques.secondary1.description}
                stats={t.destaques.secondary1.stats}
              />

              <GhostProjectCard message={t.destaques.ghostMessage} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Perfil / Sobre mim */}
      <section className={PAGE_PADDING_X}>
        <div className="mx-auto flex max-w-[1269px] flex-col border-border desktop:border-x desktop:border-b desktop:px-10 py-10">
          <Reveal className="flex flex-col gap-10">
            <SectionHeading eyebrow={t.perfil.eyebrow} title={t.perfil.title} />
            <div className="flex flex-col gap-10 desktop:flex-row">
              <div className="flex shrink-0 flex-col gap-4 desktop:w-[350px]">
                <div className="relative h-[300px] w-full overflow-hidden rounded desktop:h-[410px]">
                  <Image
                    src="https://framerusercontent.com/images/qykUV1P2LbGoPD3hue4zSiNMwbQ.jpeg"
                    alt={t.perfil.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-6">
                {/* Texto corrido sem nenhum destaque visual (sem cor accent, sem sublinhado) —
                    a pedido explícito do usuário, substituindo o RichParagraph anterior. */}
                <div className="flex flex-col gap-4">
                  {t.perfil.paragraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base leading-[1.4] tracking-[-0.03em]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="mb-3 text-lg text-white">
                    {t.perfil.experiencesLabel}
                  </p>
                  <WorkHistory
                    experiences={t.perfil.workHistory.experiences}
                    showAllLabel={t.perfil.workHistory.showAll}
                    showLessLabel={t.perfil.workHistory.showLess}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5+ ANOS / Por que eu? — FAQ accordion, layout de 2 colunas. Reveal assume o papel de
          container flex das 2 colunas (antes era a própria div com borda) — a div externa fica
          só com largura/borda, sem layout, pra não duplicar responsabilidade. */}
      <section className={PAGE_PADDING_X}>
        <div className="mx-auto max-w-[1269px] border-border desktop:border-x desktop:border-b">
          <Reveal className="flex flex-col gap-10 desktop:flex-row desktop:gap-0">
            <div className="desktop:w-[30%] desktop:border-r desktop:border-border desktop:px-10 desktop:py-10">
              <SectionHeading eyebrow={t.whyMe.eyebrow} title={t.whyMe.title} />
            </div>
            <div className="desktop:w-[70%] desktop:px-10 desktop:py-10">
              <FaqAccordion items={t.whyMe.items} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* LEITURA / Data-Driven Design */}
      <section className={PAGE_PADDING_X}>
        <div className="mx-auto flex max-w-[1269px] flex-col border-border desktop:border-x desktop:px-10 py-10">
          <Reveal className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={t.leitura.eyebrow}
              title={t.leitura.title}
            />
            <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2">
              <Link
                href={locale === "en-US" ? "/en/data-driven" : "/data-driven"}
                target="_blank"
                className="flex flex-col gap-4 rounded border border-border p-6 transition-colors hover:bg-[rgb(13,13,13)]"
              >
                <h3 className="text-xl leading-[1.5] font-medium tracking-[-0.5px] text-white">
                  {t.leitura.card1.title}
                </h3>
                <p className="text-base">
                  {t.leitura.card1.description}
                </p>
                <div className="flex flex-1 items-center justify-center">
                  <UsersLineChart />
                </div>
              </Link>
              <div className="relative flex flex-col gap-4 rounded border border-border p-6">
                <StatusBadge status="in-progress" />
                <h3 className="text-xl leading-[1.5] font-medium tracking-[-0.5px] text-white">
                  {t.leitura.card2.title}
                </h3>
                <p className="text-base">
                  {t.leitura.card2.description}
                </p>
                <div className="flex flex-col gap-4 rounded border border-border bg-[rgb(13,13,13)] px-4 py-4">
                  <TypingAnimation />
                  <div className="flex items-center gap-3 border-t border-border pt-3 text-dark-gray">
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                    <Mic className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge
                    title={t.leitura.card2.codeBadge}
                    icon={<Code2 className="h-3.5 w-3.5" strokeWidth={1.5} />}
                  />
                  <Badge
                    title={t.leitura.card2.designSystemBadge}
                    icon={
                      <LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.5} />
                    }
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
