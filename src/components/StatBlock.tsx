// Bloco de estatística usado nos cards de projeto da Homepage (docs/framer-audit.md, seção 2.1):
// rótulo em Inter 300/16px cor rgb(128,125,125) em cima, número embaixo. Número usa
// --font-secondary-home (Onest, exclusivo da Home) — era JetBrains Mono.
export function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-base font-light text-[rgb(128,125,125)]">
        {label}
      </span>
      <span className="font-secondary-home text-base font-semibold text-white">
        {value}
      </span>
    </div>
  );
}
