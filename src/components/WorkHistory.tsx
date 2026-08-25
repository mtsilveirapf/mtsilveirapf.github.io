"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Componente "Work History" (local no Framer, id FBmVkar3w — docs/framer-audit.md, seção 3).
// Variante "Closed" confirmada via screenshot de referência do Framer: mostra só a
// experiência mais recente (Zenvia) num card, com um botão "Mostrar todos" abaixo que
// revela as demais (variante "Open", layout exato não auditado — reconstrução razoável).
// Conteúdo (empresas/labels) vem via props para suportar i18n.
type Experience = { company: string; role: string; period: string };

function ExperienceRow({ company, role, period }: Experience) {
  return (
    <div className="flex items-center justify-between rounded border border-border bg-black p-[18px]">
      <div className="flex flex-col gap-0.5">
        <span className="text-base leading-[1.2] text-white">{company}</span>
        <span className="text-sm leading-[1.4] text-text-50">{role}</span>
      </div>
      <span className="font-secondary-home text-sm text-dark-gray">{period}</span>
    </div>
  );
}

export function WorkHistory({
  experiences,
  showAllLabel,
  showLessLabel,
}: {
  experiences: Experience[];
  showAllLabel: string;
  showLessLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [current, ...rest] = experiences;

  return (
    <div className="flex w-full flex-col gap-3">
      <ExperienceRow {...current} />
      {open &&
        rest.map((exp) => <ExperienceRow key={exp.company} {...exp} />)}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center gap-2 rounded-lg border border-border py-2 text-sm text-text-50 transition-colors hover:text-white"
        aria-expanded={open}
      >
        {open ? showLessLabel : showAllLabel}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
