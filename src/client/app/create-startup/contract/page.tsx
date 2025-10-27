"use client";

import React, { useState, useEffect } from 'react';

// Definição das cores atualizadas
const COLORS = {
  BACKGROUND: '#04352D', // Fundo Principal (Verde-Azulado Escuro)
  CARD_BG: '#092C4C',    // Cor de fundo dos cards e HEADER
  ACCENT: '#BD2EF0',     // Cor de Destaque Neon (Roxo) - Invest Now
  STROKE: '#62C2E8',     // Cor da Borda Neon (Azul)
  GREEN_TEXT: '#01F4CC', // Cor da Borda/Texto Verde Neon
  TEXT_WHITE: '#ffffff', // Texto em geral para Branco Puro
  BLACK_CARD: '#000000', // Cor do card de financiamento
  WHITE_GLOW: '#ffffff', // Nova cor para o contorno branco
};

// --- Componente de Cabeçalho/Header ---
const AppHeader = () => (
  <header 
    className="py-4 px-6 shadow-lg sticky top-0 z-50" 
    // Cor do Header mantida em #092C4C
    style={{ backgroundColor: COLORS.CARD_BG, borderBottom: `1px solid ${COLORS.ACCENT}1A` }}
  >
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      {/* Título/Logo NodeHub em Roxo Neon */}
      <div className="flex items-center space-x-3">
        {/* Usando a logo Group 13.png (40x40px) */}
        <img 
          src="/files/Group 13.png" 
          alt="NodeHub Logo" 
          className="h-10 w-10 object-contain"
          // Adicionar um brilho neon à imagem
          style={{ filter: `drop-shadow(0 0 5px ${COLORS.STROKE})` }} 
        />
        <h2 style={{ color: COLORS.TEXT_WHITE, fontSize: '1.5rem', fontWeight: 700 }}>
          NodeHub
        </h2>
      </div>
      
      {/* Placeholder para Links de Navegação */}
      <nav className="flex space-x-6">
        <a href="/" style={{ color: COLORS.TEXT_WHITE }} className="hover:text-gray-400 transition">Início</a>
        <a href="/explore" style={{ color: COLORS.TEXT_WHITE }} className="hover:text-gray-400 transition">Explorar</a>
        <a href="/login" style={{ color: COLORS.ACCENT }} className="font-semibold hover:opacity-80 transition">Login</a>
      </nav>
    </div>
  </header>
);

// --- Dados Mock para o Carrossel ---
const carouselCards = [
    { title: "Smart Contracts", desc: "Infraestrutura escalável para projetos descentralizados." },
    { title: "APIs e SDKs", desc: "Ferramentas robustas para desenvolvedores construírem no Solana." },
    { title: "Segurança Avançada", desc: "Protocolos de segurança de nível empresarial." },
    { title: "Velocidade Incomparável", desc: "Transações em milissegundos com custos mínimos." },
    { title: "Comunidade Forte", desc: "Conecte-se com a comunidade global de desenvolvedores Solana." },
    { title: "Suporte 24/7", desc: "Assistência técnica especializada sempre disponível." },
];

