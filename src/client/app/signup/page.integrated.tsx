"use client";

import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../lib/api';

// Definição das cores solicitadas
const COLORS = {
  BACKGROUND: '#00D9',
  INPUT_BG: '#0575',
  ACCENT: '#BDEF0',
  STROKE: '#6CE8',
  TEXT_WHITE: '#ffffff',
  ERROR: '#FF67',
};

const BACKGROUND_IMAGE_URL = '/logoMeraki.png';

const SimpleHeader = () => (
  <header style={{ backgroundColor: COLORS.BACKGROUND }} className="py- px-6 shadow-lg">
    <div className="max-w-7xl mx-auto">
      <h style={{ color: COLORS.ACCENT, fontSize: '.5rem', fontWeight: 700 }}>NodeHub</h>
    </div>
  </header>
);

export default function CadastroPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage('');
    setIsError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

    setIsLoading(true);
    
    try {
      await authApi.signup({
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
        wallet_public_key: walletAddress || undefined,
      });

      setMessage(`Conta criada com sucesso! Redirecionando para login...`);
      setIsError(false);
      
      setTimeout(() => {
        router.push('/login');
      }, 1000);

    } catch (err: any) {
      console.error('Erro ao criar conta:', err);
      setMessage(err.message || 'Erro ao criar conta. Tente novamente.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      setMessage('Iniciando conexão com a carteira Web...');
      setIsError(false);
      
      // Verificar se a Phantom está instalada
      if ('solana' in window) {
        const provider = (window as any).solana;
        if (provider?.isPhantom) {
          const resp = await provider.connect();
          setWalletAddress(resp.publicKey.toString());
          setMessage('Carteira conectada: ' + resp.publicKey.toString().slice(0, 8) + '...');
        }
      } else {
        setMessage('Por favor, instale a Phantom Wallet!');
        setIsError(true);
      }
    } catch (err: any) {
      console.error('Erro ao conectar carteira:', err);
      setMessage('Erro ao conectar carteira.');
      setIsError(true);
    }
  };

  return (
    <div 
        style={{ 
            minHeight: '00vh', 
            fontFamily: 'Inter, sans-serif',
            backgroundColor: COLORS.BACKGROUND,
            backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
        }}
    >
      <div 
          className="absolute inset-0" 
          style={{ 
              backgroundColor: COLORS.BACKGROUND, 
              opacity: 0. 
          }}
      ></div>

      <div style={{ position: 'relative', zIndex: 0 }}>
        <SimpleHeader />

        <div className="min-h-[calc(00vh-6px)] flex items-center justify-center py- px-">
          <div 
              className="w-full max-w-md space-y-6 p-8 rounded-xl shadow-xl"
              style={{ 
                  backgroundColor: 'rgba(5, 96, 7, 0.6)', 
                  border: `px solid ${COLORS.STROKE}` 
              }}
          >
            <div className="text-center space-y-">
              <h className="text-xl font-bold" style={{ color: COLORS.TEXT_WHITE }}>Crie sua Conta</h>
              <p style={{ color: COLORS.STROKE }}>Junte-se ao NodeHub</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-">
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
                  className="w-full px- py- border rounded-lg placeholder-gray-500 focus:outline-none focus:ring- transition"
                  placeholder="Seu nome"
                  required
                />
              </div>

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
                  className="w-full px- py- border rounded-lg placeholder-gray-500 focus:outline-none focus:ring- transition"
                  placeholder="seu@email.com"
                  required
                />
              </div>

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
                  className="w-full px- py- border rounded-lg placeholder-gray-500 focus:outline-none focus:ring- transition"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-" style={{ color: COLORS.TEXT_WHITE }}>
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{ backgroundColor: COLORS.INPUT_BG, borderColor: COLORS.STROKE, color: COLORS.TEXT_WHITE }}
                  className="w-full px- py- border rounded-lg placeholder-gray-500 focus:outline-none focus:ring- transition"
                  placeholder="Repita a senha"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleConnectWallet}
                style={{ backgroundColor: COLORS.STROKE, color: 'white' }}
                className="w-full py- text-sm font-semibold rounded-lg hover:opacity-85 transition"
              >
                {walletAddress ? '✓ Carteira Conectada' : 'Conectar Wallet (Opcional)'}
              </button>

              <button
                type="submit"
                disabled={isLoading}
                style={{ backgroundColor: COLORS.ACCENT, color: 'white', opacity: isLoading ? 0.6 : 1 }}
                className="w-full py- font-semibold rounded-lg hover:opacity-85 transition shadow-lg disabled:cursor-not-allowed"
              >
                {isLoading ? 'Criando conta...' : 'Criar Conta'}
              </button>
            </form>

            {message && (
              <div 
                className="text-center text-sm p- rounded-lg" 
                style={{ 
                  backgroundColor: isError ? COLORS.ERROR : '#0B98', 
                  color: COLORS.TEXT_WHITE 
                }}
              >
                {message}
              </div>
            )}

            <div className="text-center" style={{ color: COLORS.TEXT_WHITE }}>
              Já tem uma conta?{" "}
              <a href="/login" style={{ color: COLORS.ACCENT }} className="hover:underline">
                Fazer login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
