const anchor = require("@coral-xyz/anchor");

describe("meraki_contract", () => {
  // Configura provider da devnet/localnet
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.MerakiContract;

  it("Inicializa um novo contrato de investimento", async () => {
    // Gera uma nova conta para o contrato de investimento
    const investmentContract = anchor.web3.Keypair.generate();

    // Cria uma conta pública fake para a startup
    const startup = anchor.web3.Keypair.generate();

    // Parâmetros
    const amount = new anchor.BN(1_000_000_000); // 1 SOL (em lamports)
    const investorReturnPercent = 20; // 20%
    const durationDays = new anchor.BN(30); // 30 dias

    // Chama o método do contrato
    const tx = await program.methods
      .initializeContract(amount, investorReturnPercent, durationDays)
      .accounts({
        investmentContract: investmentContract.publicKey,
        investor: provider.wallet.publicKey,
        startup: startup.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([investmentContract]) // precisa assinar pq é uma conta nova
      .rpc();

    console.log("Contrato inicializado com sucesso!");
    console.log("Transaction signature:", tx);
  });
});
