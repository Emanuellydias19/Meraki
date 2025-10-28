export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 30000,
};

export const BLOCKCHAIN_CONFIG = {
  network: process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet",
  rpcEndpoint:
    process.env.NEXT_PUBLIC_RPC_ENDPOINT || "https://api.devnet.solana.com",
  programId: process.env.NEXT_PUBLIC_PROGRAM_ID || "",
};

export const APP_CONFIG = {
  name: "NodeHub",
  description: "Plataforma de investimentos descentralizados",
};

// Design System - Desktop
export const DESKTOP_CONFIG = {
  containerWidth: "1440px",
  sidebarWidth: "280px",
  contentWidth: "1160px",
  colors: {
    primary: "#1F2937", // Azul escuro
    secondary: "#0F766E", // Ciano
    accent: "#D946EF", // Magenta
    background: "#0F172A", // Muito escuro
    foreground: "#F8FAFC", // Muito claro
    success: "#10B981", // Verde
    warning: "#F59E0B", // Amarelo
    error: "#EF4444", // Vermelho
  },
};
