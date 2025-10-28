-- Add migration script here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "ContractStatus" AS ENUM (
  'draft',
  'active',
  'completed',
  'cancelled'
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "full_name" text,
  "email" text UNIQUE NOT NULL,
  "password_hash" text,
  "wallet_public_key" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "startups" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user_id" uuid REFERENCES "users" ("id"),
  "name" text NOT NULL,
  "slogan" text,
  "description" text,
  "problem" text,
  "logo_url" text,
  "video_pitch_url" text,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "contracts" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "startup_id" uuid REFERENCES "startups" ("id") ON DELETE CASCADE,
  "requested_amount" numeric,
  "equity_offered" numeric,
  "smart_contract_address" text,
  "status" "ContractStatus" NOT NULL DEFAULT 'draft',
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "investments" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "contract_id" uuid REFERENCES "contracts" ("id"),
  "investor_id" uuid REFERENCES "users" ("id"),
  "amount_invested" numeric,
  "nft_token_id" text,
  "transaction_hash" text UNIQUE,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "milestones" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "contract_id" uuid NOT NULL REFERENCES "contracts" ("id") ON DELETE CASCADE,
  "title" text NOT NULL,
  "description" text
);

CREATE TABLE "nft_progress" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "investment_id" uuid NOT NULL REFERENCES "investments" ("id") ON DELETE CASCADE,
  "milestone_id" uuid NOT NULL REFERENCES "milestones" ("id") ON DELETE CASCADE,
  "visual_state" text, /* ex: 'level_2', 'level_3' */
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  /* Garante que um investidor não possa atingir o mesmo milestone duas vezes */
  UNIQUE("investment_id", "milestone_id") 
);

CREATE TABLE "files" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "startup_id" uuid REFERENCES "startups" ("id") ON DELETE CASCADE,
  "file_url" text,
  "description" text,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "wallet_connections" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user_id" uuid REFERENCES "users" ("id") ON DELETE CASCADE,
  "wallet_public_key" text,
  "network" text DEFAULT 'solana',
  "connected_at" timestamptz NOT NULL DEFAULT now()
);