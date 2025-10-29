# Documentação Técnica - Meraki Platform

## Arquitetura do Sistema

### Stack Tecnológica

- Frontend: Next.js 6.0.0 com React 9..0 e TypeScript 5.9.
- Backend: Rust com Axum, SQLx, PostgreSQL +
- Blockchain: Solana Devnet com Anchor Framework
- Autenticação: JWT com Argon para hash de senha
- CORS: tower-http

### Portas e Serviços

- Frontend: localhost:000
- Backend API: localhost:8080
- PostgreSQL: localhost:5
- Solana RPC: https://api.devnet.solana.com
- Program ID (Devnet): 5jdU5SpLxidhessiSTiAeuATxh7sSHnWKvvVVDK7

## Estrutura do Projeto

```
src/
├── .env.local
├── package.json
├── tsconfig.json
├── next.config.ts
├── client/
│   ├── app/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── dashboard/
│   │   └── lib/
│   │       ├── api/
│   │       │   ├── auth.ts
│   │       │   ├── startups.ts
│   │       │   └── investments.ts
│   │       ├── utils/
│   │       │   └── solana.ts
│   │       ├── config/
│   │       │   └── api.ts
│   │       └── idl/
│   │           └── meraki_contract.json
│   ├── components/
│   └── tsconfig.json
├── server/
│   └── meraki_api_server/
│       ├── .env
│       ├── Cargo.toml
│       ├── src/
│       │   ├── main.rs
│       │   ├── handlers.rs
│       │   ├── auth.rs
│       │   └── models.rs
│       └── migrations/
└── programs/
    └── meraki_contract/
        └── src/
            └── lib.rs
```

## Configuração de Ambiente

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_PROGRAM_ID=5jdU5SpLxidhessiSTiAeuATxh7sSHnWKvvVVDK7
NEXT_PUBLIC_RPC_ENDPOINT=https://api.devnet.solana.com
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

### Backend (.env)

```
DATABASE_URL=postgresql://postgres:password@localhost:5/meraki_db
HOST=0.0.0.0
PORT=8080
JWT_SECRET=your-secure-secret-key
ALLOWED_ORIGINS=http://localhost:000
```

## Instalação e Configuração

### Pré-requisitos

- Node.js 8+
- Rust e Cargo
- PostgreSQL +
- Solana CLI
- Docker (opcional)

### Setup com Docker

```powershell
docker run -d --name meraki-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=meraki_db -p 5:5 postgres:
```

### Setup Manual PostgreSQL

```powershell
createdb meraki_db
```

### Backend Setup

```powershell
cd src/server/meraki_api_server
copy .env.example .env
sqlx migrate run
cargo build --release
cargo run --release
```

### Frontend Setup

```powershell
cd src
npm install
npm run dev
```

### Dependências Solana

```powershell
npm install @solana/web.js @coral-xyz/anchor @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
```

## Endpoints da API

### Autenticação

POST /auth/login
Body: { "email": "user@example.com", "password": "password" }
Response: { "token": "jwt_token" }

POST /users
Body: { "full_name": "User Name", "email": "user@example.com", "password": "password" }
Response: { "id": "uuid", "full_name": "User Name", "email": "user@example.com", "created_at": "timestamp" }

PATCH /auth/me
Headers: Authorization: Bearer {token}
Body: { "full_name": "New Name" }
Response: Updated user object

DELETE /auth/me
Headers: Authorization: Bearer {token}
Response: 0 No Content

### Startups

GET /startups
Response: Array of startup objects

POST /startups
Headers: Authorization: Bearer {token}
Body: { "name": "Startup Name", "description": "Description", "category": "Category", "funding_goal": "000000000", "wallet_address": "solana_address" }
Response: Created startup object

PATCH /startups/:id
Headers: Authorization: Bearer {token}
Body: Partial startup object
Response: Updated startup object

DELETE /startups/:id
Headers: Authorization: Bearer {token}
Response: 0 No Content

### Contratos

POST /startups/:startup_id/contracts
Headers: Authorization: Bearer {token}
Body: { "investor_id": "uuid", "amount": "000000000", "investor_return_percent": 0, "duration_days": 65 }
Response: Created contract object

GET /contracts/:id
Response: Contract object

PATCH /contracts/:id
Headers: Authorization: Bearer {token}
Body: Partial contract object
Response: Updated contract object

### Investimentos

POST /contracts/:contract_id/invest
Headers: Authorization: Bearer {token}
Body: { "amount": "000000000", "blockchain_tx_hash": "transaction_signature" }
Response: Created investment object

GET /auth/me/investments
Headers: Authorization: Bearer {token}
Response: Array of investment objects

## Integração Blockchain

### Funções Solana (solana.ts)

#### getConnection()

Retorna conexão com RPC endpoint configurado

#### getProgramId()

Retorna PublicKey do programa implantado na devnet

#### getProvider(wallet)

