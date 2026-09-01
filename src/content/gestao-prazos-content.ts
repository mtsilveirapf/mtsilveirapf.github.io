import type { Locale } from "@/lib/language-context";

export type Metric = { value: string; label: string };
export type TitleDescription = { title: string; description: string };
export type Quote = { number: string; title: string; quote: string };
export type SolutionItem = {
  title: string;
  description: string;
  ndaNote: string;
  alt: string;
  image: string;
};

export type CaseStudyContent = {
  backLink: string;
  hero: {
    navLabel: string;
    title: string;
    intro: string;
    metrics: Metric[];
  };
  discovery: {
    number: string;
    eyebrow: string;
    intro: string[];
    dataStrip: Metric[];
    interviewsNote: string;
    saturationNote: string;
    quotesIntro: string;
    quotes: Quote[];
  };
  lawsOfUx: {
    number: string;
    eyebrow: string;
    intro: string;
    items: TitleDescription[];
  };
  process: {
    number: string;
    eyebrow: string;
    steps: string[];
    aiSkillFlow: {
      step1Texts: string[];
      step2Texts: string[];
      step3Texts: string[];
    };
  };
  alternatives: {
    number: string;
    eyebrow: string;
    intro: string;
    discarded: TitleDescription;
    chosenTitle: string;
    criteria: TitleDescription[];
    cognitiveLoadFlow: {
      beforeLabel: string;
      afterLabel: string;
      groups: string[];
    };
    journeyFlow: {
      previousLabel: string;
      previousSteps: string[];
      currentLabel: string;
      currentSteps: string[];
    };
  };
  solution: {
    number: string;
    eyebrow: string;
    items: SolutionItem[];
    carouselPrevLabel: string;
    carouselNextLabel: string;
    privacyNotice: string;
  };
  poc: {
    number: string;
    eyebrow: string;
    intro: string;
    sample: Metric[];
  };
  pocResults: {
    number: string;
    eyebrow: string;
    metrics: Metric[];
    note: string;
  };
  learnings: {
    number: string;
    eyebrow: string;
    items: string[];
  };
  nextSteps: {
    number: string;
    eyebrow: string;
    items: string[];
  };
};

