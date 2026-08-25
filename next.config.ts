import type { NextConfig } from "next";

// GitHub Pages só serve arquivos estáticos — sem servidor Node, sem a API de otimização de
// imagem do Next. `output: "export"` gera HTML/CSS/JS estático em out/ via `next build`.
// `images.unoptimized: true` é obrigatório junto: sem isso, qualquer uso de next/image falha o
// build (a otimização em runtime não existe no export estático). `trailingSlash: true` gera
// rota/index.html em vez de rota.html — evita 404 ao servir subpastas direto do GitHub Pages.
// Site de usuário (matheusdasilveirapf.github.io, na raiz do domínio) — sem basePath/assetPrefix;
// só seria necessário para um "site de projeto" publicado numa subpasta.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
    ],
  },
};

export default nextConfig;
