"use client";

import React, { ChangeEvent, useState } from 'react';

// Definição das cores solicitadas
const COLORS = {
  BACKGROUND: '#00D9', // Fundo Principal (Dark Blue/Teal)
  INPUT_BG: '#0575',   // Fundo dos Inputs (Slightly Lighter Blue)
  ACCENT: '#BDEF0',     // Cor de Destaque Neon (Roxo)
  STROKE: '#6CE8',     // Cor da Borda Neon (Azul)
  TEXT_WHITE: '#ffffff', // Texto em geral para Branco Puro
  ERROR: '#FF67',      // Vermelho para feedback de erro
};

// --- URL DA IMAGEM DE FUNDO (PONTO DE ALTERAÇÃO) ---
const BACKGROUND_IMAGE_URL = '/logoMeraki.png'; 
// --- FIM URL IMAGEM DE FUNDO ---


// --- Componente Placeholder Header (Simula a barra superior) ---
const SimpleHeader = () => (
  <header style={{ backgroundColor: COLORS.BACKGROUND }} className="py- px-6 shadow-lg">
    <div className="max-w-7xl mx-auto">
      <h style={{ color: COLORS.ACCENT, fontSize: '.5rem', fontWeight: 700 }}>NodeHub</h>
    </div>
  </header>
);
// --- FIM Componente Placeholder Header ---


