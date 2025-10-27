use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount, Transfer};

// 🧩 ID PÚBLICO DO PROGRAMA
// ⚠️ Este ID PRECISA ser o mesmo que está no Anchor.toml e no deploy local.
// Confirme com `anchor keys list` e substitua aqui.
declare_id!("51jdU5SpLxidhessiSTiAe3uATxh7sSHn1WKvvVVDK74");

#[program]
pub mod meraki_contract {
    use super::*;

    // -------------------------------------------------
    // 1️⃣ Inicializa o contrato de investimento
    // -------------------------------------------------
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
        contract.is_invested = false;

        Ok(())
    }

    // -------------------------------------------------
    // 2️⃣ Investir — transfere tokens do investidor para o cofre e taxa Meraki
    // -------------------------------------------------
    pub fn invest(ctx: Context<Invest>) -> Result<()> {
        let total = ctx.accounts.investment_contract.amount;
        let meraki_fee = total / 200; // 0.5%
        let startup_amount = total - meraki_fee;

        token::transfer(ctx.accounts.transfer_to_meraki_ctx(), meraki_fee)?;
        token::transfer(ctx.accounts.transfer_to_contract_vault_ctx(), startup_amount)?;

        ctx.accounts.investment_contract.is_invested = true;
        Ok(())
    }

    // -------------------------------------------------
    // 3️⃣ Registrar receita — distribui lucros entre partes
    // -------------------------------------------------
    pub fn record_revenue(ctx: Context<RecordRevenue>, revenue_amount: u64) -> Result<()> {
        let meraki_fee = revenue_amount / 200;
        let investor_share = (revenue_amount
            * ctx.accounts.investment_contract.investor_return_percent as u64)
            / 100;
        let startup_share = revenue_amount - meraki_fee - investor_share;

        token::transfer(ctx.accounts.transfer_to_meraki_ctx(), meraki_fee)?;
        token::transfer(ctx.accounts.transfer_to_investor_ctx(), investor_share)?;
        token::transfer(ctx.accounts.transfer_to_startup_ctx(), startup_share)?;

        let contract = &mut ctx.accounts.investment_contract;
        contract.total_revenue += revenue_amount;
        contract.total_distributed += investor_share;

        Ok(())
    }

    // -------------------------------------------------
    // 4️⃣ Mintar NFT do investimento (representa participação)
    // -------------------------------------------------
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

// ======================================================
// 🔹 CONTEXTOS DE EXECUÇÃO (accounts usados em cada fn)
// ======================================================

#[derive(Accounts)]
pub struct InitializeContract<'info> {
    #[account(init, payer = investor, space = 8 + InvestmentContract::LEN)]
    pub investment_contract: Account<'info, InvestmentContract>,
    #[account(mut)]
    pub investor: Signer<'info>,
    /// CHECK: startup não precisa assinar (somente referenciada)
    pub startup: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Invest<'info> {
    #[account(mut)]
    pub investment_contract: Account<'info, InvestmentContract>,
    #[account(mut)]
    pub investor: Signer<'info>,
    /// CHECK: vault (conta do contrato)
    #[account(mut)]
    pub vault_account: AccountInfo<'info>,
    /// CHECK: conta da Meraki
    #[account(mut)]
    pub meraki_token_account: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct RecordRevenue<'info> {
    #[account(mut)]
    pub investment_contract: Account<'info, InvestmentContract>,
    #[account(mut)]
    pub payer: Signer<'info>,
    /// CHECK: contas genéricas para simulação local
    #[account(mut)]
    pub startup_token_account: AccountInfo<'info>,
    #[account(mut)]
    pub investor_token_account: AccountInfo<'info>,
    #[account(mut)]
    pub meraki_token_account: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct MintNFT<'info> {
    #[account(mut)]
    pub mint: AccountInfo<'info>,
    #[account(mut)]
    pub investor_token_account: AccountInfo<'info>,
    /// CHECK: mint authority genérica
    pub mint_authority: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
}

// ======================================================
// 🔹 HELPERS — funções CPI de transferência (SPL Token)
// ======================================================

impl<'info> Invest<'info> {
    pub fn transfer_to_meraki_ctx(&self) -> CpiContext<'_, '_, '_, 'info, token::Transfer<'info>> {
        let cpi_accounts = token::Transfer {
            from: self.investor.to_account_info(),
            to: self.meraki_token_account.to_account_info(),
            authority: self.investor.to_account_info(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }

    pub fn transfer_to_contract_vault_ctx(
        &self,
    ) -> CpiContext<'_, '_, '_, 'info, token::Transfer<'info>> {
        let cpi_accounts = token::Transfer {
            from: self.investor.to_account_info(),
            to: self.vault_account.to_account_info(),
            authority: self.investor.to_account_info(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }
}

impl<'info> RecordRevenue<'info> {
    pub fn transfer_to_meraki_ctx(&self) -> CpiContext<'_, '_, '_, 'info, token::Transfer<'info>> {
        let cpi_accounts = token::Transfer {
            from: self.payer.to_account_info(),
            to: self.meraki_token_account.to_account_info(),
            authority: self.payer.to_account_info(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }

    pub fn transfer_to_investor_ctx(&self) -> CpiContext<'_, '_, '_, 'info, token::Transfer<'info>> {
        let cpi_accounts = token::Transfer {
            from: self.payer.to_account_info(),
            to: self.investor_token_account.to_account_info(),
            authority: self.payer.to_account_info(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }

    pub fn transfer_to_startup_ctx(&self) -> CpiContext<'_, '_, '_, 'info, token::Transfer<'info>> {
        let cpi_accounts = token::Transfer {
            from: self.payer.to_account_info(),
            to: self.startup_token_account.to_account_info(),
            authority: self.payer.to_account_info(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }
}

// ======================================================
// 🔹 STRUCT DE DADOS — InvestmentContract
// ======================================================

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
    pub const LEN: usize = 32 + 32 + 8 + 1 + 8 + 8 + 8 + 8 + 1 + 1;
}
