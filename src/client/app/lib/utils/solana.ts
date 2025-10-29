import { Connection, PublicKey, clusterApiUrl } from "@solana/web.js";
import { AnchorProvider, Program, Idl, BN } from "@coral-xyz/anchor";
import * as web from "@solana/web.js";
import { BLOCKCHAIN_CONFIG } from "../config/api";
import idl from "../idl/meraki_contract.json";

/**
 * Obtém a conexão com a rede Solana
 */
export function getConnection(): Connection {
  return new Connection(
    BLOCKCHAIN_CONFIG.rpcEndpoint,
    "confirmed"
  );
}

/**
 * Obtém o Program ID do contrato
 */
export function getProgramId(): PublicKey {
  if (!BLOCKCHAIN_CONFIG.programId) {
    throw new Error("NEXT_PUBLIC_PROGRAM_ID não configurado");
  }
  return new PublicKey(BLOCKCHAIN_CONFIG.programId);
}

/**
 * Cria um provider do Anchor com a wallet do usuário
 */
export function getProvider(wallet: any): AnchorProvider {
  const connection = getConnection();
  
  return new AnchorProvider(
    connection,
    wallet,
    { commitment: "confirmed" }
  );
}

/**
 * Obtém a instância do programa Anchor
 */
export function getProgram(wallet: any): Program {
  const provider = getProvider(wallet);
  const programId = getProgramId();
  
  return new Program(idl as any, provider);
}

/**
 * Tipos do contrato
 */
export interface InvestmentContract {
  investor: PublicKey;
  startup: PublicKey;
  amount: number;
  investorReturnPercent: number;
  durationDays: number;
  startTime: number;
  isActive: boolean;
  totalRevenue: number;
  totalDistributed: number;
  isInvested: boolean;
}

/**
 * Funções para interagir com o contrato
 */
export const contractFunctions = {
  /**
   * Inicializa um novo contrato de investimento
   */
  async initializeContract(
    wallet: any,
    amount: number,
    investorReturnPercent: number,
    durationDays: number,
    startupPublicKey: string
  ) {
    const program = getProgram(wallet);
    const startup = new PublicKey(startupPublicKey);
    
    // Gerar uma nova keypair para o contrato
    const contractKeypair = web.Keypair.generate();
    
    const tx = await program.methods
      .initializeContract(
        new BN(amount),
        investorReturnPercent,
        new BN(durationDays)
      )
      .accounts({
        investmentContract: contractKeypair.publicKey,
        investor: wallet.publicKey,
        startup: startup,
        systemProgram: web.SystemProgram.programId,
      })
      .signers([contractKeypair])
      .rpc();
    
    return {
      signature: tx,
      contractAddress: contractKeypair.publicKey.toString(),
    };
  },

  /**
   * Realiza o investimento (transfere tokens)
   */
  async invest(wallet: any, contractAddress: string) {
    const program = getProgram(wallet);
    const contract = new PublicKey(contractAddress);
    
    // TODO: Adicionar lógica para obter token accounts
    const tx = await program.methods
      .invest()
      .accounts({
        investmentContract: contract,
        investor: wallet.publicKey,
        // investorTokenAccount, contractVault, merakiVault, tokenProgram
      })
      .rpc();
    
    return tx;
  },

  /**
   * Registra receita da startup
   */
  async recordRevenue(
    wallet: any,
    contractAddress: string,
    revenueAmount: number
  ) {
    const program = getProgram(wallet);
    const contract = new PublicKey(contractAddress);
    
    const tx = await program.methods
      .recordRevenue(new BN(revenueAmount))
      .accounts({
        investmentContract: contract,
        startup: wallet.publicKey,
        // contractVault, investorTokenAccount, startupTokenAccount, merakiVault, tokenProgram
      })
      .rpc();
    
    return tx;
  },

  /**
   * Minta NFT de investimento
   */
  async mintInvestmentNft(wallet: any, mintAddress: string) {
    const program = getProgram(wallet);
    const mint = new PublicKey(mintAddress);
    
    const tx = await program.methods
      .mintInvestmentNft()
      .accounts({
        mint: mint,
        // investorTokenAccount, mintAuthority, tokenProgram
      })
      .rpc();
    
    return tx;
  },

  /**
   * Busca dados de um contrato
   */
  async getContract(
    wallet: any,
    contractAddress: string
  ): Promise<InvestmentContract> {
    const program = getProgram(wallet);
    const contract = new PublicKey(contractAddress);
    
    const contractData = await (program.account as any).investmentContract.fetch(
      contract
    );
    
    return contractData as unknown as InvestmentContract;
  },
};

// Re-exportar tipos úteis
export { Connection, PublicKey } from "@solana/web.js";
export { BN } from "@coral-xyz/anchor";
export { web };
