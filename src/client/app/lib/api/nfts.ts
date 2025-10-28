import { apiCall } from "./client";
import { NFT } from "../types";

export const nftApi = {
  async getByOwner(walletAddress: string): Promise<NFT[]> {
    return apiCall<NFT[]>(`/nfts?owner=${walletAddress}`);
  },

  async getByTokenId(tokenId: string): Promise<NFT> {
    return apiCall<NFT>(`/nfts/${tokenId}`);
  },

  async getByInvestment(investmentId: string): Promise<NFT> {
    return apiCall<NFT>(`/nfts?investment=${investmentId}`);
  },
};