Cria provider do Anchor para interagir com contratos
Parâmetros: wallet (WalletContextState)
Retorna: anchor.AnchorProvider

#### initializeContract(wallet, amount, investorReturnPercent, durationDays, startupPublicKey)

Cria novo contrato de investimento na blockchain
Parâmetros:

- wallet: objeto da wallet conectada
- amount: valor em lamports ( SOL = 000000000 lamports)
- investorReturnPercent: percentual de retorno do investidor
- durationDays: duração do contrato em dias
- startupPublicKey: endereço público da startup
  Retorna: { contractAddress, signature }

#### invest(wallet, contractAddress)

Executa investimento transferindo tokens para vault do contrato
Parâmetros:

- wallet: objeto da wallet conectada
- contractAddress: endereço do contrato criado
  Retorna: transaction signature

#### recordRevenue(wallet, contractAddress, revenueAmount)

Registra receita da startup com distribuição automática
Parâmetros:

- wallet: objeto da wallet conectada
- contractAddress: endereço do contrato
- revenueAmount: valor da receita em lamports
  Retorna: transaction signature

#### mintInvestmentNft(wallet, mintAddress)

Cria NFT representando o investimento
Parâmetros:

- wallet: objeto da wallet conectada
- mintAddress: endereço do mint do NFT
  Retorna: transaction signature

#### getContract(wallet, contractAddress)

Busca dados on-chain do contrato
Parâmetros:

- wallet: objeto da wallet conectada
- contractAddress: endereço do contrato
  Retorna: objeto com dados do contrato (investor, startup, amount, investorReturnPercent, durationDays, isActive, isInvested, totalRevenue, totalDistributed)

### Instruções Solana

#### initializeContract

Cria novo contrato de investimento entre investidor e startup
Accounts: contract, investor, startup, systemProgram
Args: amount (u6), investorReturnPercent (u8), durationDays (u6)

#### invest

Transfere tokens do investidor para vault do contrato
Accounts: contract, investor, vault, tokenProgram, systemProgram

#### recordRevenue

Registra receita e distribui automaticamente:

- 0.5% para Meraki (taxa da plataforma)
- % configurado para investidor
- Restante para startup
  Accounts: contract, startup, investor, meraki, tokenProgram, systemProgram
  Args: amount (u6)

#### mintInvestmentNft

Cria NFT representando o investimento realizado
Accounts: contract, investor, mint, tokenProgram, systemProgram

## Fluxos de Integração

### Autenticação

. Usuário acessa /signup
. Preenche formulário (nome, email, senha)
. Cliente chama authApi.signup()
. POST /users para backend
5. Backend valida dados
6. Hash da senha com Argon
7. Salva usuário no PostgreSQL
8. Retorna dados do usuário
9. Cliente redireciona para /login
0. Usuário insere credenciais
. Cliente chama authApi.login()
. POST /auth/login para backend
. Backend valida credenciais
. Gera JWT token
5. Token salvo no localStorage
6. Cliente redireciona para /dashboard

### Investimento

. Usuário conecta wallet (Phantom)
. Seleciona startup para investir
. Define valor do investimento
. Cliente chama contractFunctions.initializeContract()
5. Transação enviada para Solana
6. Contrato criado na blockchain
7. Retorna contractAddress e signature
8. Cliente chama investmentApi.create()
9. POST para backend com dados do contrato
0. Backend salva no PostgreSQL
. Investimento registrado

### Criação de Startup

. Usuário autenticado acessa /create-startup
. Preenche formulário (nome, descrição, categoria, meta, wallet)
. Cliente chama startupApi.create()
. POST /startups para backend
5. Backend valida dados
6. Salva startup no PostgreSQL
7. Retorna dados da startup criada
8. Cliente redireciona para página da startup

## Testes

### Testes da API

```powershell
curl -X POST http://localhost:8080/users -H "Content-Type: application/json" -d '{"full_name": "Test User", "email": "test@example.com", "password": "senha"}'

curl -X POST http://localhost:8080/auth/login -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "senha"}'
```

### Testes Frontend

. Acessar http://localhost:000/signup
. Criar conta com dados válidos
. Verificar redirecionamento para /login
. Fazer login
5. Verificar token no localStorage (F > Application > Local Storage)
6. Verificar redirecionamento para /dashboard

### Testes Blockchain

```javascript
import { getConnection, getProgramId } from "./lib/utils/solana";

const connection = getConnection();
const programId = getProgramId();

console.log("RPC:", connection.rpcEndpoint);
console.log("Program ID:", programId.toString());
```

### Verificar Banco de Dados

```sql
SELECT * FROM users WHERE email = 'test@example.com';
SELECT * FROM startups;
SELECT * FROM contracts;
SELECT * FROM investments;
```

## TypeScript Configuration

