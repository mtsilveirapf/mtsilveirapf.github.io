"use client";

import { DataDrivenPage } from "@/components/data-driven/DataDrivenPage";

// Versão em inglês de /data-driven — mesma implementação (DataDrivenPage), só o locale muda.
// Mesmo padrão de /en/deadline-control (ver CaseStudyPage.tsx).
export default function DataDrivenEn() {
  return <DataDrivenPage locale="en-US" />;
}
