// src/models.rs
use sqlx::types::BigDecimal;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use time::OffsetDateTime;
use utoipa::ToSchema;
use uuid::Uuid;

// --- User Models ---

#[derive(Serialize, FromRow, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct User {
    pub id: Uuid,
    pub full_name: Option<String>,
    pub email: String,
    #[serde(skip_serializing)] // Never send password hash to the client
    pub password_hash: Option<String>,
    pub wallet_public_key: String,
    #[schema(value_type = String)]
    pub created_at: OffsetDateTime,
    #[schema(value_type = String)]
    pub updated_at: OffsetDateTime,
}

#[derive(Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct CreateUserPayload {
    pub email: String,
    pub password: String,
    pub wallet_public_key: String,
    pub full_name: Option<String>,
}

#[derive(Deserialize, ToSchema, Default)]
#[serde(rename_all = "camelCase")]
pub struct UpdateUserPayload {
    pub full_name: Option<String>,
    pub wallet_public_key: Option<String>,
}

// --- Startup Models ---

#[derive(Serialize, FromRow, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct Startup {
    pub id: Uuid,
    pub user_id: Option<Uuid>,
    pub name: String,
    pub slogan: Option<String>,
    pub description: Option<String>,
    pub problem: Option<String>,
    pub logo_url: Option<String>,
    pub video_pitch_url: Option<String>,
    #[schema(value_type = String)]
    pub created_at: OffsetDateTime,
}

#[derive(Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct CreateStartupPayload {
    pub name: String,
    pub slogan: Option<String>,
    pub description: Option<String>,
    pub problem: Option<String>,
    pub logo_url: Option<String>,
    pub video_pitch_url: Option<String>,
}

#[derive(Deserialize, ToSchema, Default)]
#[serde(rename_all = "camelCase")]
pub struct UpdateStartupPayload {
    pub name: Option<String>,
    pub slogan: Option<String>,
    pub description: Option<String>,
    pub problem: Option<String>,
    pub logo_url: Option<String>,
    pub video_pitch_url: Option<String>,
}

// --- Contract Models ---

#[derive(Serialize, Deserialize, ToSchema, sqlx::Type, Clone, Debug)]
#[sqlx(type_name = "ContractStatus", rename_all = "lowercase")]
pub enum ContractStatus {
    Draft,
    Active,
    Completed,
    Cancelled,
}

#[derive(Serialize, FromRow, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct Contract {
    pub id: Uuid,
    pub startup_id: Option<Uuid>,
    #[schema(value_type = String)]
    pub requested_amount: Option<BigDecimal>,
    #[schema(value_type = String)]
    pub equity_offered: Option<BigDecimal>,
    pub smart_contract_address: Option<String>,
    pub status: ContractStatus,
    #[schema(value_type = String)]
    pub created_at: OffsetDateTime,
}

#[derive(Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct CreateContractPayload {
    #[schema(value_type = String)]
    pub requested_amount: Option<BigDecimal>,
    #[schema(value_type = String)]
    pub equity_offered: Option<BigDecimal>,
    pub smart_contract_address: Option<String>,
}

#[derive(Deserialize, ToSchema, Default)]
#[serde(rename_all = "camelCase")]
pub struct UpdateContractPayload {
    #[schema(value_type = String)]
    pub requested_amount: Option<BigDecimal>,
    #[schema(value_type = String)]
    pub equity_offered: Option<BigDecimal>,
    pub smart_contract_address: Option<String>,
    pub status: Option<ContractStatus>,
}

// --- Investment Models ---

#[derive(Serialize, FromRow, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct Investment {
    pub id: Uuid,
    pub contract_id: Option<Uuid>,
    pub investor_id: Option<Uuid>,
    #[schema(value_type = String)]
    pub amount_invested: Option<BigDecimal>,
    pub nft_token_id: Option<String>,
    pub transaction_hash: Option<String>,
    #[schema(value_type = String)]
    pub created_at: OffsetDateTime,
}

#[derive(Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct CreateInvestmentPayload {
    #[schema(value_type = String)]
    pub amount_invested: BigDecimal,
    pub nft_token_id: Option<String>,
    pub transaction_hash: Option<String>,
}

// --- Milestone Models ---

#[derive(Serialize, FromRow, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct Milestone {
    pub id: Uuid,
    pub contract_id: Uuid,
    pub title: String,
    pub description: Option<String>,
}

#[derive(Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct CreateMilestonePayload {
    pub title: String,
    pub description: Option<String>,
}

#[derive(Deserialize, ToSchema, Default)]
#[serde(rename_all = "camelCase")]
pub struct UpdateMilestonePayload {
    pub title: Option<String>,
    pub description: Option<String>,
}

// --- File Models ---

#[derive(Serialize, FromRow, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct File {
    pub id: Uuid,
    pub startup_id: Option<Uuid>,
    pub file_url: Option<String>,
    pub description: Option<String>,
    #[schema(value_type = String)]
    pub created_at: OffsetDateTime,
}

#[derive(Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct CreateFilePayload {
    pub file_url: String,
    pub description: Option<String>,
}

// --- NFT Progress Models ---

#[derive(Serialize, FromRow, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct NftProgress {
    pub id: Uuid,
    pub investment_id: Uuid,
    pub milestone_id: Uuid,
    pub visual_state: Option<String>,
    #[schema(value_type = String)]
    pub updated_at: OffsetDateTime,
}

#[derive(Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct CreateNftProgressPayload {
    pub visual_state: Option<String>,
}

// --- Wallet Connection Models ---

#[derive(Serialize, FromRow, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct WalletConnection {
    pub id: Uuid,
    pub user_id: Option<Uuid>,
    pub wallet_public_key: Option<String>,
    pub network: Option<String>,
    #[schema(value_type = String)]
    pub connected_at: OffsetDateTime,
}

#[derive(Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct CreateWalletConnectionPayload {
    pub wallet_public_key: String,
    pub network: Option<String>,
}
