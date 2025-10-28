<<<<<<< Updated upstream
"use client";

import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
// Removidas importações desnecessárias (Button, Link) que não estavam sendo usadas no final do componente.
// Se você for usar elas, adicione-as de volta, mas remova os fragmentos de código Tailwind.

// --- INTERFACE DE DADOS ---

interface StartupData {
  nome: string;
  // Adicione outras propriedades da sua API aqui
}

// --- ESTILOS ---

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #010202; /* Fundo Escuro */
    color: #ffffff; /* Texto Branco */
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const StartupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: #010202;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #9d4edd;
  margin-bottom: 30px;
  text-align: center;
`;

const SaveButton = styled.button<{ $isEdited: boolean }>`
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.$isEdited ? 'pointer' : 'not-allowed')};
  font-size: 18px;
  font-weight: bold;
  color: white;
  transition: opacity 0.3s, transform 0.2s;
  background: linear-gradient(90deg, #9d4edd 0%, #ff69b4 100%);
  opacity: ${(props) => (props.$isEdited ? 1 : 0.5)};

  &:hover {
    ${(props) => (props.$isEdited ? 'transform: translateY(-2px);' : 'none')}
  }
`;

// Estilos dos Retângulos (Faixas de Conteúdo)
const RectangleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const RectangleItem = styled.div`
  background-color: #1a1a2e;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(157, 77, 237, 0.2); 
  border-left: 5px solid #ff69b4; 
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px); 
    box-shadow: 0 8px 25px rgba(157, 77, 237, 0.4);
  }
`;

const RectangleTitle = styled.h2`
  font-size: 28px;
  margin-top: 0;
  margin-bottom: 15px;
  background: linear-gradient(90deg, #9d4edd 0%, #ff69b4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

const RectangleContent = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #cccccc;
`;


// --- COMPONENTE PRINCIPAL (CORRIGIDO E UNIFICADO) ---

export default function Startup() {
  const id = "pegar o parametro da rota"; 

  const [data, setData] = useState<StartupData | undefined>(undefined);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  // Dados para os 8 retângulos (Categorias/Etapas)
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
  
  // Funções de API (ÚNICA IMPLEMENTAÇÃO)
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
      await fetch(`http://localhost:3000/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), 
      });
      setIsEdited(false);
      console.log("Startup salva com sucesso!");
    } catch (error) {
      console.error("Falha ao salvar startup:", error);
    }
  };

  useEffect(() => {
    fetchStartup();
  }, [id]); 

  return (
    <>
      <GlobalStyle />
      <StartupContainer>
        {/* Título usando o nome da startup ou um fallback */}
        <Title>🚀 {data?.nome || "Categorias da Meraki"}</Title>

        {/* Lista de Retângulos (Faixas) */}
        <RectangleList>
          {rectanglesData.map((item) => (
            <RectangleItem key={item.id}>
              {/* Extrai o título principal antes do ':' */}
              <RectangleTitle>{item.id}. {item.content.split(':')[0] || item.content}</RectangleTitle>
              <RectangleContent>
                {item.content}
              </RectangleContent>
            </RectangleItem>
          ))}
        </RectangleList>

        {/* Botão de Salvar/Edição */}
        <div style={{ marginBottom: '50px' }}>
          <SaveButton onClick={editStartup} $isEdited={isEdited} disabled={!isEdited}>
              Salvar Configurações
          </SaveButton>
        </div>
        
        {/* O conteúdo HTML/Tailwind abaixo foi removido do render final 
        porque estava solto no código e era proveniente da LandingPage (Tailwind) e não deste componente (Styled-Components).
        
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
        */}
      </StartupContainer>
    </>
  );
}