// --- Componente de Carrossel Simples (Autônomo) ---
const SimpleCarousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCards = 3; // Número de cards visíveis

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };
    
    const getTransform = () => {
      const cardWidth = 100 / visibleCards; 
      return `translateX(calc(-${currentIndex * cardWidth}% - ${currentIndex * 1.5}rem))`; 
    };
    
    return (
        <div className="relative overflow-hidden">
            {/* Flex container para os cards */}
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: getTransform() }}>
                {items.map((card, idx) => (
                    <div 
                        key={idx} 
                        className="flex-shrink-0 p-6 rounded-xl border-2 shadow-2xl transition-all duration-300 mx-3 hover:shadow-cyan-500/50"
                        style={{ 
                          width: `calc(100% / ${visibleCards} - 1.5rem)`, 
                          backgroundColor: COLORS.CARD_BG, 
                          borderColor: COLORS.STROKE,
                          marginRight: idx < items.length - 1 ? '1.5rem' : '0', 
                        }}
                    >
                      <div 
                        className="text-4xl mb-4" 
                        style={{ color: COLORS.ACCENT }}
                      >
                        {/* Ícone de Exemplo: Conexão de Nós */}
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.STROKE }}>
                        {card.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {card.desc}
                      </p>
                    </div>
                ))}
            </div>

            {/* Controles de navegação (setas) */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 rounded-full transition-opacity z-10 hover:opacity-80"
                style={{ backgroundColor: COLORS.CARD_BG, color: COLORS.ACCENT }}
            >
                {/* Ícone de Seta Esquerda */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 rounded-full transition-opacity z-10 hover:opacity-80"
                style={{ backgroundColor: COLORS.CARD_BG, color: COLORS.ACCENT }}
            >
                {/* Ícone de Seta Direita */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </div>
    );
};


// --- Componente Principal da Nova Página ---
export default function SkeletonPage() {
  return (
    // Fundo Principal com a nova cor #04352D
    <div 
        style={{ 
            minHeight: '100vh', 
            fontFamily: 'Inter, sans-serif',
            backgroundColor: COLORS.BACKGROUND,
            color: COLORS.TEXT_WHITE, // Garante que o texto seja branco por padrão
        }}
    >
      <AppHeader />

      {/* Hero Section: Título e Subtítulo */}
      <section className="py-24 px-8 max-w-7xl mx-auto flex items-center justify-between">
        {/* Lado Esquerdo: Logo em destaque */}
        <div className="flex-1 flex justify-start items-start">
            <img 
              src="/files/Group 13.png" 
              alt="NodeHub Logo Grande" 
              className="h-40 w-40 object-contain"
              style={{ filter: `drop-shadow(0 0 10px ${COLORS.STROKE})` }}
            />
        </div>

        {/* Lado Direito: Título e Subtítulo (alinhados à direita e mais para a direita) */}
        {/* Alterado max-w-2xl para max-w-4xl para empurrar o texto mais para a direita */}
        <div className="flex-1 text-right max-w-4xl ml-auto"> 
            <h1 className="text-7xl font-extrabold mb-2" style={{ color: COLORS.TEXT_WHITE }}>
              NodeHub
            </h1>
            <p className="text-2xl mt-2" style={{ color: COLORS.STROKE }}> 
              Powering the next generation of Solana infrastructure
            </p>
        </div>
      </section>

      {/* Seção do Carrossel de Cards */}
      <section className="py-12 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: COLORS.TEXT_WHITE }}>
          Nossos Destaques
        </h2>
        
        <SimpleCarousel items={carouselCards} />
        
      </section>
      
      {/* SEÇÃO 2: Cards Problem e The Startup (Ajustes de cor no Card The Startup) */}
      <section className="py-12 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card: Problem - Contorno Branco */}
            <div 
                className="p-8 rounded-xl border-2 hover:scale-[1.02] transition duration-300"
                style={{ 
                    backgroundColor: COLORS.CARD_BG, 
                    // Contorno/Borda Branca
                    borderColor: COLORS.WHITE_GLOW, 
                    // Sombra Branca Brilhante
                    boxShadow: `0 0 15px ${COLORS.WHITE_GLOW}50`,
                }}
            >
                <h3 className="text-3xl font-bold mb-4" style={{ color: COLORS.WHITE_GLOW }}> 
                    Problem
                </h3>
                <p className="text-lg text-gray-300"> 
                    Running and maintaining nodes on the Solana network is still expensive, complex, and time-consuming. Developers and validators face technical challenges from the initial synchronization process to continuous monitoring of performance and uptime. Each network update requires manual adjustments and advanced infrastructure knowledge, making node operation inaccessible to most Web3 teams. This scenario limits decentralization and slows down ecosystem growth, as many projects abandon running their own validators or RPCs due to the complexity and cost involved.
                </p>
            </div>

            {/* Card: The Startup - Contorno e Título em ROXO (COLORS.ACCENT) */}
            <div 
                className="p-8 rounded-xl border-2 hover:scale-[1.02] transition duration-300"
                style={{ 
                    backgroundColor: COLORS.CARD_BG, 
                    // Contorno Roxo
                    borderColor: COLORS.ACCENT, 
                    // Sombra Roxo
                    boxShadow: `0 0 15px ${COLORS.ACCENT}50`,
                }}
            >
                <h3 className="text-3xl font-bold mb-4" style={{ color: COLORS.ACCENT }}> {/* Título em Roxo */}
                    The Startup
                </h3>
                <p className="text-lg text-gray-300"> 
                    NodeHub was created to simplify Solana node operations. It is an infrastructure platform that allows any team to run, monitor, and scale Solana nodes with a single click. The system automates deployment, updates, and observability, integrating real-time metrics, intelligent alerts, and detailed logs in a unified dashboard. Built upon Solana’s high-performance architecture, NodeHub delivers an optimized experience for validators, RPC providers, and dApp developers. Our mission is to remove the technical barriers that hinder Solana’s growth, making node management as simple and accessible as deploying an app to the cloud.
                </p>
            </div>
        </div>
      </section>

      {/* SEÇÃO 3: Card Retangular de Financiamento - Legendas em Branco */}
      <section className="py-12 px-8 max-w-7xl mx-auto">
        <div 
            // Aumento de padding para maior altura e largura percebida
            className="p-12 rounded-xl shadow-2xl"
            style={{ 
                backgroundColor: COLORS.BLACK_CARD, 
                // Usando a nova cor verde para a borda
                border: `2px solid ${COLORS.GREEN_TEXT}`, 
                boxShadow: `0 0 25px ${COLORS.GREEN_TEXT}50`, // Sombra verde
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
                
                {/* Coluna 1: Requested amount (Esquerda) - Legendas em Branco */}
                <div className="text-left">
                    <p className="text-lg font-semibold uppercase" style={{ color: COLORS.TEXT_WHITE }}>Requested amount</p> {/* Cor Branca */}
                    {/* Cor verde neon */}
                    <h4 className="text-5xl font-extrabold mt-1" style={{ color: COLORS.GREEN_TEXT }}>
                        USD 30.000
                    </h4>
                    <p className="text-base" style={{ color: COLORS.TEXT_WHITE }}>
                        In pre-seed funding {/* Cor Branca */}
                    </p>
                </div>

                {/* Coluna 2: Equity offered (Centro) - Legendas em Branco */}
                <div className="text-center">
                    <p className="text-lg font-semibold uppercase" style={{ color: COLORS.TEXT_WHITE }}>Equity offered</p> {/* Cor Branca */}
                    {/* Cor verde neon */}
                    <h4 className="text-5xl font-extrabold mt-1" style={{ color: COLORS.GREEN_TEXT }}>
                        8%
                    </h4>
                    <p className="text-base" style={{ color: COLORS.TEXT_WHITE }}>
                        Ownership stake {/* Cor Branca */}
                    </p>
                </div>

                {/* Coluna 3: Botões de Ação (Direita) - Espaçamento vertical ajustado */}
                <div className="flex flex-col space-y-5 md:items-end md:text-right"> 
                    
                    {/* Botão 1: INVEST NOW (Roxo Sólido) */}
                    <button 
                        // Aumento de tamanho e padding do botão
                        className="w-full md:w-auto px-8 py-4 text-lg font-bold rounded-lg uppercase transition duration-300 transform hover:scale-[1.05] shadow-lg"
                        style={{ 
                            backgroundColor: COLORS.ACCENT, 
                            color: COLORS.BLACK_CARD,
                            boxShadow: `0 0 15px ${COLORS.ACCENT}`,
                        }}
                    >
                        INVEST NOW
                    </button>

                    {/* Botão 2: VIEW FULL CONTRACT (Borda Verde) */}
                    <button 
                        // Aumento de tamanho e padding do botão
                        className="w-full md:w-auto px-8 py-4 text-lg font-bold rounded-lg uppercase border-2 transition duration-300 transform hover:scale-[1.05]"
                        style={{ 
                            backgroundColor: 'transparent',
                            color: COLORS.GREEN_TEXT,
                            borderColor: COLORS.GREEN_TEXT,
                            boxShadow: `0 0 10px ${COLORS.GREEN_TEXT}50`,
                        }}
                    >
                        VIEW FULL CONTRACT
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* Espaço Vazio para Conteúdo Adicional */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="mt-12 p-8 border-dashed border-2 rounded-lg text-center" style={{ borderColor: COLORS.STROKE, color: COLORS.TEXT_WHITE }}>
            <p>Adicione mais seções aqui</p>
        </div>
      </section>

    </div>
  );
}
