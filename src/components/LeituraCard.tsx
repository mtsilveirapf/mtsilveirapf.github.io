import Link from "next/link";
import type { ReactNode } from "react";

// Card usado na seção "Leitura / Visão e Processos" da Home. Extraído em componente pra
// suportar o estado `disabled` de forma reutilizável entre os cards da seção (e em outros
// cards futuros do mesmo formato) — a pedido explícito do usuário, pensando em quando "IA
// Aplicada ao Design" for publicado: basta remover a prop `disabled` (e trocar o `badge` de
// volta pra status="in-progress" ou remover de vez), sem mexer em mais nada.
//
// `badge` fica fora do wrapper de opacidade reduzida — permanece 100% legível mesmo com o
// card desabilitado, só o restante do conteúdo (children) fica mais apagado.
export function LeituraCard({
  href,
  disabled,
  badge,
  children,
}: {
  href?: string;
  disabled?: boolean;
  badge?: ReactNode;
  children: ReactNode;
}) {
  const base = "relative flex flex-col gap-4 rounded p-6";

  if (disabled) {
    return (
      <div
        aria-disabled="true"
        className={`${base} cursor-not-allowed border border-dashed border-border`}
      >
        {badge}
        <div className="flex flex-col gap-4 opacity-60">{children}</div>
      </div>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={`${base} border border-border transition-colors hover:bg-[rgb(13,13,13)]`}
      >
        {badge}
        {children}
      </Link>
    );
  }

  return (
    <div className={`${base} border border-border`}>
      {badge}
      {children}
    </div>
  );
}
