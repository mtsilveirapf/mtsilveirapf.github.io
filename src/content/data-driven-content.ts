import type { Locale } from "@/lib/language-context";

export type TitleDescription = { title: string; description: string };
export type GalleryItem = { placeholderLabel: string; caption: string; image?: string | null };
export type ToolItem = { name: string; logo: string | null };

// Conteúdo extraído do projeto Framer (rota /data-driven, MCP) — fonte de verdade do TEXTO,
// não da estrutura visual (ver comentário em DataDrivenPage.tsx sobre o redesign, mesma lógica
// já aplicada em gestao-prazos-content.ts).
//
// Duas seções distintas existiam no Framer com conteúdo sobre o mesmo tema: uma versão curta
// (usada no hero/galeria, bilíngue — traduzida corretamente tanto em pt-BR quanto em
// /data-driven-en) e uma versão mais longa e detalhada (títulos "Métricas de produto"/"Métricas
// de UX", "Rotina", "Aprendizado com dados") que só existia em português mesmo na página em
// inglês — sinal de conteúdo não publicado/traduzido na fonte. Optei por usar a versão curta no
// hero (intro) e a versão longa, mais rica, como corpo das seções — é a mesma informação, só em
// dois níveis de detalhe; nenhum texto foi inventado, a versão em inglês da seção longa foi
// traduzida por mim a partir do texto em português do Framer (mesmo procedimento já usado em
// vários trechos de gestao-prazos-content.ts).
export type DataDrivenContent = {
  backLink: string;
  hero: {
    title: string;
  };
  approach: {
    number: string;
    eyebrow: string;
    intro: string;
    metrics: TitleDescription[];
    closing: string;
  };
  routine: {
    number: string;
    eyebrow: string;
    body: string;
  };
  tools: {
    number: string;
    eyebrow: string;
    items: ToolItem[];
  };
  gallery: {
    number: string;
    eyebrow: string;
    items: GalleryItem[];
    closingLead: string;
    closingEmphasis: string;
  };
};

