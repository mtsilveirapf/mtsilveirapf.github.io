// Placeholder do ícone "Yinyang Balance" (Basicons) usado como marca no Header/Footer.
// PENDÊNCIA (docs/framer-audit.md, seção 13): o MCP do Framer não expõe o SVG original dos
// ícones dos icon sets do projeto. Este é um substituto visual aproximado — trocar pelo
// asset original assim que disponível.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3a4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0 9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
