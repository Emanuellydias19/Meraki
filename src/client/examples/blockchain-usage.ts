// Exemplos de uso das funções de integração Solana
// Salve este arquivo como: src/client/examples/blockchain-usage.ts

import { contractFunctions, getConnection, getProgramId } from '../app/lib/utils/solana';
import type { WalletContextState } from '@solana/wallet-adapter-react';

/**
 * EXEMPLO : Inicializar um Contrato de Investimento
 * 
 * Este exemplo mostra como criar um novo contrato de investimento
 * entre um investidor e uma startup.
 * 
 * @param wallet - O objeto wallet obtido do hook useWallet() em um componente React
 */
export async function exemploInicializarContrato(wallet: WalletContextState) {
  // . Verificar se wallet está conectada
  if (!wallet || !wallet.publicKey) {
    console.error('Wallet não conectada!');
    return;
  }

  try {
    // . Parâmetros do contrato
    const amount = 000000000; //  SOL em lamports ( SOL = ,000,000,000 lamports)
    const investorReturnPercent = 0; // 0% de retorno para o investidor
    const durationDays = 65; // Duração de  ano
    const startupPublicKey = 'STARTUP_WALLET_ADDRESS_AQUI'; // Substituir pelo endereço real

    // . Inicializar contrato na blockchain
    const result = await contractFunctions.initializeContract(
      wallet,
      amount,
      investorReturnPercent,
      durationDays,
      startupPublicKey
    );

    console.log('✅ Contrato criado com sucesso!');
    console.log('Endereço do contrato:', result.contractAddress);
    console.log('Transaction signature:', result.signature);

    // . (Opcional) Salvar no banco de dados via API
    // await investmentApi.create({
    //   contract_address: result.contractAddress,
    //   blockchain_tx_hash: result.signature,
    //   amount: amount.toString(),
    //   ...
    // });

    return result;

  } catch (error) {
    console.error('Erro ao inicializar contrato:', error);
    throw error;
  }
}

/**
 * EXEMPLO : Realizar Investimento
 * 
 * Transfere os tokens do investidor para o vault do contrato.
 * 
 * @param wallet - O objeto wallet obtido do hook useWallet()
 */
export async function exemploInvestir(wallet: WalletContextState) {
  if (!wallet || !wallet.publicKey) {
    console.error('Wallet não conectada!');
    return;
  }

  try {
    const contractAddress = 'CONTRACT_ADDRESS_AQUI'; // Endereço do contrato criado

    // Executar investimento
    const signature = await contractFunctions.invest(wallet, contractAddress);

    console.log('✅ Investimento realizado!');
    console.log('Transaction signature:', signature);

    return signature;

  } catch (error) {
    console.error('Erro ao investir:', error);
    throw error;
  }
}

/**
 * EXEMPLO : Registrar Receita da Startup
 * 
 * A startup registra receita que será distribuída automaticamente
 * entre investidor, startup e plataforma Meraki.
 * 
 * @param wallet - O objeto wallet obtido do hook useWallet()
 */
export async function exemploRegistrarReceita(wallet: WalletContextState) {
  if (!wallet || !wallet.publicKey) {
    console.error('Wallet não conectada!');
    return;
  }

  try {
    const contractAddress = 'CONTRACT_ADDRESS_AQUI';
    const revenueAmount = 500000000; // 0.5 SOL em lamports

    // Registrar receita
    const signature = await contractFunctions.recordRevenue(
      wallet,
      contractAddress,
      revenueAmount
    );

    console.log('✅ Receita registrada!');
    console.log('Transaction signature:', signature);

    // A distribuição automática:
    // - 0.5% para Meraki (taxa da plataforma)
    // - 0% para o investidor (conforme % do contrato)
    // - Restante para a startup

    return signature;

  } catch (error) {
    console.error('Erro ao registrar receita:', error);
    throw error;
  }
}

/**
 * EXEMPLO : Mintar NFT de Investimento
 * 
 * Cria um NFT representando o investimento realizado.
 * 
 * @param wallet - O objeto wallet obtido do hook useWallet()
 */
export async function exemploMintarNFT(wallet: WalletContextState) {
  if (!wallet || !wallet.publicKey) {
    console.error('Wallet não conectada!');
    return;
  }

  try {
    const mintAddress = 'NFT_MINT_ADDRESS_AQUI';

    // Mintar NFT
    const signature = await contractFunctions.mintInvestmentNft(
      wallet,
      mintAddress
    );

    console.log('✅ NFT mintado!');
    console.log('Transaction signature:', signature);

    return signature;

  } catch (error) {
    console.error('Erro ao mintar NFT:', error);
    throw error;
  }
}

