// src/error.rs
use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;

// Define a more comprehensive error type for the application
pub enum AppError {
    // Represents a generic internal server error
    InternalServerError(String),
    // Represents an error for when a resource is not found
    NotFound(String),
    // Represents an authentication error
    Unauthorized,
    // Represents a permission error (user is authenticated but not allowed)
    Forbidden,
    // Wraps SQLx database errors
    SqlxError(sqlx::Error),
    // Wraps password hashing errors
    PasswordHashError(argon::password_hash::Error),
}

// Implement how to convert AppError into an HTTP response
impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            AppError::InternalServerError(msg) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("An internal server error occurred: {}", msg),
            ),
            AppError::NotFound(item) => (
                StatusCode::NOT_FOUND,
                format!("{} not found", item),
            ),
            AppError::Unauthorized => (
                StatusCode::UNAUTHORIZED,
                "Authentication required".to_string(),
            ),
            AppError::Forbidden => (
                StatusCode::FORBIDDEN,
                "Access denied. You do not have permission to perform this action.".to_string(),
            ),
            AppError::SqlxError(e) => {
                eprintln!("SQL Error: {:?}", e);
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "A database error occurred".to_string(),
                )
            }
            AppError::PasswordHashError(e) => {
                eprintln!("Password Hash Error: {:?}", e);
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "An internal security error occurred".to_string(),
                )
            }
        };

        // Create a JSON response body
        let body = Json(json!({
            "error": error_message,
        }));

        (status, body).into_response()
    }
}

// Enable converting from `sqlx::Error` to `AppError` with `?`
impl From<sqlx::Error> for AppError {
    fn from(e: sqlx::Error) -> Self {
        AppError::SqlxError(e)
    }
}

// Allows using the `?` operator with argon errors
impl From<argon::password_hash::Error> for AppError {
    fn from(e: argon::password_hash::Error) -> Self {
        AppError::PasswordHashError(e)
    }
}
