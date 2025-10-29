import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { MerakiContract } from "../../target/idl/meraki_contract";
import { SystemProgram, Keypair, PublicKey } from "@solana/web3.js";
import { assert } from "chai";
import "mocha";

describe(" Meraki Contract — Teste Completo", () => {
  
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  
  const program = anchor.workspace.MerakiContract as Program<MerakiContract>;

  const TIMEOUT = 120_000;
  (global as any).timeout = TIMEOUT;

  it("Inicializa o contrato de investimento corretamente", async () => {
    console.log(" Iniciando teste de inicialização...\n");

    
    const investmentContract = Keypair.generate();
    const startup = Keypair.generate();

    
    const amount = new anchor.BN(1_000_000_000); 
    const investorReturnPercent = 20; 
    const durationDays = new anchor.BN(30); 

    const tx = await program.methods
      .initializeContract(amount, investorReturnPercent, durationDays)
      .accounts({
        investmentContract: investmentContract.publicKey,
        investor: provider.wallet.publicKey,
        startup: startup.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([investmentContract])
      .rpc();

    console.log("Transação enviada com sucesso!");
    console.log(" TX Signature:", tx);

    
    let contractAccount;
    try {
      
      contractAccount =
        (await program.account.investmentContract.fetch(investmentContract.publicKey)) ||
        (await (program.account as any)["investment_contract"].fetch(
          investmentContract.publicKey
        ));
    } catch (err) {
      console.error(" Erro ao buscar conta do contrato:", err);
      throw err;
    }

    
    console.log(" Dados do contrato armazenados on-chain:");
    console.table({
      investor: contractAccount.investor.toBase58(),
      startup: contractAccount.startup.toBase58(),
      amount: contractAccount.amount.toNumber(),
      investorReturnPercent: contractAccount.investorReturnPercent,
      durationDays: contractAccount.durationDays.toNumber(),
      startTime: contractAccount.startTime.toString(),
      isActive: contractAccount.isActive,
      isInvested: contractAccount.isInvested,
    });

    
    assert.ok(contractAccount.isActive, "O contrato não está ativo");
    assert.strictEqual(
      contractAccount.amount.toNumber(),
      amount.toNumber(),
      "O valor do contrato não corresponde ao esperado"
    );
    assert.strictEqual(
      contractAccount.investorReturnPercent,
      investorReturnPercent,
      "O percentual de retorno está incorreto"
    );
    assert.strictEqual(
      contractAccount.durationDays.toNumber(),
      durationDays.toNumber(),
      "A duração em dias está incorreta"
    );

    console.log(" Teste passou com sucesso!");
  });
});
