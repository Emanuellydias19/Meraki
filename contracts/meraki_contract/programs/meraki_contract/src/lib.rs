use anchor_lang::prelude::*; //importa as coisas daquele famework anchor (atalho em solana para código de baixo nível)
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount, Transfer}; //importa o padrão de tokens da solana e precisa disso para realizar todas as transações

declare_id!("CYAznAeDJm4wrRFfbMbv4DQTcJ45co2zGBCLtpRdLoMm"); // id público da solana, tipo o cpf que eu vou usar depois para conectar com o back e o front.
 

#[program]
pub mod meraki_contract { //aqui começa as instruções do contrato e cada uma delas (pub fn), é executada como uma transação na solana.  
use super::*; //essa parte importa tudo do escopo anterior (no caso as dependências que a gente importou ali em cima)

    // 1. Inicializa o contrato de investimento
    pub fn initialize_contract(
        ctx: Context<InitializeContract>, //aqui ele abre a conta e o contrato entre investidor e startup
        amount: u64,//dado fornecido pelo investidor
        investor_return_percent: u8, //dado forncecido pelo investidor
        duration_days: u64, //esse u64 é aquele negócio de "tipo de dado na solana"
    ) -> Result<()> {
        let contract = &mut ctx.accounts.investment_contract; //pega a conta de contrato que estão armazenados on-chain e cria uma referência mutável, pois vamos alterá-la (&mut)
        contract.investor = ctx.accounts.investor.key(); //define a chave pública do investidor
        contract.startup = ctx.accounts.startup.key(); //define a chave pública da startup
        contract.amount = amount; //armazena um parâmetro passado
        contract.investor_return_percent = investor_return_percent; //armazena um parâmetro criado
        contract.duration_days = duration_days; //armazena um parâmetro passado
        contract.start_time = Clock::get()?.unix_timestamp; //acessa o relógio da solana
        contract.is_active = true; //define o contrato como ativo
        contract.total_revenue = 0;
        contract.total_distributed = 0; //esse valor 0 é o inicial, mas ele vai crescendo ao longo do contrato.
        Ok(())
    }

    // 2. Realiza o investimento inicial
    pub fn invest(ctx: Context<Invest>) -> Result<()> { //aqui é quando o investidor manda o dinheiro em tokens
        let total = ctx.accounts.investment_contract.amount;
        let meraki_fee = total / 200; // 0.5%
        let startup_amount = total - meraki_fee;

        token::transfer(ctx.accounts.transfer_to_meraki_ctx(), meraki_fee)?;
        token::transfer(ctx.accounts.transfer_to_contract_vault_ctx(), startup_amount)?;

        ctx.accounts.investment_contract.is_invested = true;
        Ok(()) //realiza as duas transferências e marca que o investimento foi feito
    }

    // 3. Registra receita da startup (modelo trustless)
    pub fn record_revenue(ctx: Context<RecordRevenue>, revenue_amount: u64) -> Result<()> { //função chamada toda a vez que a startup gera receita
        let contract = &mut ctx.accounts.investment_contract; //esse modelo faz com que toda a receita que essa startup receba caia nessa lógica.

        // Atualiza total recebido na conta da startup
        contract.total_revenue += revenue_amount;

        // Cálculo das divisões
        let meraki_fee = revenue_amount / 200; // 0.5%
        let investor_share = (revenue_amount * contract.investor_return_percent as u64) / 100;
        let startup_share = revenue_amount - meraki_fee - investor_share;

        // Transferências automáticas
        token::transfer(ctx.accounts.transfer_to_meraki_ctx(), meraki_fee)?;
        token::transfer(ctx.accounts.transfer_to_investor_ctx(), investor_share)?;
        token::transfer(ctx.accounts.transfer_to_startup_ctx(), startup_share)?;

        contract.total_distributed += investor_share;
        Ok(())
    }

    // 4. Gera NFT comprovante de investimento 
    pub fn mint_investment_nft(ctx: Context<MintNFT>) -> Result<()> { // (mint: cria um NFT)
        let cpi_ctx = CpiContext::new( //cria um contexto CPI
            ctx.accounts.token_program.to_account_info(),
            MintTo { //define quem é o mint (token a ser criado)
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.investor_token_account.to_account_info(), //para quem vai
                authority: ctx.accounts.mint_authority.to_account_info(), //quem tem permissão de criar
            },
        );
        token::mint_to(cpi_ctx, 1)?; //"minta" uma unidade, 1 NFT
        Ok(())
    }
}


