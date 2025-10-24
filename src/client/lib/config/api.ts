// src/client/lib/config/api.ts

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
