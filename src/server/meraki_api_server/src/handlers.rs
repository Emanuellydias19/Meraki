use crate::{
    auth::{self, hash_password, TokenClaims},
    error::AppError,
    models::{
        self, CreateContractPayload, CreateFilePayload, CreateInvestmentPayload,
        CreateMilestonePayload, CreateNftProgressPayload, CreateStartupPayload,
        CreateUserPayload, CreateWalletConnectionPayload, UpdateContractPayload,
        UpdateMilestonePayload, UpdateStartupPayload, UpdateUserPayload,
    },
};
use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use sqlx::PgPool;
use uuid::Uuid;
use argon::{
    password_hash::{PasswordHash, PasswordVerifier},
    Argon,
};

#[derive(Clone)]
pub struct AppState {
    pub db_pool: PgPool,
}

// --- Auth Handlers ---

#[derive(serde::Deserialize, utoipa::ToSchema)]
pub struct LoginPayload {
    pub email: String,
    pub password: String,
}

#[derive(serde::Serialize, utoipa::ToSchema)]
pub struct LoginResponse {
    token: String,
}

#[utoipa::path(
    post,
    path = "/auth/login",
    request_body = LoginPayload,
    responses(
        (status = 00, description = "Login successful", body = LoginResponse),
        (status = 0, description = "Invalid credentials")
    )
)]
pub async fn login(
    State(pool): State<PgPool>,
    Json(payload): Json<LoginPayload>,
) -> Result<Json<LoginResponse>, AppError> {
    let user = sqlx::query!(
        "SELECT id, password_hash FROM users WHERE email = $",
        payload.email
    )
    .fetch_optional(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?
    .ok_or(AppError::Unauthorized)?;

    let password_hash_str = user.password_hash.ok_or(AppError::Unauthorized)?;
    let parsed_hash = PasswordHash::new(&password_hash_str).map_err(|_| AppError::Unauthorized)?;

    Argon::default()
        .verify_password(payload.password.as_bytes(), &parsed_hash)
        .map_err(|_| AppError::Unauthorized)?;

    let token = auth::create_jwt(user.id)?;

    Ok(Json(LoginResponse { token }))
}


// --- User Handlers ---

#[utoipa::path(
    post,
    path = "/users",
    request_body = CreateUserPayload,
    responses(
        (status = 0, description = "User created successfully", body = User)
    )
)]
pub async fn create_user(
    State(pool): State<PgPool>,
    Json(payload): Json<CreateUserPayload>,
) -> Result<(StatusCode, Json<models::User>), AppError> {
    let password_hash = hash_password(payload.password.clone()).await?;

    let user = sqlx::query_as!(
        models::User,
        r#"
        INSERT INTO users (full_name, email, password_hash, wallet_public_key)
        VALUES ($, $, $, $)
        RETURNING id, full_name, email, password_hash, wallet_public_key, created_at, updated_at
        "#,
        payload.full_name,
        payload.email,
        password_hash,
        payload.wallet_public_key
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok((StatusCode::CREATED, Json(user)))
}

#[utoipa::path(
    get,
    path = "/users",
    responses(
        (status = 00, description = "List of all users", body = [User])
    )
)]
pub async fn get_users(
    State(pool): State<PgPool>,
) -> Result<Json<Vec<models::User>>, AppError> {
    let users = sqlx::query_as!(
        models::User,
        "SELECT id, full_name, email, password_hash, wallet_public_key, created_at, updated_at FROM users"
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;
    Ok(Json(users))
}

#[utoipa::path(
    get,
    path = "/users/{id}",
    params(
        ("id" = Uuid, Path, description = "User ID")
    ),
    responses(
        (status = 00, description = "User found", body = User),
        (status = 0, description = "User not found")
    )
)]
pub async fn get_user_by_id(
    State(pool): State<PgPool>,
    Path(id): Path<Uuid>,
) -> Result<Json<models::User>, AppError> {
    let user = sqlx::query_as!(models::User, "SELECT id, full_name, email, password_hash, wallet_public_key, created_at, updated_at FROM users WHERE id = $", id)
        .fetch_one(&pool)
        .await
        .map_err(|_| AppError::NotFound("User".to_string()))?;

    Ok(Json(user))
}

