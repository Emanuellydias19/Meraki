import { apiCall } from "./client";
import { Investment, CreateInvestmentInput, InvestmentStats } from "../types";

export const investmentApi = {
  async getByInvestor(walletAddress: string): Promise<Investment[]> {
    return apiCall<Investment[]>(`/investments?investor=${walletAddress}`);
  },

  async getByStartup(startupId: string): Promise<Investment[]> {
    return apiCall<Investment[]>(`/investments?startup=${startupId}`);
  },

  async getStats(walletAddress: string): Promise<InvestmentStats> {
    return apiCall<InvestmentStats>(`/investments/stats/${walletAddress}`);
  },

  async create(input: CreateInvestmentInput): Promise<Investment> {
    return apiCall<Investment>("/investments", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
};
