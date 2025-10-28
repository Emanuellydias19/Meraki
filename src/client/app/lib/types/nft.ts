export interface NFT {
  id: string;
  tokenId: string; // ID do NFT na blockchain
  investmentId: string;
  investorWallet: string;
  startupId: string;
  currentLevel: number; // 1-5 (evolui com marcos)
  maxLevel: number;
  metadata: NFTMetadata;
  createdAt: string;
  lastUpdatedAt: string;
  contractAddress: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string; // URL da imagem (muda com evolução)
  attributes: {
    level: number;
    startup: string;
    investmentAmount: number;
    rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  };
}

export interface NFTEvolution {
  level: number;
  imageUrl: string;
  unlockedAt?: string;
  milestone?: string;
}