### src/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES00",
    "module": "CommonJS",
    "lib": ["es00"],
    "types": ["mocha", "chai", "node"],
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": false,
    "resolveJsonModule": true,
    "moduleResolution": "node0",
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist",
    "rootDir": "./",
    "ignoreDeprecations": "6.0"
  },
  "include": ["programs/tests/**/*.ts", "next.config.ts"],
  "exclude": ["node_modules", "client", "dist"]
}
```

### src/client/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES07",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "incremental": true,
    "module": "esnext",
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Troubleshooting

### Cannot connect to database

Verificar se PostgreSQL está rodando
Conferir DATABASE_URL no .env do server

### CORS blocked

Server deve estar em http://localhost:8080
CORS configurado no main.rs

### Wallet not found

Instalar Phantom Wallet
Configurar para Devnet

### Port already in use

Verificar processo usando a porta: netstat -ano | findstr :PORT
Matar processo: taskkill /PID <PID> /F

### Module not found no Client

Reinstalar dependências:

```powershell
cd src
Remove-Item -Recurse -Force node_modules
npm install
```

### sqlx not found

```powershell
cargo install sqlx-cli --no-default-features --features postgres
```

### Migrations falham

```powershell
docker exec meraki-postgres psql -U postgres -c "DROP DATABASE meraki_db"
docker exec meraki-postgres psql -U postgres -c "CREATE DATABASE meraki_db"
sqlx migrate run
```

## Scripts de Automação

### start-with-docker.ps

```powershell
Write-Host "Iniciando Meraki com Docker..."

docker start meraki-postgres >$null
if ($LASTEXITCODE -ne 0) {
    docker run -d --name meraki-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=meraki_db -p 5:5 postgres:
}

Start-Sleep -Seconds 

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'src\server\meraki_api_server'; cargo run --release"
Start-Sleep -Seconds 5
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'src\client'; npm run dev"
```

### setup-dependencies.ps

```powershell
cd src
npm install
npm install @solana/web.js @coral-xyz/anchor @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
```

## Comandos Docker

### Iniciar PostgreSQL

```powershell
docker run -d --name meraki-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=meraki_db -p 5:5 postgres:
```

### Parar container

```powershell
docker stop meraki-postgres
```

### Reiniciar container

```powershell
docker start meraki-postgres
```

### Remover container

```powershell
docker stop meraki-postgres
docker rm meraki-postgres
```

### Ver logs

```powershell
docker logs meraki-postgres
docker logs -f meraki-postgres
```

### Conectar ao banco

```powershell
docker exec -it meraki-postgres psql -U postgres -d meraki_db
```

### Backup

```powershell
docker exec meraki-postgres pg_dump -U postgres meraki_db > backup.sql
```

### Restaurar

```powershell
docker exec -i meraki-postgres psql -U postgres -d meraki_db < backup.sql
```

## Build de Produção

### Backend

```powershell
cd src/server/meraki_api_server
cargo build --release
```

### Frontend

```powershell
cd src
npm run build
npm start
```

### Contracts

```bash
anchor build
anchor deploy --provider.cluster devnet
```

## Deploy

### Backend (Render, Railway, Fly.io)

. Configurar variáveis de ambiente
. Configurar DATABASE_URL do PostgreSQL
. Executar cargo build --release
. Executar sqlx migrate run
5. Iniciar aplicação

### Frontend (Vercel, Netlify)

. Configurar variáveis NEXT*PUBLIC*\*
. Executar npm run build
. Deploy da pasta .next

### Contracts (Devnet/Mainnet)

```bash
anchor build
anchor deploy --provider.cluster mainnet-beta
```

## Checklist de Integração

Status de componentes:

- PostgreSQL: verificar se está rodando
- Rust API: verificar se compila e inicia sem erros
- Next.js Frontend: verificar se instala dependências e inicia
- Solana Devnet: verificar conexão com RPC
- Login/Signup: verificar fluxo completo
- Wallet Connection: verificar se Phantom conecta
- Documentação: manter atualizada

## Informações de Referência

Program ID (Devnet): 5jdU5SpLxidhessiSTiAeuATxh7sSHnWKvvVVDK7
RPC Endpoint: https://api.devnet.solana.com
Network: Devnet
Wallets Suportadas: Phantom, Solflare

## Ordem de Execução

. Iniciar PostgreSQL (Docker ou local)
. Executar migrations (sqlx migrate run)
. Iniciar backend (cargo run --release)
. Iniciar frontend (npm run dev)
5. Acessar http://localhost:000
6. Testar signup/login
7. Conectar wallet
8. Testar funcionalidades

## Comandos Úteis

### Database

```powershell
createdb meraki_db
dropdb meraki_db
psql -U postgres -d meraki_db
```

### Solana

```powershell
anchor build
anchor deploy --provider.cluster devnet
solana logs --url devnet 5jdU5SpLxidhessiSTiAeuATxh7sSHnWKvvVVDK7
```

### Desenvolvimento

```powershell
cd src && npm run dev
cd src/server/meraki_api_server && cargo run
npx tsc --noEmit
```