/**
 * EXEMPLO 5: Buscar Dados de um Contrato
 * 
 * Lê os dados on-chain de um contrato existente.
 * 
 * @param wallet - O objeto wallet obtido do hook useWallet()
 */
export async function exemploBuscarContrato(wallet: WalletContextState) {
  if (!wallet || !wallet.publicKey) {
    console.error('Wallet não conectada!');
    return;
  }

  try {
    const contractAddress = 'CONTRACT_ADDRESS_AQUI';

    // Buscar dados do contrato
    const contractData = await contractFunctions.getContract(
      wallet,
      contractAddress
    );

    console.log('📊 Dados do Contrato:');
    console.log('Investidor:', contractData.investor.toString());
    console.log('Startup:', contractData.startup.toString());
    console.log('Valor:', contractData.amount, 'lamports');
    console.log('% Retorno Investidor:', contractData.investorReturnPercent + '%');
    console.log('Duração:', contractData.durationDays, 'dias');
    console.log('Ativo:', contractData.isActive);
    console.log('Investido:', contractData.isInvested);
    console.log('Receita Total:', contractData.totalRevenue, 'lamports');
    console.log('Total Distribuído:', contractData.totalDistributed, 'lamports');

    return contractData;

  } catch (error) {
    console.error('Erro ao buscar contrato:', error);
    throw error;
  }
}

/**
 * EXEMPLO 6: Verificar Conexão com Solana
 * 
 * Testa a conexão com a RPC e verifica o Program ID.
 */
export async function exemploVerificarConexao() {
  try {
    const connection = getConnection();
    const programId = getProgramId();

    console.log('🌐 Verificando conexão com Solana...');
    console.log('RPC Endpoint:', connection.rpcEndpoint);
    console.log('Program ID:', programId.toString());

    // Testar conexão
    const version = await connection.getVersion();
    console.log('✅ Conectado! Versão Solana:', version);

  } catch (error) {
    console.error('❌ Erro de conexão:', error);
    throw error;
  }
}

/**
 * EXEMPLO 7: Verificar Saldo da Wallet
 * 
 * @param wallet - O objeto wallet obtido do hook useWallet()
 */
export async function exemploVerificarSaldo(wallet: WalletContextState) {
  if (!wallet || !wallet.publicKey) {
    console.error('Wallet não conectada!');
    return;
  }

  try {
    const connection = getConnection();
    const balance = await connection.getBalance(wallet.publicKey);
    
    console.log('💰 Saldo da wallet:', balance / 000000000, 'SOL');
    return balance;

  } catch (error) {
    console.error('Erro ao verificar saldo:', error);
    throw error;
  }
}

/**
 * EXEMPLO 8: Fluxo Completo - Criar Startup e Investir
 * 
 * @param wallet - O objeto wallet obtido do hook useWallet()
 */
export async function exemploFluxoCompleto(wallet: WalletContextState) {
  if (!wallet || !wallet.publicKey) {
    console.error('Wallet não conectada!');
    return;
  }

  try {
    // . Criar startup na API
    console.log('️⃣ Criando startup...');
    // const startup = await startupApi.create({
    //   name: 'Minha Startup',
    //   description: 'Startup inovadora',
    //   wallet_address: wallet.publicKey.toString(),
    //   funding_goal: 000000000,
    // });

    // . Criar contrato de investimento
    console.log('️⃣ Criando contrato de investimento...');
    const contractResult = await exemploInicializarContrato(wallet);

    if (!contractResult) {
      throw new Error('Falha ao criar contrato');
    }

    // . Realizar investimento
    console.log('️⃣ Realizando investimento...');
    await exemploInvestir(wallet);

    // . Mintar NFT
    console.log('️⃣ Mintando NFT...');
    await exemploMintarNFT(wallet);

    console.log('✅ Fluxo completo concluído!');

  } catch (error) {
    console.error('❌ Erro no fluxo:', error);
    throw error;
  }
}

/**
 * COMO USAR EM UM COMPONENTE REACT:
 * 
 * import { useWallet } from '@solana/wallet-adapter-react';
 * import { exemploInicializarContrato } from './examples/blockchain-usage';
 * 
 * function MeuComponente() {
 *   const wallet = useWallet();
 * 
 *   const handleInvestir = async () => {
 *     await exemploInicializarContrato(wallet);
 *   };
 * 
 *   return <button onClick={handleInvestir}>Investir</button>;
 * }
 */
