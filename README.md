<<<<<<< Updated upstream
<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Solana_logo.png" width="120" alt="Meraki Logo">
</p>

<h1 align="center">Meraki</h1>

<p align="center">
  <strong>Web3 Investment Platform for Startups in the Solana Ecosystem</strong>
</p>

<p align="center">
  <a href="#">Live Demo</a> |
  <a href="#">Docs</a> |
  <a href="#">Project Overview</a> |
  <a href="#">Join our Community</a>
</p>

<p align="center">
  <img src="https://github.com/yourusername/meraki/blob/main/assets/preview.png" alt="Meraki Screenshot" width="800">
</p>

---

## Badges
![Solana](https://img.shields.io/badge/Solana-0A0A0A?style=flat-square&logo=solana)
![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

---

## Table of Contents
- [Introduction](#introduction)
- [Problem & Solution](#problem--solution)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup & Installation](#setup--installation)
- [Using in Production](#using-in-production)
- [Roadmap](#roadmap)

---

## Introduction
**Meraki** is a Web3 platform built within the **Solana ecosystem**, designed to connect **emerging startups** with **investors** who want to support innovative projects transparently, traceably, and securely.

Our mission is to **simplify early-stage investments**, removing bureaucracy and providing a **trustless environment** where entrepreneurs can share their ideas and investors can safely support them — all recorded **on-chain**.

Each investment generates a **tracking NFT**, which serves as a **proof of investment** and a **trust token**. This NFT visually evolves as the startup achieves its milestones, making the process **transparent, gamified, and engaging**.

---

## Problem & Solution

### Problem
Early-stage startup investments are often opaque, slow, and risky. Investors struggle to verify progress, and startups waste time on bureaucracy instead of growth.

### Solution
Meraki provides a transparent, gamified, and secure investment platform built on Solana. Each investment generates a dynamic NFT tracking the startup’s milestones, creating a **trustless, verifiable, and engaging experience**.

---

## Key Features

- **Total Transparency** — Every investment and milestone is recorded on the **Solana blockchain**.  
- **Gamified Trust System** — Dynamic **NFTs evolve visually** as startups progress.  
- **Fast & Low-Cost Transactions** — Powered by Solana’s **high-speed, low-fee** infrastructure.  
- **Direct Interaction** — Enables **peer-to-peer communication** between investors and founders.  
- **Secure Smart Contracts** — Investment logic built using **Anchor Framework** on Solana.  
- **Tracking NFTs** — Each NFT represents an investment and evolves with milestones.  

<p align="center">
  <img src="assets/demo.gif" alt="Meraki Demo" width="800">
</p>

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js, TypeScript, Solana Wallet Adapter |
| **Backend** | Node.js, Express, PostgreSQL |
| **Blockchain** | Solana, Anchor, Rust |
| **Integration** | Web3.js, Metaplex, Phantom Wallet |

---

## Architecture
Frontend (Next.js + TypeScript)
│
▼
Backend (Node.js + Express + PostgreSQL)
│
▼
Solana Blockchain (Anchor + Rust)
│
▼
Metaplex NFT (dynamic evolution)

yaml
Copiar código
- Users connect wallets via **Phantom / Solana Wallet Adapter**  
- Investments trigger **smart contract execution**  
- Smart contract **mints a tracking NFT**  
- NFT evolves visually when milestones are completed  

---

## Setup & Installation

```bash
# Clone repository
git clone https://github.com/yourusername/meraki.git
cd meraki

# Install dependencies
npm install

# Run frontend
npm run dev

# Run backend server
npm run server
Connect your Solana wallet (Phantom, Solflare) to start investing or creating projects.
```

## Using in Production
- Ensure Solana mainnet connection
- Deploy smart contracts via Anchor
- Connect frontend to backend API
- Mint NFTs through Metaplex
- Track startup milestones and update NFTs dynamically
  
## Roadmap
- Multi-chain support (Ethereum, Polygon)
- Advanced analytics dashboard for investors
- Social features for startup communities
- Gamification enhancements for NFTs
- Automated milestone verification via oracles
=======
# Plataforma de Investimentos Web3 para Startups no Ecossistema Solana
<img width="395" height="119" alt="Meraki (2)" src="https://github.com/user-attachments/assets/32069a6d-76c1-4020-9a67-564bb90b6171" />


## NodeHub

## Integrantes:

- <a href="https://www.linkedin.com/in/ana-cristina-jardim/">Ana Cristina</a>
- <a href="https://www.linkedin.com/in/ana-júlia-ribeiro/">Ana Julia Ribeiro</a> 
- <a href="https://www.linkedin.com/in/emanuelly-dias-2a0480305/">Emanuelly Dias</a>
- <a href="https://www.linkedin.com/in/mirela-bianchi-608601254/">Mirela Bianchi</a>
- <a href="https://www.linkedin.com/in/nicolezanin/">Nicole Zanin</a>

### Instrutores

- <a href="https://www.linkedin.com/in/vict0rcarvalh0/">Vitor Carvalho</a> <br>
<br>

## Descrição

O NodeHub é uma plataforma Web3 desenvolvida no ecossistema Solana, criada para conectar startups emergentes com investidores interessados em apoiar projetos inovadores de forma **transparente, rastreável e segura.**
A solução **nasce da necessidade de eliminar a burocracia dos investimentos iniciais,** oferecendo um ambiente descentralizado e confiável, onde startups podem apresentar suas ideias e investidores podem apoiar com segurança, tudo registrado na blockchain.

No NodeHub, cada investimento é feito por meio de um smart contract (contrato inteligente), e o investidor recebe um NFT de rastreamento, que funciona como prova de investimento e token de confiança. Esse NFT evolui visualmente à medida que a startup alcança suas metas, tornando o processo mais gamificado e transparente.

### Principais Diferenciais

-  **Transparência total:** Todos os investimentos e atualizações são registrados na blockchain Solana. <br>
- **Gamificação:** NFTs dinâmicos evoluem conforme a startup atinge marcos definidos. <br>
- **Velocidade e baixo custo:** Transações rápidas e com taxas mínimas, graças à infraestrutura da Solana. <br>
- **Relação direta:** Comunicação sem intermediários entre investidores e empreendedores. <br>

### 🎥 Demonstração
Vídeo de Demonstração: (link a ser inserido) 


## 📁 Estrutura de Pastas

A seguir está a organização geral do repositório Meraki, contendo todos os diretórios e suas respectivas finalidades no desenvolvimento da plataforma.

### Detalhes das Principais Pastas

**docs/** → Contém toda a documentação do projeto, incluindo diagramas, manual técnico e documentação da API.

**src/client/** → Aplicação frontend desenvolvida em Next.js, com integração ao Solana Wallet Adapter.

**src/server/** → Backend em Node.js, responsável pela lógica da API, comunicação com o banco e autenticação.

**src/program/** → Programa on-chain construído com o Anchor Framework, contendo instruções e estados para gerenciamento dos investimentos na blockchain Solana.

## 🗃 Histórico de lançamentos

*0.5.0 - XX/XX/2025* <br>
*0.4.0 - XX/XX/2025* <br>
*0.3.0 - XX/XX/2025* <br>
*0.2.0 - XX/XX/2025* <br>
*0.1.0 - XX/XX/2025* <br>
>>>>>>> Stashed changes
