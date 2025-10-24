export interface Investment {
  id: string;
  startupId: string;
  investorWallet: string;
  amount: number; // Em SOL
  txHash: string;
  nftTokenId: string; // ID do NFT recebido
  createdAt: string;
  status: "pending" | "completed" | "failed";
}

export interface CreateInvestmentInput {
  startupId: string;
  amount: number;
}

export interface InvestmentStats {
  totalInvested: number;
  totalStartups: number;
  averageInvestment: number;
  totalNFTs: number;
}