export default function CadastroPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Handler para atualizar o estado do formulário
  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage('');
    setIsError(false);
  };


  // Handler para submissão do formulário
  /**
   * @param {React.FormEvent} e
   */
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // --- Validação ---
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setMessage('Por favor, preencha todos os campos.');
        setIsError(true);
        return;
    }

    if (formData.password.length < 6) {
        setMessage('A senha deve ter no mínimo 6 caracteres.');
        setIsError(true);
        return;
    }
    
    if (formData.password !== formData.confirmPassword) {
        setMessage('A senha e a confirmação de senha não coincidem.');
        setIsError(true);
        return;
    }

    // --- Simulação de Cadastro (Sucesso) ---
    console.log("Cadastro enviado:", formData);
    setMessage(`Conta criada com sucesso para: ${formData.email}. Bem-vindo(a), ${formData.name}!`);
    setIsError(false);
    // TODO: Integrar com Firebase Auth aqui.
  };

  // Handler para o botão Connect Wallet
  const handleConnectWallet = () => {
    setMessage('Iniciando conexão com a carteira Web...');
    setIsError(false);
    console.log('Connect Wallet clicked');
  };

  return (
    // Fundo Principal com a IMAGEM e a cor de fallback (BACKGROUND: #00D9)
    <div 
        style={{ 
            minHeight: '00vh', 
            fontFamily: 'Inter, sans-serif',
            backgroundColor: COLORS.BACKGROUND,
            // . APLICAÇÃO DA IMAGEM DE FUNDO
            backgroundImage: `url(${BACKGROUND_IMAGE_URL})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative', 
        }}
    >
      {/* . OVERLAY PARA OPACIDADE */}
      <div 
          className="absolute inset-0" 
          style={{ 
              backgroundColor: COLORS.BACKGROUND, 
              opacity: 0. 
          }}
      ></div>

      {/* Conteúdo Principal (Header e Formulário) */}
      <div style={{ position: 'relative', zIndex: 0 }}>
        <SimpleHeader />

        {/* Container que centraliza o formulário no meio da página */}
        <div className="min-h-[calc(00vh-6px)] flex items-center justify-center py-">
          <div 
              className="w-full max-w-xl space-y-6 p-8 rounded-xl shadow-xl" 
              // Card com fundo opaco e borda neon
              style={{ 
                  backgroundColor: 'rgba(5, 96, 7, 0.6)', 
                  border: `px solid ${COLORS.STROKE}` 
              }}
          >
            <div className="text-center space-y-">
              {/* Título de Cadastro */}
              <h className="text-xl font-bold" style={{ color: COLORS.TEXT_WHITE }}>Crie sua Conta</h>
              
              {/* Subtítulo */}
              <p style={{ color: COLORS.STROKE }}>Junte-se ao NodeHub e gerencie sua infraestrutura Solana.</p>
            </div>

            {/* Mensagem de Feedback */}
            {message && (
                <div 
                    className="text-center text-sm p- rounded-lg font-medium" 
                    style={{ 
                        backgroundColor: isError ? COLORS.ERROR + '0' : COLORS.STROKE + '0', 
                        color: isError ? COLORS.ERROR : COLORS.STROKE,
                        border: `px solid ${isError ? COLORS.ERROR : COLORS.STROKE}`
                    }}
                >
                    {message}
                </div>
            )}


            <form onSubmit={handleSubmit} className="space-y-">
              {/* . Nome Completo Input */}
              <div>
                <label className="block text-sm font-medium mb-" style={{ color: COLORS.TEXT_WHITE }}>
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ backgroundColor: COLORS.INPUT_BG, borderColor: COLORS.STROKE, color: COLORS.TEXT_WHITE }}
                  className="w-full px- py- border rounded-lg placeholder-gray-500 focus:outline-none focus:ring- focus:ring-opacity-00 transition"
                  placeholder="Seu nome"
                  required
                />
              </div>
              
              {/* . Email Input */}
              <div>
                <label className="block text-sm font-medium mb-" style={{ color: COLORS.TEXT_WHITE }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ backgroundColor: COLORS.INPUT_BG, borderColor: COLORS.STROKE, color: COLORS.TEXT_WHITE }}
                  className="w-full px- py- border rounded-lg placeholder-gray-500 focus:outline-none focus:ring- focus:ring-opacity-00 transition"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              {/* . Senha Input */}
              <div>
                <label className="block text-sm font-medium mb-" style={{ color: COLORS.TEXT_WHITE }}>
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ backgroundColor: COLORS.INPUT_BG, borderColor: COLORS.STROKE, color: COLORS.TEXT_WHITE }}
                  className="w-full px- py- border rounded-lg placeholder-gray-500 focus:outline-none focus:ring- focus:ring-opacity-00 transition"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>
              
              {/* . Confirme Sua Senha Input */}
              <div>
                <label className="block text-sm font-medium mb-" style={{ color: COLORS.TEXT_WHITE }}>
                  Confirme sua senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{ backgroundColor: COLORS.INPUT_BG, borderColor: COLORS.STROKE, color: COLORS.TEXT_WHITE }}
                  className="w-full px- py- border rounded-lg placeholder-gray-500 focus:outline-none focus:ring- focus:ring-opacity-00 transition"
                  placeholder="Repita sua senha"
                  required
                />
              </div>

              {/* Botão CADASTRAR (Roxo Neon - ACCENT) */}
              <button
                type="submit"
                style={{ backgroundColor: COLORS.ACCENT, color: COLORS.BACKGROUND }}
                className="w-full py- font-semibold rounded-lg hover:opacity-85 transition shadow-lg mt-6"
              >
                CADASTRAR
              </button>
            </form>

            {/* Separador Opcional */}
            <div className="flex items-center space-x-">
                <div className=".flex-grow border-t" style={{ borderColor: COLORS.STROKE + '50' }}></div>
                <span className="text-sm font-light" style={{ color: COLORS.STROKE }}>OU</span>
                <div className=".flex-grow border-t" style={{ borderColor: COLORS.STROKE + '50' }}></div>
            </div>

            {/* BOTÃO CONECTAR WALLET */}
            <button
                type="button"
                onClick={handleConnectWallet}
                style={{ 
                    backgroundColor: 'transparent',
                    color: COLORS.ACCENT,
                    border: `px solid ${COLORS.ACCENT}`,
                    boxShadow: `0 0 0px ${COLORS.ACCENT}80`,
                }}
                className="w-full py- font-semibold rounded-lg hover:opacity-85 transition shadow-lg"
            >
                CONECTAR WALLET
            </button>


            {/* Link para Fazer Login */}
            <div className="text-center pt-" style={{ color: COLORS.TEXT_WHITE }}>
              Já tem uma conta?{" "}
              <a href="/login" style={{ color: COLORS.STROKE }} className="hover:underline">
                Fazer Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
