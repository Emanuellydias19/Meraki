"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../lib/api';

// Definição das cores solicitadas para fácil referência e modificação
const COLORS = {
  BACKGROUND: '#09CC', // Fundo Principal (Dark Blue/Teal)
  INPUT_BG: '#0575',   // Fundo dos Inputs (Slightly Lighter Blue)
  ACCENT: '#BDEF0',     // Cor de Destaque Neon (Roxo)
  STROKE: '#6CE8',     // Cor da Borda Neon (Azul)
  TEXT_WHITE: '#ffffff', // Texto em geral para Branco Puro
};

// --- Componente Placeholder Header (Simula a barra superior) ---
const SimpleHeader = () => (
  <header style={{ backgroundColor: COLORS.BACKGROUND }} className="py- px-6 shadow-lg">
    <div className="max-w-7xl mx-auto">
      <h style={{ color: COLORS.ACCENT, fontSize: '.5rem', fontWeight: 700 }}>NodeHub</h>
    </div>
  </header>
);
// --- FIM Componente Placeholder Header ---


export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handler para atualizar o estado do formulário
  // Tipagem explícita de 'e' como ChangeEvent<HTMLInputElement>
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(''); // Limpar erro ao digitar
  };

  // Handler para submissão do formulário
  // Tipagem explícita de 'e' como FormEvent
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      // Chamar API de login
      const response = await authApi.login({
        email: formData.email,
        password: formData.password,
      });

      setMessage(`Login realizado com sucesso!`);
      
      // Redirecionar para dashboard após  segundo
      setTimeout(() => {
        router.push('/dashboard');
      }, 000);

    } catch (err: any) {
      console.error("Erro ao fazer login:", err);
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Fundo Principal com a IMAGEM e a cor de fallback
    <div 
        style={{ 
            minHeight: '00vh', 
            fontFamily: 'Inter, sans-serif',
            backgroundColor: COLORS.BACKGROUND,
            // . APLICAÇÃO DA IMAGEM DE FUNDO
            backgroundImage: 'url(/login.jpeg)', // Usando o arquivo login.jpeg
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative', // Essencial para o overlay funcionar
        }}
    >
      {/* . OVERLAY PARA OPACIDADE: Cria uma camada escura de 0% de opacidade sobre a imagem. 
          Isso garante que a imagem fique 60% visível (00% - 0% = 60%). 
      */}
      <div 
          className="absolute inset-0" 
          style={{ 
              backgroundColor: COLORS.BACKGROUND, 
              opacity: 0. 
          }}
      ></div>

      {/* Conteúdo Principal (Header e Formulário) - Z-Index 0 garante que o conteúdo fique acima do overlay */}
      <div style={{ position: 'relative', zIndex: 0 }}>
        <SimpleHeader />

        {/* Container que centraliza o formulário no meio da página */}
        <div className="min-h-[calc(00vh-6px)] flex items-center justify-center py-">
          <div 
              className="w-full max-w-md space-y-8 p-8 rounded-xl shadow-xl"
              // Fundo mais claro e opaco (transparente). Borda com STROKE Neon.
              style={{ 
                  backgroundColor: 'rgba(5, 96, 7, 0.6)', 
                  border: `px solid ${COLORS.STROKE}` 
              }}
          >
            <div className="text-center space-y-">
              {/* Título em Branco Puro */}
              <h className="text-xl font-bold" style={{ color: COLORS.TEXT_WHITE }}>Faça o Login</h>
              
              {/* Subtítulo em Azul Neon (COLORS.STROKE) */}
              <p style={{ color: COLORS.STROKE }}>Bem-vindo de volta ao NodeHub</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                {/* Label em Branco Puro */}
                <label className="block text-sm font-medium mb-" style={{ color: COLORS.TEXT_WHITE }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  // Cores do Input: Fundo #0575, Borda e texto Branco
                  style={{ backgroundColor: COLORS.INPUT_BG, borderColor: COLORS.STROKE, color: COLORS.TEXT_WHITE }}
                  className="w-full px- py- border rounded-lg placeholder-gray-500 focus:outline-none focus:ring- focus:ring-opacity-00 transition"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              {/* Senha Input */}
              <div>
                {/* Label em Branco Puro */}
                <label className="block text-sm font-medium mb-" style={{ color: COLORS.TEXT_WHITE }}>
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  // Cores do Input: Fundo #0575, Borda e texto Branco
                  style={{ backgroundColor: COLORS.INPUT_BG, borderColor: COLORS.STROKE, color: COLORS.TEXT_WHITE }}
                  className="w-full px- py- border rounded-lg placeholder-gray-500 focus:outline-none focus:ring- focus:ring-opacity-00 transition"
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
                disabled={isLoading}
                style={{ backgroundColor: COLORS.ACCENT, color: 'white', opacity: isLoading ? 0.6 :  }}
                className="w-full py- font-semibold rounded-lg hover:opacity-85 transition shadow-lg disabled:cursor-not-allowed"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            {/* Área de Mensagem de Erro */}
            {error && (
              <div className="text-center text-sm p- rounded-lg" style={{ backgroundColor: '#DC66', color: COLORS.TEXT_WHITE }}>
                  {error}
              </div>
            )}

            {/* Área de Mensagem de Sucesso */}
            {message && (
              <div className="text-center text-sm p- rounded-lg" style={{ backgroundColor: '#0B98', color: COLORS.TEXT_WHITE }}>
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
