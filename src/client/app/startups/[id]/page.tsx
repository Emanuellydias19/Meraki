"use client";

import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components'; // Importa styled-components
import { Button } from "@/components/ui";
import Link from "next/link";
import Slider from "react-slick";

// --- ESTILOS ---

// 1. Estilos globais
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #010202; /* Fundo Escuro */
    color: #ffffff; /* Texto Branco */
    font-family: 'Inter', sans-serif;
    margin: 0; /* Remove margem padrão do body */
    padding: 0;
  }
`;

// 2. Container principal
const StartupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px; /* Padding vertical e horizontal */
  min-height: 100vh;
  background-color: #010202;
  width: 100%;
  box-sizing: border-box;
`;

// 3. Estilo do Título
const Title = styled.h1`
  font-size: 36px;
  color: #9d4edd; /* Cor de destaque roxa */
  margin-bottom: 30px;
  text-align: center;
`;

// 4. Estilo do Botão Salvar (Mantido por referência, embora não usado no render)
const SaveButton = styled.button<{ $isEdited: boolean }>`
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.$isEdited ? 'pointer' : 'not-allowed')};
  font-size: 18px;
  font-weight: bold;
  color: white;
  transition: opacity 0.3s, transform 0.2s;
  
  /* Gradiente base (roxo para magenta) */
  background: linear-gradient(90deg, #9d4edd 0%, #ff69b4 100%);
  
  /* Desabilitado se não houver edição */
  opacity: ${(props) => (props.$isEdited ? 1 : 0.5)};

  &:hover {
    ${(props) => (props.$isEdited ? 'transform: translateY(-2px);' : 'none')}
  }
`;

// --- NOVOS ESTILOS PARA OS RETÂNGULOS ---

// Contêiner para a lista de retângulos
const RectangleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px; /* Espaço entre os retângulos */
  width: 100%;
  max-width: 800px; /* Limita a largura para melhor leitura */
  margin-top: 20px;
`;

// Estilo de cada retângulo
const RectangleItem = styled.div`
  background-color: #1a1a2e; /* Fundo do retângulo ligeiramente mais claro que o fundo */
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(157, 77, 237, 0.2); /* Sombra suave roxa */
  border-left: 5px solid #ff69b4; /* Linha de destaque na lateral */
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px); /* Efeito de elevação ao passar o mouse */
    box-shadow: 0 8px 25px rgba(157, 77, 237, 0.4);
  }
`;

// Estilo do Título do Retângulo (O número)
const RectangleTitle = styled.h2`
  font-size: 28px;
  margin-top: 0;
  margin-bottom: 15px;
  
  /* Gradiente no texto do título */
  background: linear-gradient(90deg, #9d4edd 0%, #ff69b4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent; /* Fallback */
`;

// Estilo do Conteúdo do Retângulo
const RectangleContent = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #cccccc; /* Cor de texto mais suave */
`;


// --- COMPONENTE PRINCIPAL ---

const Startup = () => {
    // Estado de exemplo (mantido do código original)
    const [isEdited, setIsEdited] = useState(false); 

    // Lista de dados para os 8 retângulos
    const rectanglesData = [
        { id: 1, content: "Business Model: Definição clara de como a startup irá gerar receita." },
        { id: 2, content: "Finance: Estruturação financeira e planejamento de fluxo de caixa." },
        { id: 3, content: "Games" },
        { id: 4, content: "Tech/Infraestrutura" },
        { id: 5, content: "Estratégia de Crescimento" },
        { id: 6, content: "Health" },
        { id: 7, content: "Education" },
        { id: 8, content: "Sustainability" },
    ];
    return (
        <>
            <GlobalStyle />
            <StartupContainer>
                <Title>🚀 Jornada da Startup</Title>

                {/* Lista de Retângulos */}
                <RectangleList>
                    {rectanglesData.map((item) => (
                        <RectangleItem key={item.id}>
                            <RectangleTitle>{item.id}. Etapa</RectangleTitle>
                            <RectangleContent>
                                {item.content}
                            </RectangleContent>
                        </RectangleItem>
                    ))}
                </RectangleList>

                {/* Botão de Exemplo (Adicionei uma separação para melhor visualização) */}
                <div style={{ marginTop: '50px' }}>
                    <SaveButton $isEdited={isEdited}>
                        Salvar Configurações
                    </SaveButton>
                </div>
            </StartupContainer>
        </>
    );
};

export default Startup();


 <div className="flex gap-4">
            <Link href="/explore" passHref>
              <Button className="px-8 py-3 rounded-lg font-semibold bg-accent text-white hover:opacity-90 transition-opacity">
                Explorar Startups
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button className="px-8 py-3 rounded-lg font-semibold border-2 border-accent text-accent hover:bg-accent/10 transition-colors">
                Publicize your Startup
              </Button>
            </Link>
          </div>

// --- INTERFACE E LÓGICA DO COMPONENTE ---

interface StartupData {
  nome: string;
  // ... outras propriedades
}

export default function Startup() {
  const id = "pegar o parametro da rota"; 

  const [data, setData] = useState<StartupData | undefined>(undefined);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  // ... (funções fetchStartup e editStartup - a lógica permanece a mesma)

  async function fetchStartup() {
    try {
      const response = await fetch(`http://localhost:3000/fetch/${id}`);
      if (!response.ok) throw new Error(`Erro de HTTP: ${response.status}`);
      const result: StartupData = await response.json();
      setData(result);
      setIsEdited(false);
    } catch (error) {
      console.error("Falha ao buscar startup:", error);
    }
  }

  async function editStartup() {
    if (!isEdited || !data) return;
    try {
      const response = await fetch(`http://localhost:3000/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), 
      });
      if (response.ok) {
        setIsEdited(false);
        console.log("Startup salva com sucesso!");
      }
    } catch (error) {
      console.error("Falha ao salvar startup:", error);
    }
  }

  useEffect(() => {
    fetchStartup();
  }, [id]);

  return (
    <>
      {/* 5. Injeta estilos globais (se necessário, ou use o global.css) */}
      <GlobalStyle /> 
      
      {/* 6. Usa o componente estilizado */}
      <StartupContainer>
        <Title>{data?.nome}</Title>

        {/* 7. Passa o estado isEdited para controlar o estilo do botão */}
        <SaveButton onClick={editStartup} $isEdited={isEdited} disabled={!isEdited}>
            Salvar
        </SaveButton>
        
        {/* Você precisaria de inputs aqui para que isEdited se torne true */}
        {/* Exemplo: 
        <input 
          type="text" 
          value={data?.nome || ''} 
          onChange={(e) => {
            setData(prev => ({ ...prev, nome: e.target.value }));
            setIsEdited(true);
          }}
        />
        */}
      </StartupContainer>
    </>
  );
}