// CONTEXTOS DE EXECUÇÃO: dizem quais contas on-chain precisam ser passadas em cada transação

#[derive(Accounts)]
pub struct InitializeContract<'info> {
    #[account(init, payer = investor, space = 8 + InvestmentContract::LEN)] //Esse campo cria uma nova conta na solana e o investidor paga o custo dessa criação em lamports. O restante define o tamanho em bytes.
    pub investment_contract: Account<'info, InvestmentContract>,
    #[account(mut)] //conta mutável duante a transação
    pub investor: Signer<'info>, //inidica que essa conta deve assinar a transação com cua chave privada.
    /// CHECK: conta pública da startup
    pub startup: AccountInfo<'info>, //aqui a startup não precisa assinar, apenas ser identificada
    pub system_program: Program<'info, System>, //programa nativo da solana responsável por criar contas e transferir lamports.
}

#[derive(Accounts)]
pub struct Invest<'info> {
    #[account(mut)]
    pub investment_contract: Account<'info, InvestmentContract>,
    #[account(mut)]
    pub investor: Signer<'info>,
    #[account(mut)]
    pub vault_account: Account<'info, TokenAccount>, // cofre da startup
    #[account(mut)]
    pub meraki_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct RecordRevenue<'info> {
    #[account(mut)]
    pub investment_contract: Account<'info, InvestmentContract>,
    #[account(mut)]
    pub payer: Signer<'info>, // cliente da startup que gera receita
    #[account(mut)]
    pub startup_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub investor_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub meraki_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct MintNFT<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub investor_token_account: Account<'info, TokenAccount>,
    /// CHECK: autoridade de mint
    pub mint_authority: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
}

// Coloque isso **após os structs de Accounts** (Invest e RecordRevenue), antes de qualquer `impl` do programa.

impl<'info> Invest<'info> {
    pub fn transfer_to_meraki_ctx(&self) -> CpiContext<'_, '_, '_, 'info, token::Transfer<'info>> {
        let cpi_accounts = token::Transfer {
            from: self.investor.to_account_info(), // ou a conta de token correta se for diferente
            to: self.meraki_token_account.to_account_info(),
            authority: self.investor.to_account_info(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }

    pub fn transfer_to_contract_vault_ctx(&self) -> CpiContext<'_, '_, '_, 'info, token::Transfer<'info>> {
        let cpi_accounts = token::Transfer {
            from: self.investor.to_account_info(), // ou a conta de token correta
            to: self.vault_account.to_account_info(),
            authority: self.investor.to_account_info(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }
}

impl<'info> RecordRevenue<'info> {
    pub fn transfer_to_meraki_ctx(&self) -> CpiContext<'_, '_, '_, 'info, token::Transfer<'info>> {
        let cpi_accounts = token::Transfer {
            from: self.payer.to_account_info(), // ou a conta de token correta
            to: self.meraki_token_account.to_account_info(),
            authority: self.payer.to_account_info(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }

    pub fn transfer_to_investor_ctx(&self) -> CpiContext<'_, '_, '_, 'info, token::Transfer<'info>> {
        let cpi_accounts = token::Transfer {
            from: self.payer.to_account_info(), // ou a conta de token correta
            to: self.investor_token_account.to_account_info(),
            authority: self.payer.to_account_info(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }

    pub fn transfer_to_startup_ctx(&self) -> CpiContext<'_, '_, '_, 'info, token::Transfer<'info>> {
        let cpi_accounts = token::Transfer {
            from: self.payer.to_account_info(), // ou a conta de token correta
            to: self.startup_token_account.to_account_info(),
            authority: self.payer.to_account_info(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }
}


// ESTRUTURA DE DADOS

#[account]
pub struct InvestmentContract {
    pub investor: Pubkey,
    pub startup: Pubkey,
    pub amount: u64,
    pub investor_return_percent: u8,
    pub duration_days: u64,
    pub start_time: i64,
    pub total_revenue: u64,
    pub total_distributed: u64,
    pub is_active: bool,
    pub is_invested: bool,
}

impl InvestmentContract {
    const LEN: usize = 32 + 32 + 8 + 1 + 8 + 8 + 8 + 8 + 1 + 1;
}
