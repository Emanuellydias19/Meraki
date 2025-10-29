// src/db.rs
use sqlx::{postgres::PgPool, Error};
use std::env;

/// Loads the .env file and creates the Postgres connection pool
pub async fn create_pool() -> Result<PgPool, Error> {
    // Loads the variables from the .env file
    dotenvy::dotenv().expect("Could not find the .env file");

    // Reads the DATABASE_URL from the .env file
    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL was not defined in the .env file");

    // Creates the connection pool
    let pool = PgPool::connect(&database_url).await?;

    println!("Connection to the database established.");
    Ok(pool)
}
