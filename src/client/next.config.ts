import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Esta é a configuração que você deve adicionar para permitir domínios externos
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // Substitua pelo SEU domínio real
        port: '', 
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.anothersite.com', // Adicione outros domínios, se necessário
      },
    ],
  },
  
  /* outras opções de configuração aqui */
};

export default nextConfig;
