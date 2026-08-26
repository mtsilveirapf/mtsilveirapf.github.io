import { ArrowUpRight } from "lucide-react";
import { EMAIL, LINKEDIN_URL } from "@/lib/contact";

// Links de e-mail e LinkedIn reutilizados no Header e no Footer (docs/framer-audit.md, seção 8).
// text-xs/gap-3/h-3: só no mobile, a pedido explícito do usuário — fonte reduzida pra caber ao
// lado do logo numa linha só no Header (ver Header.tsx), aplicada aqui pro Footer herdar a
// mesma redução automaticamente (coerência visual entre os dois, mesmo componente
// compartilhado). tablet/desktop mantêm os valores originais (text-base/gap-6/h-4).
export function ContactNav({ className }: { className?: string }) {
  return (
    <nav className={`flex items-center gap-3 tablet:gap-6 ${className ?? ""}`}>
      <a
        href={`mailto:${EMAIL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-xs leading-[1.2] text-white transition-colors hover:text-accent tablet:text-base"
      >
        E-MAIL
        <ArrowUpRight className="h-3 w-3 tablet:h-4 tablet:w-4" strokeWidth={1.5} />
      </a>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-xs leading-[1.2] text-white transition-colors hover:text-accent tablet:text-base"
      >
        LINKEDIN
        <ArrowUpRight className="h-3 w-3 tablet:h-4 tablet:w-4" strokeWidth={1.5} />
      </a>
    </nav>
  );
}
