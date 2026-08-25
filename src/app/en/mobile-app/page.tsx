"use client";

import { MobileAppPage } from "@/components/mobile-app/MobileAppPage";

// Versão em inglês de /app-mobile — mesma implementação (MobileAppPage), só o locale muda. Ver
// CaseStudyPage.tsx (gestao-prazos) para o motivo do locale vir fixo por rota em vez de vir do
// LanguageContext.
export default function MobileApp() {
  return <MobileAppPage locale="en-US" />;
}
