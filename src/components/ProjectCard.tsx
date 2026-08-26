import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { StatBlock } from "./StatBlock";
import { StatusBadge } from "./StatusBadge";

// Card de projeto da seção "Destaques" da Homepage (docs/framer-audit.md, seção 2.1).
// Redesign a pedido explícito do usuário: um único layout para todo card da seção (finalizado
// ou "Em obra") — sem tratamento especial pro card em destaque, todos vivem na mesma grade e
// seguem a mesma estrutura interna (imagem no topo, título, descrição, métricas), com padding
// interno uniforme (p-6) em vez de a imagem sangrar até a borda do card. `h-full` no container
// pra esticar até a altura da linha da grade (`items-stretch`, padrão do CSS Grid) quando um
// card vizinho tem mais texto — mantém os cards de uma mesma linha com altura consistente sem
// precisar calcular nada manualmente.
type ProjectCardProps = {
  href?: string;
  image?: { src: string; alt: string };
  title: string;
  description?: string;
  stats: { value: string; label: string }[];
  className?: string;
  showStatusBadge?: boolean;
};

export function ProjectCard({
  href,
  image,
  title,
  description,
  stats,
  className,
  showStatusBadge,
}: ProjectCardProps) {
  const imageSlot = image ? (
    <Image src={image.src} alt={image.alt} fill className="object-cover object-top" />
  ) : (
    <div className="flex h-full w-full items-center justify-center border border-dashed border-border text-text-50">
      <ImageIcon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
    </div>
  );

  const body = (
    <div className="relative flex flex-1 flex-col">
      {/* Badge fora do bloco de opacidade reduzida abaixo — fica sempre 100% legível, ancorada
          no canto do card inteiro (a imagem não toca nenhuma borda do card, então não há um
          "canto da imagem" separado do canto do card). */}
      {showStatusBadge && <StatusBadge status="in-progress" />}
      <div className={`flex flex-1 flex-col ${showStatusBadge ? "opacity-75" : ""}`}>
        <div className="flex flex-col gap-6 p-6">
          <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded">
            {imageSlot}
          </div>
          <h3 className="text-[20px] leading-[1.4] font-medium tracking-[-0.02em] text-white">
            {title}
          </h3>
          {description && (
            <p className="text-base leading-[1.4]">{description}</p>
          )}
        </div>
        {/* Footer com background próprio (rgb(13,13,13), mesmo tom já usado no hover do card
            inteiro — no hover, o card "vira" essa cor, o footer só chega lá primeiro), colado
            na base do card via mt-auto: quando um card vizinho na mesma linha da grade é mais
            alto (h-full + CSS Grid stretch), o footer acompanha a base, não fica flutuando no
            meio do espaço extra. */}
        <div className="mt-auto flex flex-wrap gap-8 border-t border-border bg-[rgb(13,13,13)] px-6 py-4">
          {stats.map((stat) => (
            <StatBlock key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </div>
  );

  const sharedClassName = `group relative flex h-full flex-col overflow-hidden rounded border border-border ${className ?? ""}`;

  if (href) {
    return (
      <Link
        href={href}
        className={`${sharedClassName} transition-colors hover:bg-[rgb(13,13,13)]`}
      >
        {body}
      </Link>
    );
  }

  return <div className={sharedClassName}>{body}</div>;
}
