"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
// Importações externas como 'Link' e 'Header' foram removidas/substituídas para manter o código autossuficiente e funcional.

// Definição das cores solicitadas para fácil referência e modificação
const COLORS = {
  BACKGROUND: '#092C4C', // Fundo Principal (Dark Blue/Teal)
  INPUT_BG: '#053752',   // Fundo dos Inputs (Slightly Lighter Blue)
  ACCENT: '#BD2EF0',     // Cor de Destaque Neon (Roxo)
  STROKE: '#62C2E8',     // Cor da Borda Neon (Azul)
  TEXT_WHITE: '#ffffff', // Texto em geral para Branco Puro
};

// --- Componente Placeholder Header (Simula a barra superior) ---
const SimpleHeader = () => (
  <header style={{ backgroundColor: COLORS.BACKGROUND }} className="py-4 px-6 shadow-lg">
    <div className="max-w-7xl mx-auto">
      <h2 style={{ color: COLORS.ACCENT, fontSize: '1.5rem', fontWeight: 700 }}>NodeHub</h2>
    </div>
  </header>
);
// --- FIM Componente Placeholder Header ---


export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState('');

  // Handler para atualizar o estado do formulário
  // Tipagem explícita de 'e' como ChangeEvent<HTMLInputElement>
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler para submissão do formulário
  // Tipagem explícita de 'e' como FormEvent
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulação de login
    console.log("Login:", formData);
    setMessage(`Tentativa de Login efetuada para: ${formData.email}. (Integração com API pendente)`);
    // TODO: Integrar com API (usar Firebase/Firestore se fosse um app real)
  };

  return (
    // Fundo Principal com a IMAGEM e a cor de fallback
    <div 
        style={{ 
            minHeight: '100vh', 
            fontFamily: 'Inter, sans-serif',
            backgroundColor: COLORS.BACKGROUND,
            // 1. APLICAÇÃO DA IMAGEM DE FUNDO
            backgroundImage: 'url(assets/login.jpeg)', // Usando o arquivo login.jpeg
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative', // Essencial para o overlay funcionar
        }}
    >
      {/* 2. OVERLAY PARA OPACIDADE: Cria uma camada escura de 40% de opacidade sobre a imagem. 
          Isso garante que a imagem fique 60% visível (100% - 40% = 60%). 
      */}
      <div 
          className="absolute inset-0" 
          style={{ 
              backgroundColor: COLORS.BACKGROUND, 
              opacity: 0.4 
          }}
      ></div>

      {/* Conteúdo Principal (Header e Formulário) - Z-Index 10 garante que o conteúdo fique acima do overlay */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <SimpleHeader />

        {/* Container que centraliza o formulário no meio da página */}
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12">
          <div 
              className="w-full max-w-md space-y-8 p-8 rounded-xl shadow-2xl"
              // Fundo mais claro e opaco (transparente). Borda com STROKE Neon.
              style={{ 
                  backgroundColor: 'rgba(35, 96, 137, 0.6)', 
                  border: `1px solid ${COLORS.STROKE}` 
              }}
          >
            <div className="text-center space-y-2">
              {/* Título em Branco Puro */}
              <h1 className="text-3xl font-bold" style={{ color: COLORS.TEXT_WHITE }}>Faça o Login</h1>
              
              {/* Subtítulo em Azul Neon (COLORS.STROKE) */}
              <p style={{ color: COLORS.STROKE }}>Bem-vindo de volta ao NodeHub</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                {/* Label em Branco Puro */}
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.TEXT_WHITE }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  // Cores do Input: Fundo #053752, Borda e texto Branco
                  style={{ backgroundColor: COLORS.INPUT_BG, borderColor: COLORS.STROKE, color: COLORS.TEXT_WHITE }}
                  className="w-full px-4 py-3 border rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-100 transition"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              {/* Senha Input */}
              <div>
                {/* Label em Branco Puro */}
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.TEXT_WHITE }}>
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  // Cores do Input: Fundo #053752, Borda e texto Branco
                  style={{ backgroundColor: COLORS.INPUT_BG, borderColor: COLORS.STROKE, color: COLORS.TEXT_WHITE }}
                  className="w-full px-4 py-3 border rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-100 transition"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Esqueceu Senha Link */}
              <div className="text-right">
                <a 
                  href="#" 
                  style={{ color: COLORS.STROKE }} // Azul Neon (STROKE)
                  className="hover:opacity-80 text-sm underline" 
                >
                  Esqueci minha senha
                </a>
              </div>

              {/* Botão Entrar (Roxo Neon - ACCENT) */}
              <button
                type="submit"
                style={{ backgroundColor: COLORS.ACCENT, color: 'white' }}
                className="w-full py-3 font-semibold rounded-lg hover:opacity-85 transition shadow-lg"
              >
                Entrar
              </button>
            </form>

            {/* Área de Mensagem (Feedback ao usuário) */}
            {message && (
              <div className="text-center text-sm p-3 rounded-lg" style={{ backgroundColor: COLORS.INPUT_BG, color: COLORS.TEXT_WHITE }}>
                  {message}
              </div>
            )}

            {/* Link para Criar conta */}
            <div className="text-center" style={{ color: COLORS.TEXT_WHITE }}>
              Não tem uma conta?{" "}
              {/* Roxo Neon (ACCENT) para o link de 'Criar conta' */}
              <a href="/signup" style={{ color: COLORS.ACCENT }} className="hover:underline">
                Criar conta
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