export const gestaoPrazosContent: Record<Locale, CaseStudyContent> = {
  "pt-BR": {
    backLink: "Voltar ao portfólio",
    hero: {
      navLabel: "Visão geral",
      title: "Liderando o redesign da jornada de maior impacto na retenção",
      intro:
        "O produto enfrenta crescimento de churn por migração para concorrentes com menor curva de aprendizado. Mapeei as jornadas críticas e priorizei \"Controle de Prazos\" como a de maior potencial de impacto na retenção. Critério de priorização meu, baseado em dados de UX e cancelamento. Em testes fechados com clientes, a nova jornada alcançou 73% de retenção, eliminou 4 etapas e teve aprovação de 4,6 de 5.",
      metrics: [
        { value: "73%", label: "Retenção" },
        { value: "4", label: "Etapas eliminadas" },
        { value: "4,6/5", label: "Satisfação" },
      ],
    },
    discovery: {
      number: "01",
      eyebrow: "Descoberta",
      intro: [
        "A jornada \"Controle de Prazos\" tinha uma estrutura densa e mal organizada. Isso causava fadiga de decisão e abandono.",
        "Cruzei dados internos de NPS, cancelamento e registros de UX para dimensionar o problema:",
      ],
      dataStrip: [
        { value: "37%", label: "dos registros de UX citavam dificuldades com o módulo de tarefas" },
        { value: "3,9/5", label: "nota de serviço" },
        { value: "16%", label: "dos cancelamentos apontavam a gestão de atividades como causa" },
      ],
      interviewsNote:
        "Conduzi entrevistas em profundidade para entender a causa por trás dos números. Construí skills no Claude para estruturar persona, mapa de empatia e trabalho a ser feito. As skills organizaram a pesquisa e sugeriram os pontos de dor, que revisei e confirmei contra o que observei nas entrevistas.",
      saturationNote:
        "Cheguei à saturação quando os mesmos motivos começaram a se repetir. Segundo relatos:",
      quotesIntro: "Segundo relatos:",
      quotes: [
        {
          number: "01",
          title: "Definição de Prazos",
          quote:
            "Não sinto segurança sobre as datas de entrega, os prazos parecem dispersos e desconectados na agenda",
        },
        {
          number: "02",
          title: "Esforço Cognitivo",
          quote:
            "Sinto cansaço ao tentar organizar os prazos da equipe, é muita informação para processar sozinho",
        },
        {
          number: "03",
          title: "Análise de Tarefas",
          quote: "Tenho dificuldade em entender o que fazer primeiro, tudo parece igual",
        },
        {
          number: "04",
          title: "Hierarquia Deficitária",
          quote: "Fico confuso ao priorizar o dia, não há distinção de importância",
        },
        {
          number: "05",
          title: "Repetição e Manualidade",
          quote: "Perco tempo com tarefas repetitivas que o sistema já deveria ter resolvido",
        },
      ],
    },
    lawsOfUx: {
      number: "02",
      eyebrow: "Leis de UX",
      intro:
        "Identifiquei violações que tangibilizaram a gravidade do problema para os stakeholders.",
      items: [
        {
          title: "Sobrecarga de Escolha",
          description: "Sobrecarga ao lidar com um grande número de opções.",
        },
        {
          title: "Carga Cognitiva",
          description:
            "Recursos mentais necessários para compreender e interagir com uma interface.",
        },
        {
          title: "Lei de Hick",
          description:
            "O tempo de decisão aumenta com o número e a complexidade das opções.",
        },
        {
          title: "Regra do Pico-Fim",
          description:
            "Uma experiência é julgada pelo auge e pelo fim, não pela média.",
        },
      ],
    },
    process: {
      number: "03",
      eyebrow: "Processo de Design",
      steps: [
        "Comecei estruturando a pesquisa com skills que construí no Claude: persona, mapa de empatia, job to be done. A base veio de documentos internos, pesquisas antigas e entrevistas com usuários. Defini os critérios de cada skill e validei as saídas contra as entrevistas reais.",
        "Na prototipação, trabalhei com Figma MCP e Claude Code. As interações da solução e o escopo de cada tela foram decisões minhas.",
        "Nos testes, parti de usuários sintéticos, construídos a partir dos dados da pesquisa, até atingir saturação. Depois avancei para usuários reais dentro da persona-alvo: sete pessoas.",
      ],
      aiSkillFlow: {
        step1Texts: ["Materiais de pesquisa", "Definição de problema"],
        step2Texts: [
          "Skill: user-journey",
          "Skill: user-persona",
          "Skill: UI-prototype",
          "Skill: usability-testing",
        ],
        step3Texts: ["Refinamento de artefatos"],
      },
    },
    alternatives: {
      number: "04",
      eyebrow: "Como podemos?",
      intro:
        "Avaliei alternativas em cinco critérios: redução cognitiva, aderência ao usuário, escalabilidade, esforço de implementação e trade-offs assumidos. As opções abaixo foram as melhores soluções que saíram do How Might We.",
      discarded: {
        title: "Alternativa descartada",
        description:
          "Um sistema que notificaria prazos críticos, sem alterar a interface. Esse sistema tratava o sintoma. A fragmentação continuaria existindo. O usuário ficaria passivo, reagindo a alertas em vez de controlar a agenda.",
      },
      chosenTitle: "Alternativa escolhida: Controle de Prazos",
      criteria: [
        {
          title: "Redução Cognitiva",
          description:
            "Agrupar tarefas por prazo elimina a decisão de \"o que fazer primeiro\". A pessoa vê o agrupamento, não a lista inteira.",
        },
        {
          title: "Aderência ao Usuário",
          description:
            "As entrevistas mostraram que as pessoas já pensavam em \"prazo\" como unidade de trabalho. O produto formaliza um modelo mental que já existia.",
        },
        {
          title: "Escalabilidade",
          description:
            "A entidade \"Prazo\" pode ser reaproveitada por outras jornadas no futuro. Não é uma solução isolada, é uma peça de plataforma.",
        },
        {
          title: "Esforço de Implementação",
          description: "Baixo. A estrutura se encaixa na arquitetura existente.",
        },
        {
          title: "Trade-off assumido",
          description:
            "Prazos criados antes da mudança não seriam contemplados pelo novo modelo, por limitação técnica. Decidimos assumir esse custo em troca de resolver a causa da fragmentação, não só o sintoma.",
        },
      ],
      cognitiveLoadFlow: {
        beforeLabel: "Hierarquia anterior",
        afterLabel: "Hierarquia atual",
        groups: ["Prazo A", "Prazo B", "Prazo C"],
      },
      journeyFlow: {
        previousLabel: "Jornada anterior",
        previousSteps: [
          "Filtrar por envolvido",
          "Abrir tarefa",
          "Abrir em nova guia",
          "Preencher forms manuais",
          "Abrir agenda",
          "Reabrir tarefa",
          "Cumprir tarefa",
          "Abrir vínculos",
          "Buscar próxima tarefa",
        ],
        currentLabel: "Jornada atual",
        currentSteps: [
          "Clicar em novo prazo",
          "Geração automática de tarefas",
          "Abrir agenda",
          "Abrir prazo",
          "Cumprir e navegar entre tarefas",
        ],
      },
    },
    solution: {
      number: "05",
      eyebrow: "Solução: Controle de Prazos",
      carouselPrevLabel: "Item anterior",
      carouselNextLabel: "Próximo item",
      privacyNotice:
        "Por motivos de NDA, o Design System e as interfaces originais foram alterados para fins de portfólio. As telas exibidas representam o esquema da solução final.",
      items: [
        {
          title: "Entidade \"Prazo\"",
          description:
            "Agrupador que reúne tarefas de um mesmo contexto. Elimina a fragmentação da jornada. Ao criar um prazo, a automação gera as sequências definidas pelo usuário.",
          ndaNote:
            "Nota: telas modificadas a partir do Design System original, alteradas por mim por questões de NDA.",
          alt: "Captura de tela — Entidade \"Prazo\"",
          image: "/case-studies/gestao-prazos/publications.png",
        },
        {
          title: "Lista, Priorização & Sinalização Visual",
          description:
            "Visão macro dos prazos ativos. Ordenada por proximidade de vencimento, com sinalização visual de urgência.",
          ndaNote:
            "Nota: telas modificadas a partir do Design System original, alteradas por mim por questões de NDA.",
          alt: "Captura de tela — Lista, Priorização & Sinalização Visual",
          image: "/case-studies/gestao-prazos/lista-prazos.png",
        },
        {
          title: "Kanban individual por prazo",
          description:
            "Visão granular dentro de cada prazo. Acompanha as tarefas relacionadas, como um Trello.",
          ndaNote:
            "Nota: telas modificadas a partir do Design System original, alteradas por mim por questões de NDA.",
          alt: "Captura de tela — Kanban individual por prazo",
          image: "/case-studies/gestao-prazos/kanban-prazo.png",
        },
      ],
    },
    poc: {
      number: "06",
      eyebrow: "Prova de conceito (PoC)",
      intro:
        "Levamos a solução \"Controle de Prazos\" para uma prova de conceito em produção. O objetivo era observar o uso da feature em contexto real, com clientes reais. A mudança era grande para os usuários, então decidimos validar antes de uma implementação mais ampla.",
      sample: [
        { label: "Amostra", value: "20 clientes selecionados" },
        { label: "Usuários", value: "113 ativos nessas contas" },
        { label: "Tempo", value: "4 semanas" },
        {
          label: "Metodologia",
          value: "Adesão voluntária, o usuário escolhia entre a jornada atual e a nova",
        },
      ],
    },
    pocResults: {
      number: "07",
      eyebrow: "Resultados PoC",
      metrics: [
        { value: "4", label: "Etapas reduzidas no fluxo" },
        { value: "4,6/5", label: "Satisfação (CSAT)" },
        { value: "73%", label: "Retenção vs. jornada anterior" },
      ],
      note:
        "A retenção de 73% é relevante considerando que era de adesão voluntária. A jornada antiga continuava disponível o tempo todo.",
    },
    learnings: {
      number: "08",
      eyebrow: "Aprendizados",
      items: [
        "Usuários sintéticos aceleram a saturação das hipóteses, mas não cobrem particularidades do processo humano. Esse é um fator muito relevante para o teste.",
        "Aceitar que prazos antigos ficassem fora do novo modelo envolveu um trade-off arriscado. Não me senti confortável com a decisão, mas a análise da engenharia sobre o esforço de retrabalho me convenceu a avançar.",
        "IA organiza bem persona, mapa de empatia e JTBD, mas exige revisão. O critério e a validação permanecem sob responsabilidade do designer.",
      ],
    },
    nextSteps: {
      number: "09",
      eyebrow: "Próximos passos",
      items: [
        "Escalonar a solução para a base completa de clientes.",
        "Acompanhar retenção, tickets e reclamações em longo prazo após o escalonamento. Esse acompanhamento definirá se o resultado foi alcançado.",
      ],
    },
  },
  "en-US": {
    backLink: "Back to portfolio",
    hero: {
      navLabel: "Overview",
      title: "Leading the redesign of the journey with the highest impact on retention",
      intro:
        "The product faces growing churn from migration to competitors with a shorter learning curve. I mapped the critical journeys and prioritized \"Deadline Control\" as the one with the greatest potential impact on retention. Prioritization criteria were mine, based on UX and cancellation data. In closed tests with clients, the new journey reached 73% retention, cut 4 steps and scored 4.6 out of 5.",
      metrics: [
        { value: "73%", label: "Retention" },
        { value: "4", label: "Steps eliminated" },
        { value: "4.6/5", label: "Satisfaction" },
      ],
    },
    discovery: {
      number: "01",
      eyebrow: "Discovery",
      intro: [
        "The \"Deadline Control\" journey had a dense, poorly organized structure. It caused decision fatigue and drop-off.",
        "I cross-referenced internal NPS, cancellation and UX record data to size the problem:",
      ],
      dataStrip: [
        { value: "37%", label: "of UX records cited difficulties with the task module" },
        { value: "3.9/5", label: "service rating" },
        { value: "16%", label: "of cancellations pointed to task management as the cause" },
      ],
      interviewsNote:
        "I ran in-depth interviews to understand the cause behind the numbers. I built Claude skills to structure user persona, empathy map and job to be done. The skills organized the research and suggested the pain points, which I reviewed and confirmed against what I observed in the interviews.",
      saturationNote:
        "I reached saturation when the same reasons started to repeat. According to reports:",
      quotesIntro: "According to reports:",
      quotes: [
        {
          number: "01",
          title: "Deadline Definition",
          quote:
            "I don't feel confident about delivery dates, deadlines feel scattered and disconnected from the schedule",
        },
        {
          number: "02",
          title: "Cognitive Effort",
          quote:
            "I feel tired trying to organize the team's deadlines, it's too much information to process alone",
        },
        {
          number: "03",
          title: "Task Analysis",
          quote: "I struggle to understand what to do first, everything looks the same",
        },
        {
          number: "04",
          title: "Poor Hierarchy",
          quote: "I get confused prioritizing my day, there's no sense of importance",
        },
        {
          number: "05",
          title: "Repetition and Manual Work",
          quote: "I waste time on repetitive tasks the system should have already solved",
        },
      ],
    },
    lawsOfUx: {
      number: "02",
      eyebrow: "Laws of UX",
      intro:
        "I identified violations that made the severity of the problem tangible for stakeholders.",
      items: [
        {
          title: "Choice Overload",
          description: "Overload from dealing with a large number of options.",
        },
        {
          title: "Cognitive Load",
          description:
            "The mental resources required to understand and interact with an interface.",
        },
        {
          title: "Hick's Law",
          description:
            "Decision time increases with the number and complexity of options.",
        },
        {
          title: "Peak-End Rule",
          description:
            "An experience is judged by its peak and its end, not by the average.",
        },
      ],
    },
    process: {
      number: "03",
      eyebrow: "Design Process",
      steps: [
        "I started by structuring the research with skills I built in Claude: persona, empathy map, job to be done. The base came from internal documents, past research and user interviews. I defined the criteria for each skill and validated the outputs against the real interviews.",
        "For prototyping, I worked with Figma MCP and Claude Code. The solution's interactions and the scope of each screen were my decisions.",
        "For testing, I started with synthetic users, built from the research data, until reaching saturation. Then I moved to real users within the target persona: seven people.",
      ],
      aiSkillFlow: {
        step1Texts: ["Research materials", "Problem definition"],
        step2Texts: [
          "Skill: user-journey",
          "Skill: user-persona",
          "Skill: UI-prototype",
          "Skill: usability-testing",
        ],
        step3Texts: ["Artifact refinement"],
      },
    },
    alternatives: {
      number: "04",
      eyebrow: "How Might We?",
      intro:
        "I evaluated alternatives against five criteria: cognitive reduction, user fit, scalability, implementation effort and the trade-off accepted. The options below were the best solutions that came out of the How Might We.",
      discarded: {
        title: "Discarded alternative",
        description:
          "A system that would notify critical deadlines without changing the interface. That system treated the symptom. Fragmentation would keep existing. The user would stay passive, reacting to alerts instead of controlling the schedule.",
      },
      chosenTitle: "Chosen alternative: Deadline Control",
      criteria: [
        {
          title: "Cognitive Reduction",
          description:
            "Grouping tasks by deadline eliminates the \"what to do first\" decision. The person sees the grouping, not the whole list.",
        },
        {
          title: "User Fit",
          description:
            "The interviews showed people already thought of \"deadline\" as a unit of work. The product formalizes a mental model that already existed.",
        },
        {
          title: "Scalability",
          description:
            "The \"Deadline\" entity can be reused by other journeys in the future. It's not an isolated solution, it's a platform piece.",
        },
        {
          title: "Implementation Effort",
          description: "Low. The structure fits the existing architecture.",
        },
        {
          title: "Trade-off Accepted",
          description:
            "Deadlines created before the change wouldn't be covered by the new model, due to a technical limitation. We chose to accept that cost in exchange for solving the cause of the fragmentation, not just the symptom.",
        },
      ],
      cognitiveLoadFlow: {
        beforeLabel: "Previous journey",
        afterLabel: "Redesigned journey",
        groups: ["Deadline A", "Deadline B", "Deadline C"],
      },
      journeyFlow: {
        previousLabel: "Previous journey",
        previousSteps: [
          "Filter by participant",
          "Open task",
          "Open in new tab",
          "Fill out manual forms",
          "Open schedule",
          "Reopen task",
          "Complete task",
          "Open links",
          "Find next task",
        ],
        currentLabel: "Current journey",
        currentSteps: [
          "Click new deadline",
          "Automatic task generation",
          "Open schedule",
          "Open deadline",
          "Complete and navigate between tasks",
        ],
      },
    },
    solution: {
      number: "05",
      eyebrow: "Solution: Deadline Control",
      carouselPrevLabel: "Previous item",
      carouselNextLabel: "Next item",
      privacyNotice:
        "For NDA reasons, the Design System and original interfaces were altered for portfolio purposes. The screens shown represent the final solution's structure.",
      items: [
        {
          title: "\"Deadline\" entity",
          description:
            "A grouper that brings together tasks from the same context. It eliminates fragmentation in the journey. When a deadline is created, automation generates the sequences the user defined.",
          ndaNote:
            "Note: screens modified from the original Design System, altered by me due to NDA reasons.",
          alt: "Screenshot — \"Deadline\" entity",
          image: "/case-studies/gestao-prazos/publications.png",
        },
        {
          title: "List, Prioritization & Visual Signaling",
          description:
            "A macro view of active deadlines. Ordered by proximity to due date, with visual urgency signaling.",
          ndaNote:
            "Note: screens modified from the original Design System, altered by me due to NDA reasons.",
          alt: "Screenshot — List, Prioritization & Visual Signaling",
          image: "/case-studies/gestao-prazos/lista-prazos.png",
        },
        {
          title: "Individual kanban per deadline",
          description:
            "A granular view inside each deadline. Tracks the related tasks, like a Trello board.",
          ndaNote:
            "Note: screens modified from the original Design System, altered by me due to NDA reasons.",
          alt: "Screenshot — Individual kanban per deadline",
          image: "/case-studies/gestao-prazos/kanban-prazo.png",
        },
      ],
    },
    poc: {
      number: "06",
      eyebrow: "Proof of Concept (PoC)",
      intro:
        "We took the \"Deadline Control\" solution to a production proof of concept. The goal was to observe how the feature would be used in a real context, with real clients. The change was significant for users, so we decided to validate it before a wider rollout.",
      sample: [
        { label: "Sample", value: "20 selected clients" },
        { label: "Users", value: "113 active in these accounts" },
        { label: "Time", value: "4 weeks" },
        {
          label: "Methodology",
          value: "Opt-in, the user chose between the current journey and the new one",
        },
      ],
    },
    pocResults: {
      number: "07",
      eyebrow: "PoC Results",
      metrics: [
        { value: "4", label: "Steps reduced in the flow" },
        { value: "4.6/5", label: "Satisfaction (CSAT)" },
        { value: "73%", label: "Retention vs. previous journey" },
      ],
      note:
        "73% retention is meaningful given it was opt-in. The old journey stayed available the whole time.",
    },
    learnings: {
      number: "08",
      eyebrow: "Learnings",
      items: [
        "Synthetic users accelerate hypothesis saturation, but they do not capture the particularities of human behavior. This is a highly relevant factor for the test.",
        "Accepting that existing deadlines would be excluded from the new model involved a risky trade-off. I was not comfortable with the decision, but engineering's analysis of the rework effort convinced me to move forward.",
        "AI organizes personas, empathy maps, and JTBD well, but it requires review. Criteria and validation remain the designer's responsibility.",
      ],
    },
    nextSteps: {
      number: "09",
      eyebrow: "Next steps",
      items: [
        "Scale the solution to the full customer base.",
        "Monitor retention, tickets, and complaints over the long term after scaling. This monitoring will determine whether the outcome was achieved.",
      ],
    },
  },
};
