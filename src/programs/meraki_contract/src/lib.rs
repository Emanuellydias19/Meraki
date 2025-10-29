use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount, Transfer};


declare_id!("5jdU5SpLxidhessiSTiAeuATxh7sSHnWKvvVVDK7");

#[program]
pub mod meraki_contract {
    use super::*;


    pub fn initialize_contract(
        ctx: Context<InitializeContract>,
        amount: u6,
        investor_return_percent: u8,
        duration_days: u6,
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

    
    pub fn invest(ctx: Context<Invest>) -> Result<()> {
        let total = ctx.accounts.investment_contract.amount;
        let meraki_fee = total / 00; // 0.5%
        let startup_amount = total - meraki_fee;

        token::transfer(ctx.accounts.transfer_to_meraki_ctx(), meraki_fee)?;
        token::transfer(ctx.accounts.transfer_to_contract_vault_ctx(), startup_amount)?;

        ctx.accounts.investment_contract.is_invested = true;
        Ok(())
    }


    pub fn record_revenue(ctx: Context<RecordRevenue>, revenue_amount: u6) -> Result<()> {
        let meraki_fee = revenue_amount / 00;
        let investor_share = (revenue_amount
            * ctx.accounts.investment_contract.investor_return_percent as u6)
            / 00;
        let startup_share = revenue_amount - meraki_fee - investor_share;

        token::transfer(ctx.accounts.transfer_to_meraki_ctx(), meraki_fee)?;
        token::transfer(ctx.accounts.transfer_to_investor_ctx(), investor_share)?;
        token::transfer(ctx.accounts.transfer_to_startup_ctx(), startup_share)?;

        let contract = &mut ctx.accounts.investment_contract;
        contract.total_revenue += revenue_amount;
        contract.total_distributed += investor_share;

        Ok(())
    }

    
    pub fn mint_investment_nft(ctx: Context<MintNFT>) -> Result<()> {
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.investor_token_account.to_account_info(),
                authority: ctx.accounts.mint_authority.to_account_info(),
            },
        );
        token::mint_to(cpi_ctx, )?;
        Ok(())
    }
}


#[derive(Accounts)]
pub struct InitializeContract<'info> {
    #[account(init, payer = investor, space = 8 + InvestmentContract::LEN)]
    pub investment_contract: Account<'info, InvestmentContract>,

    #[account(mut)]
    pub investor: Signer<'info>,

    
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
    pub vault_account: AccountInfo<'info>,

   
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

    
    pub mint_authority: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
}



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


#[account]
pub struct InvestmentContract {
    pub investor: Pubkey,
    pub startup: Pubkey,
    pub amount: u6,
    pub investor_return_percent: u8,
    pub duration_days: u6,
    pub start_time: i6,
    pub total_revenue: u6,
    pub total_distributed: u6,
    pub is_active: bool,
    pub is_invested: bool,
}

impl InvestmentContract {
    pub const LEN: usize =  +  + 8 +  + 8 + 8 + 8 + 8 +  + ;
}
