use anchor_lang::prelude::*;

declare_id!("GyCiLswm3XZTHKMSpj1nzFEEit8qp5kAWX7bszHd2pBE");

#[program]
pub mod meraki_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
