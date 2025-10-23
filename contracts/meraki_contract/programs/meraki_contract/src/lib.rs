use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount, Transfer};

declare_id!("GyCiLswm3XZTHKMSpj1nzFEEit8qp5kAWX7bszHd2pBE");

#[program]
pub mod meraki_contract {
    use super::*;

    // 1. Inicializa o contrato de investimento
    pub fn initialize_contract(
        ctx: Context<InitializeContract>,
        amount: u64,
        investor_return_percent: u8,
        duration_days: u64,
    ) -> Result<()> {
        let contract = &mut ctx.accounts.investment_contract;
        contract.investor = ctx.accounts.investor.key();
        contract.startup = ctx.accounts.startup.key();
        contract.amount = amount;
        contract.investor_return_percent = investor_return_percent;
        contract.duration_days = duration_days;
        contract.start_time = Clock::get()?.unix_timestamp;
        contract.is_active = true;
        contract.total_revenue = 0;
        contract.total_distributed = 0;
        Ok(())
    }

    // 2. Realiza o investimento inicial
    pub fn invest(ctx: Context<Invest>) -> Result<()> {
        let total = ctx.accounts.investment_contract.amount;
        let meraki_fee = total / 200; // 0.5%
        let startup_amount = total - meraki_fee;

        token::transfer(ctx.accounts.transfer_to_meraki_ctx(), meraki_fee)?;
        token::transfer(ctx.accounts.transfer_to_contract_vault_ctx(), startup_amount)?;

        ctx.accounts.investment_contract.is_invested = true;
        Ok(())
    }

    // 3. Registra receita da startup (modelo trustless)
    pub fn record_revenue(ctx: Context<RecordRevenue>, revenue_amount: u64) -> Result<()> {
        let contract = &mut ctx.accounts.investment_contract;

        // Atualiza total recebido
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
    pub fn mint_investment_nft(ctx: Context<MintNFT>) -> Result<()> {
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.investor_token_account.to_account_info(),
                authority: ctx.accounts.mint_authority.to_account_info(),
            },
        );
        token::mint_to(cpi_ctx, 1)?;
        Ok(())
    }
}

// ==========================
// CONTEXTOS DE EXECUÇÃO
// ==========================

#[derive(Accounts)]
pub struct InitializeContract<'info> {
    #[account(init, payer = investor, space = 8 + InvestmentContract::LEN)]
    pub investment_contract: Account<'info, InvestmentContract>,
    #[account(mut)]
    pub investor: Signer<'info>,
    /// CHECK: conta pública da startup
    pub startup: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
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

// ==========================
// ESTRUTURA DE DADOS
// ==========================

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
