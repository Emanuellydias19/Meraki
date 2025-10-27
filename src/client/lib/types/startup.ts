export interface Startup {
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;
    owner: string;
    targetAmount: number;
    raisedAmount: number;
    status: 'active' | 'completed' | 'failed' | 'paused';
    createdAt: string;
    deadline: string;
    website?: string;
    twitter?: string;
    discord?: string;
    milestones: Milestone[];
    investorCount: number;
}

export interface CreateStartupInput {
  name: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  targetAmount: number;
  deadline: string;
  website?: string;
  twitter?: string;
  discord?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  status: "pending" | "achieved" | "failed";
  achievedAt?: string;
  nftEvolutionLevel: number; // Qual nível do NFT desbloqueia
}

