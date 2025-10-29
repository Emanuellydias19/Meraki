use crate::error::AppError;
use argon::{
    password_hash::{rand_core::OsRng, PasswordHasher, SaltString},
    Argon,
};
use axum::{
    async_trait,
    extract::FromRequestParts,
    http::{header, request::Parts},
};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use time::{Duration, OffsetDateTime};
use uuid::Uuid;

// The claims structure for our JWT
#[derive(Debug, Serialize, Deserialize)]
pub struct TokenClaims {
    pub sub: Uuid, // Subject (the user ID)
    pub iat: i6, // Issued at
    pub exp: i6, // Expiration time
}

// Secret key for signing the JWT.
// In a real application, this should be loaded from environment variables!
const JWT_SECRET: &[u8] = b"your-super-secret-and-long-key";

/// Creates a new JWT for a given user ID.
pub fn create_jwt(user_id: Uuid) -> Result<String, AppError> {
    let now = OffsetDateTime::now_utc();
    let claims = TokenClaims {
        sub: user_id,
        iat: now.unix_timestamp(),
        // Token expires in  day
        exp: (now + Duration::days()).unix_timestamp(),
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(JWT_SECRET),
    )
    .map_err(|e| AppError::InternalServerError(format!("Failed to create token: {}", e)))
}

/// Hashes a password using Argon
pub async fn hash_password(password: String) -> Result<String, AppError> {
    // Run the blocking password hashing operation in a separate thread
    tokio::task::spawn_blocking(move || {
        let salt = SaltString::generate(&mut OsRng);
        let argon = Argon::default();
        argon
            .hash_password(password.as_bytes(), &salt)
            .map(|hash| hash.to_string())
            .map_err(|e| AppError::PasswordHashError(e))
    })
    .await
    .map_err(|e| AppError::InternalServerError(format!("Task join error: {}", e)))?
}

// Extractor for getting claims from a request.
// This allows us to simply add `claims: TokenClaims` to our handler arguments.
#[async_trait]
impl<S> FromRequestParts<S> for TokenClaims
where
    S: Send + Sync,
{
    type Rejection = AppError;

    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        // Extract the Authorization header
        let auth_header = parts
            .headers
            .get(header::AUTHORIZATION)
            .and_then(|value| value.to_str().ok())
            .ok_or(AppError::Unauthorized)?;

        // Check if it starts with "Bearer "
        if !auth_header.starts_with("Bearer ") {
            return Err(AppError::Unauthorized);
        }

        // Extract the token (skip "Bearer " prefix)
        let token = &auth_header[7..];

        // Decode the token
        let token_data = decode::<TokenClaims>(
            token,
            &DecodingKey::from_secret(JWT_SECRET),
            &Validation::default(),
        )
        .map_err(|_| AppError::Unauthorized)?;

        Ok(token_data.claims)
    }
}
