import type { Metadata } from "next";
import { Inter, Figtree, JetBrains_Mono, Onest } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";

// NOTA (pendência da auditoria Framer): o projeto original usa também "Inter Display" e
// "Switzer", que não estão disponíveis via next/font/google. Até obtermos os arquivos de
// fonte originais, ambos usam Inter como fallback (ver docs/framer-audit.md, seção 13).
const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree-var",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono-var",
  subsets: ["latin"],
});

// Fonte secundária exclusiva da Home (eyebrows técnicos/credenciais/métricas), escolhida pelo
// usuário para suavizar o caráter da fonte mono anterior — ver --font-secondary-home em
// globals.css. Não deve ser usada em gestao-prazos nem em nenhuma outra rota.
const onest = Onest({
  variable: "--font-onest-var",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matheus Francisco — Senior Product Designer & Data Analyst Associate",
  description:
    "Portfólio de Matheus Francisco, Senior Product Designer e Data Analyst Associate.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${figtree.variable} ${jetbrainsMono.variable} ${onest.variable}`}
    >
      <body className="flex min-h-full flex-col bg-black font-inter text-white antialiased">
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
