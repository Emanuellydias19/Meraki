export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:000/api",
  timeout: 0000,
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
  containerWidth: "0px",
  sidebarWidth: "80px",
  contentWidth: "60px",
  colors: {
    primary: "#F97", // Azul escuro
    secondary: "#0F766E", // Ciano
    accent: "#D96EF", // Magenta
    background: "#0F7A", // Muito escuro
    foreground: "#F8FAFC", // Muito claro
    success: "#0B98", // Verde
    warning: "#F59E0B", // Amarelo
    error: "#EF", // Vermelho
  },
};