export const dataDrivenContent: Record<Locale, DataDrivenContent> = {
  "pt-BR": {
    backLink: "Voltar ao portfólio",
    hero: {
      title: "Estratégia e Pensamento de Produto",
    },
    approach: {
      number: "01",
      eyebrow: "Como penso sobre dados",
      intro:
        "O trabalho de Product Design inclui investigar dados do passado, acompanhar o presente e planejar o futuro do produto. Não se limita ao que foi construído: analiso o histórico de comportamento, o desempenho atual e as tendências que orientam próximas decisões, usando métricas de produto e métricas de UX.",
      metrics: [
        {
          title: "Métricas de produto",
          description:
            "Indicam crescimento e eficiência do produto, como conversão, retenção, adoção de funcionalidades e LTV.",
        },
        {
          title: "Métricas de UX",
          description:
            "Mostram usabilidade, satisfação e esforço do usuário. Trabalho com testes A/B, CES (Customer Effort Score), SUS (System Usability Score) e taxa de conversão.",
        },
      ],
      closing:
        "Um problema de usabilidade costuma se refletir em queda de retenção ou conversão. Por isso analiso os dois tipos de métrica em conjunto.",
    },
    routine: {
      number: "02",
      eyebrow: "Rotina",
      body:
        "Investigo dados de produto usando SQL e ferramentas de observabilidade. Construo e mantenho dashboards para acompanhar funis e indicadores-chave. Defino KPIs em conjunto com PMs/POs e Analistas de Negócio.",
    },
    tools: {
      number: "03",
      eyebrow: "Ferramentas",
      items: [
        { name: "Datadog", logo: "/tools/datadog.png" },
        { name: "Hotjar", logo: "/tools/hotjar.png" },
        { name: "Clarity", logo: "/tools/clarity.png" },
        { name: "Google Analytics", logo: "/tools/google-analytics.png" },
        { name: "FullStory", logo: "/tools/fullstory.jpeg" },
      ],
    },
    gallery: {
      number: "04",
      eyebrow: "Dashboards que construo",
      items: [
        {
          placeholderLabel: "Engajamento por página",
          caption:
            "Tempo por view, ações por página, matriz de engajamento (usuários x frequência de ação) e sinais de frustração por página/tempo.",
          image: "/dashboards/tempo-view.png",
        },
        {
          placeholderLabel: "Usuários ativos por conta",
          caption:
            "Usuários ativos, contas, uso por tenant, distribuição por tier e tendência de visitas ao longo do tempo.",
          image: "/dashboards/usuarios-ativos.png",
        },
        {
          placeholderLabel: "Matriz de engajamento",
          caption: "Matriz de engajamento: contagem de ações, usuários únicos e views cruzadas.",
          image: "/dashboards/matriz-engajamento.png",
        },
        {
          placeholderLabel: "Uso de feature",
          caption:
            "Monitoramento de uso de feature. Sucesso/erro por tipo de operação e ranking de uso.",
          image: "/dashboards/monitoramento-feature.png",
        },
        {
          placeholderLabel: "Performance — LCP e INP",
          caption:
            "Percentil 75 de Loading Time, LCP e INP por view, com série temporal comparando as três métricas.",
          image: "/dashboards/pc75.png",
        },
        {
          placeholderLabel: "Volume de visitas x performance",
          caption: "Volume de visitas (barras) x médias de Loading Time e LCP (linhas) ao longo do tempo.",
          image: "/dashboards/volume-visitas.png",
        },
      ],
      closingLead: "O cruzamento entre dados e decisão é o que sustenta um design realmente orientado a ",
      closingEmphasis: "resultados.",
    },
  },
  "en-US": {
    backLink: "Back to portfolio",
    hero: {
      title: "Product Strategy & Thinking",
    },
    approach: {
      number: "01",
      eyebrow: "How I think about data",
      intro:
        "The work of Product Design includes investigating past data, monitoring the present, and planning the product's future. It isn't limited to what was already built: I analyze historical behavior, current performance, and the trends that guide upcoming decisions, using product metrics and UX metrics.",
      metrics: [
        {
          title: "Product metrics",
          description:
            "Show the product's growth and efficiency, such as conversion, retention, feature adoption, and LTV.",
        },
        {
          title: "UX metrics",
          description:
            "Show usability, satisfaction, and user effort. I work with A/B tests, CES (Customer Effort Score), SUS (System Usability Score), and conversion rate.",
        },
      ],
      closing:
        "A usability problem usually shows up as a drop in retention or conversion. That's why I analyze both types of metric together.",
    },
    routine: {
      number: "02",
      eyebrow: "Routine",
      body:
        "I investigate product data using SQL and observability tools. I build and maintain dashboards to track funnels and key indicators. I define KPIs together with PMs/POs and Business Analysts.",
    },
    tools: {
      number: "03",
      eyebrow: "Tools",
      items: [
        { name: "Datadog", logo: "/tools/datadog.png" },
        { name: "Hotjar", logo: "/tools/hotjar.png" },
        { name: "Clarity", logo: "/tools/clarity.png" },
        { name: "Google Analytics", logo: "/tools/google-analytics.png" },
        { name: "FullStory", logo: "/tools/fullstory.jpeg" },
      ],
    },
    gallery: {
      number: "04",
      eyebrow: "Dashboards I build",
      items: [
        {
          placeholderLabel: "Engagement per page",
          caption:
            "Time per view, actions per page, engagement matrix (users x action frequency), and frustration signals by page/time.",
          image: "/dashboards/tempo-view.png",
        },
        {
          placeholderLabel: "Active users per account",
          caption: "Active users, accounts, usage per tenant, distribution by tier, and visit trend over time.",
          image: "/dashboards/usuarios-ativos.png",
        },
        {
          placeholderLabel: "Engagement matrix",
          caption: "Engagement matrix: action count, unique users, and cross-referenced views.",
          image: "/dashboards/matriz-engajamento.png",
        },
        {
          placeholderLabel: "Feature usage",
          caption: "Feature usage monitoring. Success/error rate by operation type and usage ranking.",
          image: "/dashboards/monitoramento-feature.png",
        },
        {
          placeholderLabel: "Performance — LCP and INP",
          caption:
            "75th percentile of Loading Time, LCP, and INP by view, with a time series comparing all three metrics.",
          image: "/dashboards/pc75.png",
        },
        {
          placeholderLabel: "Visit volume vs. performance",
          caption: "Visit volume (bars) vs. average Loading Time and LCP (lines) over time.",
          image: "/dashboards/volume-visitas.png",
        },
      ],
      closingLead: "The intersection between data and decision-making is what truly sustains design oriented toward ",
      closingEmphasis: "results.",
    },
  },
};
