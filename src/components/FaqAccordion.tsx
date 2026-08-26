"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { PROSE_WIDTH } from "@/lib/layout";

export type FaqItem = {
  question: string;
  answer: string;
  linkHref?: string;
  linkLabel?: string;
};

// Accordion de FAQ para a seção "Por que eu?" — layout adaptado de uma referência externa
// (light mode) para o tema dark do site, a pedido explícito do usuário. Múltiplos itens podem
// ficar abertos ao mesmo tempo. Transição de altura via grid-template-rows (0fr -> 1fr) evita
// o salto abrupto de "height: auto".
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = openItems.has(i);
        const buttonId = `faq-button-${i}`;
        const panelId = `faq-panel-${i}`;

        return (
          <div
            key={item.question}
            className="border-b border-[rgb(28,28,28)] last:border-b-0"
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
            >
              <span
                className={`${PROSE_WIDTH} text-base leading-[1.5] font-medium tracking-[-0.5px] text-white`}
              >
                {i + 1}. {item.question}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-border text-accent">
                {isOpen ? (
                  <Minus className="h-4 w-4" strokeWidth={1.5} />
                ) : (
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                )}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-200 ease-in-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className={`${PROSE_WIDTH} pb-6 text-base leading-[1.5]`}>
                  {item.answer}
                  {item.linkHref && item.linkLabel && (
                    <>
                      {" "}
                      <Link
                        href={item.linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {item.linkLabel}
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
