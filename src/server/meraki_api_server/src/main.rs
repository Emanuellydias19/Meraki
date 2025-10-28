// src/main.rs

// Declare the modules we created
mod auth;
mod db;
mod error;
mod handlers;
mod models;

use axum::{
    routing::{delete, get, patch, post},
    Router,
};
use std::net::SocketAddr;
use utoipa::{
    openapi::security::{HttpAuthScheme, HttpBuilder, SecurityScheme},
    Modify, OpenApi,
};
use utoipa_swagger_ui::SwaggerUi;

// --- Swagger (Utoipa) Configuration ---

// Struct that defines the OpenAPI documentation
#[derive(OpenApi)]
#[openapi(
    // List of API paths (endpoints)
    paths(
        // Auth
        handlers::login,
        // Users
        handlers::create_user,
        handlers::get_users,
        handlers::get_user_by_id,
        handlers::update_me,
        handlers::delete_me,
        // Startups
        handlers::create_startup,
        handlers::get_startups,
        handlers::update_startup,
        handlers::delete_startup,
        // Contracts
        handlers::create_contract,
        handlers::get_contracts_for_startup,
        handlers::get_contract_by_id,
        handlers::update_contract,
        // Investments
        handlers::create_investment,
        handlers::get_investments_for_contract,
        handlers::get_my_investments,
        // Milestones
        handlers::create_milestone,
        handlers::get_milestones_for_contract,
        handlers::update_milestone,
        // Files
        handlers::create_file,
        handlers::get_files_for_startup,
        handlers::delete_file,
        // NFT Progress
        handlers::upsert_nft_progress,
        handlers::get_nft_progress_for_investment,
        // Wallet Connections
        handlers::create_wallet_connection,
        handlers::get_wallet_connections_for_user,
        handlers::delete_wallet_connection
    ),
    // List of schemas (models) used in the endpoints
    components(
        schemas(
            // Payloads
            handlers::LoginPayload,
            models::CreateUserPayload,
            models::UpdateUserPayload,
            models::CreateStartupPayload,
            models::UpdateStartupPayload,
            models::CreateContractPayload,
            models::UpdateContractPayload,
            models::CreateInvestmentPayload,
            models::CreateMilestonePayload,
            models::UpdateMilestonePayload,
            models::CreateFilePayload,
            models::CreateNftProgressPayload,
            models::CreateWalletConnectionPayload,
            // Responses / Models
            handlers::LoginResponse,
            models::User,
            models::Startup,
            models::Contract,
            models::ContractStatus,
            models::Investment,
            models::Milestone,
            models::File,
            models::NftProgress,
            models::WalletConnection
        )
    ),
    // Add bearer auth security scheme
    modifiers(&SecurityAddon),
    // Main API tag
    tags(
        (name = "Meraki API", description = "API for the Meraki Web3 platform")
    )
)]
struct ApiDoc;

// This struct adds the JWT bearer auth scheme to the OpenAPI documentation
struct SecurityAddon;
impl Modify for SecurityAddon {
    fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
        let components = openapi.components.get_or_insert_with(Default::default);
        components.add_security_scheme(
            "bearer_auth",
            SecurityScheme::Http(
                HttpBuilder::new()
                    .scheme(HttpAuthScheme::Bearer)
                    .bearer_format("JWT")
                    .build()
            ),
        );
    }
}

// --- End of Swagger ---

#[tokio::main]
async fn main() {
    // Load .env file
    dotenvy::dotenv().expect("Failed to read .env file");

    // 1. Connect to the Database
    let db_pool = db::create_pool()
        .await
        .expect("Failed to create the database connection pool.");

    // 2. Application state: we pass the PgPool directly as router state

    // 3. Create the Swagger UI route
    let swagger_ui = SwaggerUi::new("/swagger-ui")
        .url("/api-docs/openapi.json", ApiDoc::openapi());

    // 4. Create the Main Router
    let app = Router::new()
        // Merge Swagger UI routes into the router
        .merge(swagger_ui)
        
        // --- API Routes ---
        .route("/auth/login", post(handlers::login))
        .route("/auth/me", patch(handlers::update_me).delete(handlers::delete_me))
        .route("/auth/me/investments", get(handlers::get_my_investments))
        
        .route("/users", post(handlers::create_user).get(handlers::get_users))
        .route("/users/:id", get(handlers::get_user_by_id))

        .route("/startups", post(handlers::create_startup).get(handlers::get_startups))
        .route("/startups/:id", patch(handlers::update_startup).delete(handlers::delete_startup))

        .route("/startups/:startup_id/contracts", post(handlers::create_contract).get(handlers::get_contracts_for_startup))
        .route("/startups/:startup_id/files", post(handlers::create_file).get(handlers::get_files_for_startup))

        .route("/contracts/:id", get(handlers::get_contract_by_id).patch(handlers::update_contract))
        .route("/contracts/:contract_id/invest", post(handlers::create_investment))
        .route("/contracts/:contract_id/investments", get(handlers::get_investments_for_contract))
        .route("/contracts/:contract_id/milestones", post(handlers::create_milestone).get(handlers::get_milestones_for_contract))

        .route("/milestones/:id", patch(handlers::update_milestone))
        .route("/files/:id", delete(handlers::delete_file))
    // NFT progress
    .route("/investments/:investment_id/milestones/:milestone_id/progress", post(handlers::upsert_nft_progress))
    .route("/investments/:investment_id/progress", get(handlers::get_nft_progress_for_investment))
    // Wallet connections
    .route("/auth/me/wallet-connections", post(handlers::create_wallet_connection))
    .route("/users/:id/wallet-connections", get(handlers::get_wallet_connections_for_user))
    .route("/wallet-connections/:id", delete(handlers::delete_wallet_connection))
        // ------------------

        // Provide `app_state` (with the pool) to all handlers
        .with_state(db_pool);

    // 5. Start the server
    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    println!("🚀 Server running at http://{}", addr);
    println!("📖 Swagger documentation available at http://localhost:3000/swagger-ui/");

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app.into_make_service())
        .await
        .unwrap();
}