#[utoipa::path(
    patch,
    path = "/auth/me",
    request_body = UpdateUserPayload,
    responses(
        (status = 00, description = "User updated successfully", body = User),
        (status = 0, description = "Unauthorized")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn update_me(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Json(payload): Json<UpdateUserPayload>,
) -> Result<Json<models::User>, AppError> {
    let user_id = claims.sub;

    let user = sqlx::query_as!(
        models::User,
        "UPDATE users SET full_name = COALESCE($, full_name), wallet_public_key = COALESCE($, wallet_public_key), updated_at = now() WHERE id = $ RETURNING id, full_name, email, password_hash, wallet_public_key, created_at, updated_at",
        payload.full_name,
        payload.wallet_public_key,
        user_id
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| AppError::NotFound("User".to_string()))?;

    Ok(Json(user))
}

#[utoipa::path(
    delete,
    path = "/auth/me",
    responses(
        (status = 0, description = "User deleted successfully"),
        (status = 0, description = "Unauthorized")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn delete_me(
    State(pool): State<PgPool>,
    claims: TokenClaims,
) -> Result<StatusCode, AppError> {
    let user_id = claims.sub;

    let result = sqlx::query!("DELETE FROM users WHERE id = $", user_id)
        .execute(&pool)
        .await
        .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    if result.rows_affected() == 0 {
        return Err(AppError::NotFound("User".to_string()));
    }

    Ok(StatusCode::NO_CONTENT)
}

// --- Startup Handlers ---

#[utoipa::path(
    post,
    path = "/startups",
    request_body = CreateStartupPayload,
    responses(
        (status = 0, description = "Startup created successfully", body = Startup),
        (status = 0, description = "Unauthorized")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn create_startup(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Json(payload): Json<CreateStartupPayload>,
) -> Result<(StatusCode, Json<models::Startup>), AppError> {
    let user_id = claims.sub;

    let startup = sqlx::query_as!(
        models::Startup,
        r#"
        INSERT INTO startups (user_id, name, slogan, description, problem, logo_url, video_pitch_url)
        VALUES ($, $, $, $, $5, $6, $7)
        RETURNING *
        "#,
        user_id,
        payload.name,
        payload.slogan,
        payload.description,
        payload.problem,
        payload.logo_url,
        payload.video_pitch_url
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok((StatusCode::CREATED, Json(startup)))
}

#[utoipa::path(
    get,
    path = "/startups",
    responses(
        (status = 00, description = "List of all startups", body = [Startup])
    )
)]
pub async fn get_startups(
    State(pool): State<PgPool>,
) -> Result<Json<Vec<models::Startup>>, AppError> {
    let startups = sqlx::query_as!(models::Startup, "SELECT * FROM startups")
        .fetch_all(&pool)
        .await
        .map_err(|e| AppError::InternalServerError(e.to_string()))?;
    Ok(Json(startups))
}

#[utoipa::path(
    patch,
    path = "/startups/{id}",
    request_body = UpdateStartupPayload,
    params(
        ("id" = Uuid, Path, description = "Startup ID")
    ),
    responses(
        (status = 00, description = "Startup updated", body = Startup),
        (status = 0, description = "Unauthorized"),
        (status = 0, description = "Forbidden"),
        (status = 0, description = "Startup not found")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn update_startup(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Path(id): Path<Uuid>,
    Json(payload): Json<UpdateStartupPayload>,
) -> Result<Json<models::Startup>, AppError> {
    let user_id = claims.sub;

    let startup_owner: (Option<Uuid>,) = sqlx::query_as("SELECT user_id FROM startups WHERE id = $")
        .bind(id)
        .fetch_one(&pool)
        .await
        .map_err(|_| AppError::NotFound("Startup".to_string()))?;

    if startup_owner.0 != Some(user_id) {
        return Err(AppError::Forbidden);
    }

    let updated_startup = sqlx::query_as!(
        models::Startup,
        r#"
        UPDATE startups
        SET 
            name = COALESCE($, name),
            slogan = COALESCE($, slogan),
            description = COALESCE($, description),
            problem = COALESCE($, problem),
            logo_url = COALESCE($5, logo_url),
            video_pitch_url = COALESCE($6, video_pitch_url)
        WHERE id = $7
        RETURNING *
        "#,
        payload.name,
        payload.slogan,
        payload.description,
        payload.problem,
        payload.logo_url,
        payload.video_pitch_url,
        id
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok(Json(updated_startup))
}

#[utoipa::path(
    delete,
    path = "/startups/{id}",
    params(
        ("id" = Uuid, Path, description = "Startup ID")
    ),
    responses(
        (status = 0, description = "Startup deleted"),
        (status = 0, description = "Unauthorized"),
        (status = 0, description = "Forbidden"),
        (status = 0, description = "Startup not found")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn delete_startup(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Path(id): Path<Uuid>,
) -> Result<StatusCode, AppError> {
    let user_id = claims.sub;

    let startup_owner: (Option<Uuid>,) = sqlx::query_as("SELECT user_id FROM startups WHERE id = $")
        .bind(id)
        .fetch_one(&pool)
        .await
        .map_err(|_| AppError::NotFound("Startup".to_string()))?;

    if startup_owner.0 != Some(user_id) {
        return Err(AppError::Forbidden);
    }

    sqlx::query!("DELETE FROM startups WHERE id = $", id)
        .execute(&pool)
        .await
        .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok(StatusCode::NO_CONTENT)
}

// --- Contract Handlers ---

#[utoipa::path(
    post,
    path = "/startups/{startup_id}/contracts",
    request_body = CreateContractPayload,
    params(
        ("startup_id" = Uuid, Path, description = "Startup ID to create contract for")
    ),
    responses(
        (status = 0, description = "Contract created", body = Contract),
        (status = 0, description = "Unauthorized"),
        (status = 0, description = "Forbidden"),
        (status = 0, description = "Startup not found")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn create_contract(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Path(startup_id): Path<Uuid>,
    Json(payload): Json<CreateContractPayload>,
) -> Result<(StatusCode, Json<models::Contract>), AppError> {
    let user_id = claims.sub;

    let startup_owner: (Option<Uuid>,) =
        sqlx::query_as("SELECT user_id FROM startups WHERE id = $")
            .bind(startup_id)
            .fetch_one(&pool)
            .await
            .map_err(|_| AppError::NotFound("Startup".to_string()))?;

    if startup_owner.0 != Some(user_id) {
        return Err(AppError::Forbidden);
    }

    let contract = sqlx::query_as!(
        models::Contract,
        r#"
        INSERT INTO contracts (startup_id, requested_amount, equity_offered, smart_contract_address)
        VALUES ($, $, $, $)
        RETURNING id, startup_id, requested_amount, equity_offered, smart_contract_address, status AS "status: _", created_at
        "#,
        startup_id,
        payload.requested_amount,
        payload.equity_offered,
        payload.smart_contract_address
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok((StatusCode::CREATED, Json(contract)))
}

#[utoipa::path(
    get,
    path = "/startups/{startup_id}/contracts",
    params(
        ("startup_id" = Uuid, Path, description = "Startup ID")
    ),
    responses(
        (status = 00, description = "List of contracts", body = [Contract])
    )
)]
pub async fn get_contracts_for_startup(
    State(pool): State<PgPool>,
    Path(startup_id): Path<Uuid>,
) -> Result<Json<Vec<models::Contract>>, AppError> {
    let contracts = sqlx::query_as!(
        models::Contract,
        r#"SELECT id, startup_id, requested_amount, equity_offered, smart_contract_address, status AS "status: _", created_at FROM contracts WHERE startup_id = $"#,
        startup_id
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok(Json(contracts))
}

#[utoipa::path(
    get,
    path = "/contracts/{id}",
    params(
        ("id" = Uuid, Path, description = "Contract ID")
    ),
    responses(
        (status = 00, description = "Contract found", body = Contract),
        (status = 0, description = "Contract not found")
    )
)]
pub async fn get_contract_by_id(
    State(pool): State<PgPool>,
    Path(id): Path<Uuid>,
) -> Result<Json<models::Contract>, AppError> {
    let contract = sqlx::query_as!(
        models::Contract,
        r#"SELECT id, startup_id, requested_amount, equity_offered, smart_contract_address, status AS "status: _", created_at FROM contracts WHERE id = $"#,
        id
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| AppError::NotFound("Contract".to_string()))?;

    Ok(Json(contract))
}

#[utoipa::path(
    patch,
    path = "/contracts/{id}",
    request_body = UpdateContractPayload,
    params(
        ("id" = Uuid, Path, description = "Contract ID")
    ),
    responses(
        (status = 00, description = "Contract updated", body = Contract),
        (status = 0, description = "Unauthorized"),
        (status = 0, description = "Forbidden"),
        (status = 0, description = "Contract not found")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn update_contract(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Path(id): Path<Uuid>,
    Json(payload): Json<UpdateContractPayload>,
) -> Result<Json<models::Contract>, AppError> {
    let user_id = claims.sub;

    let contract_owner: (Option<Uuid>,) = sqlx::query_as(
        "SELECT s.user_id FROM contracts c JOIN startups s ON c.startup_id = s.id WHERE c.id = $",
    )
    .bind(id)
    .fetch_one(&pool)
    .await
    .map_err(|_| AppError::NotFound("Contract".to_string()))?;

    if contract_owner.0 != Some(user_id) {
        return Err(AppError::Forbidden);
    }

    let contract = sqlx::query_as!(
        models::Contract,
        r#"
        UPDATE contracts
        SET
            requested_amount = COALESCE($, requested_amount),
            equity_offered = COALESCE($, equity_offered),
            smart_contract_address = COALESCE($, smart_contract_address),
            status = COALESCE($, status)
        WHERE id = $5
        RETURNING id, startup_id, requested_amount, equity_offered, smart_contract_address, status AS "status: _", created_at
        "#,
        payload.requested_amount,
        payload.equity_offered,
        payload.smart_contract_address,
        payload.status as _,
        id
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok(Json(contract))
}

// --- Investment Handlers ---

#[utoipa::path(
    post,
    path = "/contracts/{contract_id}/invest",
    request_body = CreateInvestmentPayload,
    params(
        ("contract_id" = Uuid, Path, description = "Contract ID to invest in")
    ),
    responses(
        (status = 0, description = "Investment created", body = Investment),
        (status = 0, description = "Unauthorized"),
        (status = 0, description = "Contract not found")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn create_investment(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Path(contract_id): Path<Uuid>,
    Json(payload): Json<CreateInvestmentPayload>,
) -> Result<(StatusCode, Json<models::Investment>), AppError> {
    let investor_id = claims.sub;

    let investment = sqlx::query_as!(
        models::Investment,
        r#"
        INSERT INTO investments (contract_id, investor_id, amount_invested, nft_token_id, transaction_hash)
        VALUES ($, $, $, $, $5)
        RETURNING *
        "#,
        contract_id,
        investor_id,
        payload.amount_invested,
        payload.nft_token_id,
        payload.transaction_hash
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok((StatusCode::CREATED, Json(investment)))
}

#[utoipa::path(
    get,
    path = "/contracts/{contract_id}/investments",
    params(
        ("contract_id" = Uuid, Path, description = "Contract ID")
    ),
    responses(
        (status = 00, description = "List of investments for a contract", body = [Investment])
    )
)]
pub async fn get_investments_for_contract(
    State(pool): State<PgPool>,
    Path(contract_id): Path<Uuid>,
) -> Result<Json<Vec<models::Investment>>, AppError> {
    let investments = sqlx::query_as!(
        models::Investment,
        "SELECT * FROM investments WHERE contract_id = $",
        contract_id
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok(Json(investments))
}

#[utoipa::path(
    get,
    path = "/auth/me/investments",
    responses(
        (status = 00, description = "List of investments for the logged-in user", body = [Investment]),
        (status = 0, description = "Unauthorized")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn get_my_investments(
    State(pool): State<PgPool>,
    claims: TokenClaims,
) -> Result<Json<Vec<models::Investment>>, AppError> {
    let user_id = claims.sub;
    let investments = sqlx::query_as!(
        models::Investment,
        "SELECT * FROM investments WHERE investor_id = $",
        user_id
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok(Json(investments))
}

// --- Milestone Handlers ---

#[utoipa::path(
    post,
    path = "/contracts/{contract_id}/milestones",
    request_body = CreateMilestonePayload,
    params(
        ("contract_id" = Uuid, Path, description = "Contract ID to add milestone to")
    ),
    responses(
        (status = 0, description = "Milestone created", body = Milestone),
        (status = 0, description = "Unauthorized"),
        (status = 0, description = "Forbidden"),
        (status = 0, description = "Contract not found")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn create_milestone(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Path(contract_id): Path<Uuid>,
    Json(payload): Json<CreateMilestonePayload>,
) -> Result<(StatusCode, Json<models::Milestone>), AppError> {
    let user_id = claims.sub;

    let contract_owner: (Option<Uuid>,) = sqlx::query_as(
        "SELECT s.user_id FROM contracts c JOIN startups s ON c.startup_id = s.id WHERE c.id = $",
    )
    .bind(contract_id)
    .fetch_one(&pool)
    .await
    .map_err(|_| AppError::NotFound("Contract".to_string()))?;

    if contract_owner.0 != Some(user_id) {
        return Err(AppError::Forbidden);
    }

    let milestone = sqlx::query_as!(
        models::Milestone,
        "INSERT INTO milestones (contract_id, title, description) VALUES ($, $, $) RETURNING *",
        contract_id,
        payload.title,
        payload.description
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok((StatusCode::CREATED, Json(milestone)))
}

#[utoipa::path(
    get,
    path = "/contracts/{contract_id}/milestones",
    params(
        ("contract_id" = Uuid, Path, description = "Contract ID")
    ),
    responses(
        (status = 00, description = "List of milestones for a contract", body = [Milestone])
    )
)]
pub async fn get_milestones_for_contract(
    State(pool): State<PgPool>,
    Path(contract_id): Path<Uuid>,
) -> Result<Json<Vec<models::Milestone>>, AppError> {
    let milestones = sqlx::query_as!(
        models::Milestone,
        "SELECT * FROM milestones WHERE contract_id = $",
        contract_id
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok(Json(milestones))
}

#[utoipa::path(
    patch,
    path = "/milestones/{id}",
    request_body = UpdateMilestonePayload,
    params(
        ("id" = Uuid, Path, description = "Milestone ID")
    ),
    responses(
        (status = 00, description = "Milestone updated", body = Milestone),
        (status = 0, description = "Unauthorized"),
        (status = 0, description = "Forbidden"),
        (status = 0, description = "Milestone not found")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn update_milestone(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Path(id): Path<Uuid>,
    Json(payload): Json<UpdateMilestonePayload>,
) -> Result<Json<models::Milestone>, AppError> {
    let user_id = claims.sub;

    let milestone_owner: (Option<Uuid>,) = sqlx::query_as(
        "SELECT s.user_id FROM milestones m JOIN contracts c ON m.contract_id = c.id JOIN startups s ON c.startup_id = s.id WHERE m.id = $",
    )
    .bind(id)
    .fetch_one(&pool)
    .await
    .map_err(|_| AppError::NotFound("Milestone".to_string()))?;

    if milestone_owner.0 != Some(user_id) {
        return Err(AppError::Forbidden);
    }

    let milestone = sqlx::query_as!(
        models::Milestone,
        "UPDATE milestones SET title = COALESCE($, title), description = COALESCE($, description) WHERE id = $ RETURNING *",
        payload.title,
        payload.description,
        id
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok(Json(milestone))
}

// --- File Handlers ---

#[utoipa::path(
    post,
    path = "/startups/{startup_id}/files",
    request_body = CreateFilePayload,
    params(
        ("startup_id" = Uuid, Path, description = "Startup ID to upload file for")
    ),
    responses(
        (status = 0, description = "File created", body = File),
        (status = 0, description = "Unauthorized"),
        (status = 0, description = "Forbidden"),
        (status = 0, description = "Startup not found")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn create_file(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Path(startup_id): Path<Uuid>,
    Json(payload): Json<CreateFilePayload>,
) -> Result<(StatusCode, Json<models::File>), AppError> {
    let user_id = claims.sub;

    let startup_owner: (Option<Uuid>,) =
        sqlx::query_as("SELECT user_id FROM startups WHERE id = $")
            .bind(startup_id)
            .fetch_one(&pool)
            .await
            .map_err(|_| AppError::NotFound("Startup".to_string()))?;

    if startup_owner.0 != Some(user_id) {
        return Err(AppError::Forbidden);
    }

    let file = sqlx::query_as!(
        models::File,
        "INSERT INTO files (startup_id, file_url, description) VALUES ($, $, $) RETURNING *",
        startup_id,
        payload.file_url,
        payload.description
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok((StatusCode::CREATED, Json(file)))
}

#[utoipa::path(
    get,
    path = "/startups/{startup_id}/files",
    params(
        ("startup_id" = Uuid, Path, description = "Startup ID")
    ),
    responses(
        (status = 00, description = "List of files for a startup", body = [File])
    )
)]
pub async fn get_files_for_startup(
    State(pool): State<PgPool>,
    Path(startup_id): Path<Uuid>,
) -> Result<Json<Vec<models::File>>, AppError> {
    let files = sqlx::query_as!(
        models::File,
        "SELECT * FROM files WHERE startup_id = $",
        startup_id
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok(Json(files))
}

#[utoipa::path(
    delete,
    path = "/files/{id}",
    params(
        ("id" = Uuid, Path, description = "File ID")
    ),
    responses(
        (status = 0, description = "File deleted"),
        (status = 0, description = "Unauthorized"),
        (status = 0, description = "Forbidden"),
        (status = 0, description = "File not found")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn delete_file(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Path(id): Path<Uuid>,
) -> Result<StatusCode, AppError> {
    let user_id = claims.sub;

    let file_owner: (Option<Uuid>,) = sqlx::query_as(
        "SELECT s.user_id FROM files f JOIN startups s ON f.startup_id = s.id WHERE f.id = $",
    )
    .bind(id)
    .fetch_one(&pool)
    .await
    .map_err(|_| AppError::NotFound("File".to_string()))?;

    if file_owner.0 != Some(user_id) {
        return Err(AppError::Forbidden);
    }

    sqlx::query!("DELETE FROM files WHERE id = $", id)
        .execute(&pool)
        .await
        .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok(StatusCode::NO_CONTENT)
}

// --- NFT Progress Handlers ---

#[utoipa::path(
    post,
    path = "/investments/{investment_id}/milestones/{milestone_id}/progress",
    request_body = CreateNftProgressPayload,
    params(
        ("investment_id" = Uuid, Path, description = "Investment ID"),
        ("milestone_id" = Uuid, Path, description = "Milestone ID")
    ),
    responses(
        (status = 0, description = "NFT progress upserted", body = NftProgress),
        (status = 0, description = "Unauthorized"),
        (status = 0, description = "Forbidden"),
        (status = 0, description = "Investment or Milestone not found")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn upsert_nft_progress(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Path((investment_id, milestone_id)): Path<(Uuid, Uuid)>,
    Json(payload): Json<CreateNftProgressPayload>,
) -> Result<(StatusCode, Json<models::NftProgress>), AppError> {
    // Ensure the investment exists and is owned by the logged-in user
    let inv = sqlx::query!(
        "SELECT investor_id, contract_id FROM investments WHERE id = $",
        investment_id
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| AppError::NotFound("Investment".to_string()))?;

    if inv.investor_id != Some(claims.sub) {
        return Err(AppError::Forbidden);
    }

    // Ensure the milestone exists and belongs to the same contract as the investment
    let mile = sqlx::query!(
        "SELECT contract_id FROM milestones WHERE id = $",
        milestone_id
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| AppError::NotFound("Milestone".to_string()))?;

    if Some(mile.contract_id) != inv.contract_id {
        return Err(AppError::Forbidden);
    }

    let progress = sqlx::query_as!(
        models::NftProgress,
        r#"
        INSERT INTO nft_progress (investment_id, milestone_id, visual_state)
        VALUES ($, $, $)
        ON CONFLICT (investment_id, milestone_id)
        DO UPDATE SET visual_state = EXCLUDED.visual_state, updated_at = now()
        RETURNING id, investment_id, milestone_id, visual_state, updated_at
        "#,
        investment_id,
        milestone_id,
        payload.visual_state
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok((StatusCode::CREATED, Json(progress)))
}

#[utoipa::path(
    get,
    path = "/investments/{investment_id}/progress",
    params(
        ("investment_id" = Uuid, Path, description = "Investment ID")
    ),
    responses(
        (status = 00, description = "List NFT progress entries for an investment", body = [NftProgress])
    )
)]
pub async fn get_nft_progress_for_investment(
    State(pool): State<PgPool>,
    Path(investment_id): Path<Uuid>,
) -> Result<Json<Vec<models::NftProgress>>, AppError> {
    let items = sqlx::query_as!(
        models::NftProgress,
        r#"SELECT id, investment_id, milestone_id, visual_state, updated_at FROM nft_progress WHERE investment_id = $ ORDER BY updated_at DESC"#,
        investment_id
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok(Json(items))
}

// --- Wallet Connection Handlers ---

#[utoipa::path(
    post,
    path = "/auth/me/wallet-connections",
    request_body = CreateWalletConnectionPayload,
    responses(
        (status = 0, description = "Wallet connection created", body = WalletConnection),
        (status = 0, description = "Unauthorized")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn create_wallet_connection(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Json(payload): Json<CreateWalletConnectionPayload>,
) -> Result<(StatusCode, Json<models::WalletConnection>), AppError> {
    let user_id = claims.sub;

    let conn = sqlx::query_as!(
        models::WalletConnection,
        r#"
        INSERT INTO wallet_connections (user_id, wallet_public_key, network)
        VALUES ($, $, COALESCE($, 'solana'))
        RETURNING id, user_id, wallet_public_key, network, connected_at
        "#,
        user_id,
        payload.wallet_public_key,
        payload.network
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok((StatusCode::CREATED, Json(conn)))
}

#[utoipa::path(
    get,
    path = "/users/{id}/wallet-connections",
    params(
        ("id" = Uuid, Path, description = "User ID")
    ),
    responses(
        (status = 00, description = "List wallet connections for a user", body = [WalletConnection])
    )
)]
pub async fn get_wallet_connections_for_user(
    State(pool): State<PgPool>,
    Path(id): Path<Uuid>,
) -> Result<Json<Vec<models::WalletConnection>>, AppError> {
    let conns = sqlx::query_as!(
        models::WalletConnection,
        r#"SELECT id, user_id, wallet_public_key, network, connected_at FROM wallet_connections WHERE user_id = $ ORDER BY connected_at DESC"#,
        id
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok(Json(conns))
}

#[utoipa::path(
    delete,
    path = "/wallet-connections/{id}",
    params(
        ("id" = Uuid, Path, description = "Wallet connection ID")
    ),
    responses(
        (status = 0, description = "Wallet connection deleted"),
        (status = 0, description = "Unauthorized"),
        (status = 0, description = "Forbidden"),
        (status = 0, description = "Wallet connection not found")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn delete_wallet_connection(
    State(pool): State<PgPool>,
    claims: TokenClaims,
    Path(id): Path<Uuid>,
) -> Result<StatusCode, AppError> {
    let user_id = claims.sub;

    let owner = sqlx::query!(
        "SELECT user_id FROM wallet_connections WHERE id = $",
        id
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| AppError::NotFound("WalletConnection".to_string()))?;

    if owner.user_id != Some(user_id) {
        return Err(AppError::Forbidden);
    }

    sqlx::query!("DELETE FROM wallet_connections WHERE id = $", id)
        .execute(&pool)
        .await
        .map_err(|e| AppError::InternalServerError(e.to_string()))?;

    Ok(StatusCode::NO_CONTENT)
}
