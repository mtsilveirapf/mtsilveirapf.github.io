"use client";

import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";

// Versão em inglês de /gestao-prazos — mesma implementação (CaseStudyPage), só o locale muda.
// Ver CaseStudyPage.tsx para o motivo do locale vir fixo por rota em vez de vir do
// LanguageContext.
export default function DeadlineControl() {
  return <CaseStudyPage locale="en-US" />;
}
