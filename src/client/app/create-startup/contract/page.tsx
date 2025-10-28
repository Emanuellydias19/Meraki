"use client";

import Image from 'next/image';
import React, { useState } from 'react';

// Updated Color Definitions
const COLORS = {
  BACKGROUND: '#04352D', // Main Background (Dark Teal)
  CARD_BG: '#092C4C',    // Card and HEADER Background
  PRIMARY_ACCENT: '#01F4CC', // MAIN ACCENT: Neon Green (#01F4CC) - Used for Main Modal Border, Funding Card Values, and Modal Accept Button
  SECONDARY_ACCENT: '#BD2EF0', // SECONDARY ACCENT: Neon Purple (#BD2EF0) - Used for Startup Card, INVEST NOW Button, and Carousel Icons
  STROKE: '#62C2E8',     // Neon Border Color (Blue) - Used for internal card values and general stroke borders
  TEXT_WHITE: '#ffffff', // General Text to Pure White (Used for all titles and labels now)
  BLACK_CARD: '#000000', // Funding card background
  INNER_CARD_BG: '#09444C', // Modal Inner Card Background
};

// --- Navigation Simulation Function ---
const simulateNavigation = (path: string) => {
  console.log(`Simulating navigation to: ${path}`);
};

// =================================================================
// 🚀 CONTRACT POP-UP (MODAL) - NEW INTERACTIVE TWO-COLUMN LAYOUT
// =================================================================
/**
 * @param {{ isOpen: boolean, onClose: () => void, title: string }} props
 */
const ContractModal = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  // State for interactive elements
  const [signature, setSignature] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  

  // Check if the contract can be accepted (all fields filled and terms checked)
  const isAcceptButtonEnabled = isTermsAccepted && signature.trim() !== '' && walletAddress.trim() !== '';

  const financialData = {
    requestedAmount: 'USD 30,000',
    equityOffered: '8%',
    valuationCap: 'USD 375,000',
    currentRaised: 'USD 12,000',
  };
  
  // Data for the Legal/Operational Card (Content standardized to Neon Blue)
  const legalOperationalData = [
    { label: 'Governing Law', value: 'Delaware, USA'},
    { label: 'Jurisdiction', value: 'US Federal Court, San Francisco'},
    { label: 'Dispute Resolution', value: 'Binding Arbitration'},
    { label: 'Contract Duration', value: '24 months (Lock-up Period)'},
    { label: 'Meraki Fee (Fixed)', value: '0.5%'},
    { label: 'Payment Frequency', value: 'Automatic per event (Immediate settlement)'}
  ];

  const handleAcceptContract = () => {
    if (isAcceptButtonEnabled) {
      console.log('Contract Accepted!');
      console.log('Signed by:', signature);
      console.log('Receiving Wallet:', walletAddress);
      // Actual blockchain/backend interaction logic would go here
      onClose(); 
    }
  };

  return (
    // Overlay (Darkening the background)
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 transition-opacity"
      onClick={onClose}
    >
      {/* Main Modal Container - Contorno Verde Neon */}
      <div 
        className="w-full max-w-5xl p-8 rounded-xl shadow-2xl animate-fade-in" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          backgroundColor: COLORS.CARD_BG, 
          border: `2px solid ${COLORS.PRIMARY_ACCENT}`, // Contorno Verde Neon
          color: COLORS.TEXT_WHITE,
          boxShadow: `0 0 25px ${COLORS.PRIMARY_ACCENT}80`, // Sombra Verde Neon
        }}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold" style={{ color: COLORS.TEXT_WHITE }}>
            {title}
          </h2>
          <button 
            onClick={onClose} 
            className="text-2xl font-bold hover:text-gray-400 transition ml-4"
            style={{ color: COLORS.STROKE }}
          >
            &times;
          </button>
        </div>
        
        {/* --- SCROLLABLE CONTENT WRAPPER --- */}
        <div className="max-h-[70vh] overflow-y-auto pr-2">
            
            {/* 1. CONTRACT TERMS (OUTSIDE CARDS, LARGER TEXT) - Contorno e Título Verde Neon */}
            <div 
                className="mb-6 p-4 rounded-lg border-2" 
                style={{ 
                    borderColor: COLORS.PRIMARY_ACCENT, // Contorno Verde Neon
                    backgroundColor: `${COLORS.BACKGROUND}80` 
                }}
            >
                {/* Título do Card Solana em Verde Neon */}
                <p className="font-bold text-lg mb-4" style={{ color: COLORS.PRIMARY_ACCENT }}>Solana Blockchain Funding Agreement (SAFE)</p> 
                <div className="text-base space-y-4 leading-relaxed">
                    <p>
                        <span className="block font-extrabold" style={{ color: COLORS.TEXT_WHITE }}>SECTION 1: Scope of Agreement</span> 
                        This Simple Agreement for Future Equity (SAFE) is issued by NodeHub to the Investor. The Investor commits funds for the future conversion into equity upon a qualified financing event, under the terms outlined in this document.
                    </p>
                    <p>
                        <span className="block font-extrabold" style={{ color: COLORS.TEXT_WHITE }}>SECTION 2: Conversion Mechanism</span> 
                        The SAFE automatically converts upon a Qualified Financing at the **Valuation Cap of USD 375,000**, or at a 20% discount to the price of the shares sold in that financing, whichever provides a better outcome for the Investor.
                    </p>
                    <p>
                        <span className="block font-extrabold" style={{ color: COLORS.TEXT_WHITE }}>SECTION 3: Lock-up and Transferability</span> 
                        A **24-month lock-up period** applies to the principal investment. Transfer of this SAFE requires written approval from NodeHub, except in cases of transfer to affiliated entities.
                    </p>
                    <p>
                        <span className="block font-extrabold" style={{ color: COLORS.TEXT_WHITE }}>SECTION 4: Fees and Payouts</span> 
                        A fixed Meraki Fee of **0.5%** is deducted from the principal amount. All generated returns (yield) are distributed automatically and immediately upon event settlement via the specified blockchain address.
                    </p>
                    <p>
                        <span className="block font-extrabold" style={{ color: COLORS.TEXT_WHITE }}>SECTION 5: Digital Signature and Confirmation</span> 
                        By digitally signing and accepting these terms, the Investor confirms full comprehension and agreement with all clauses, acknowledging the risks associated with decentralized financial instruments and Solana network operations.
                    </p>
                </div>
            </div>
            
            {/* 2. CONTRACT CARDS (TWO COLUMNS) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* CARD 1: Legal and Operational Details - INVERSÃO: Rótulo Branco, Valor Azul Neon */}
                <div 
                    className="p-6 rounded-xl border-2 space-y-4 flex flex-col"
                    style={{ 
                        backgroundColor: COLORS.INNER_CARD_BG, 
                        borderColor: COLORS.STROKE, // Borda Azul Neon
                        boxShadow: `0 0 10px ${COLORS.STROKE}30`
                    }}
                >
                    <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.TEXT_WHITE }}>Operational & Legal Details</h3>
                    
                    {/* Legal and Operational Data - Rótulo Branco, Valor Azul Neon */}
                    {legalOperationalData.map((item) => (
                        <div key={item.label} className="py-2 border-b border-gray-800 last:border-b-0">
                            {/* Rótulo (Label): Branco Puro */}
                            <p className="text-sm font-semibold uppercase" style={{ color: COLORS.TEXT_WHITE }}>{item.label}</p>
                            {/* Valor (Value): Azul Neon */}
                            <p className="text-lg font-bold mt-1" style={{ color: COLORS.STROKE }}> 
                                {item.value}
                            </p>
                        </div>
                    ))}
                    
                    <div className="pt-4 text-center">
                        <p className="text-sm italic" style={{ color: COLORS.TEXT_WHITE }}>
                            Startup Digital Signature: **NodeHub**
                        </p>
                    </div>
                </div>

                {/* CARD 2: Financial Summary and Interactive Fields - Rótulo Branco, Valor Azul Neon */}
                <div 
                    className="p-6 rounded-xl border-2 space-y-4"
                    style={{ 
                        backgroundColor: COLORS.INNER_CARD_BG, 
                        borderColor: COLORS.STROKE, // Borda Azul Neon
                        boxShadow: `0 0 10px ${COLORS.STROKE}30`
                    }}
                >
                    <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.TEXT_WHITE }}>Investment Summary & Agreement</h3>
                    
                    {/* Financial Information - Rótulo Branco, Valor Azul Neon */}
                    {Object.entries(financialData).map(([key, value]) => (
                        <div key={key} className="py-2 border-b border-gray-800 last:border-b-0">
                            {/* Rótulo (Label): Branco Puro */}
                            <p className="text-xs uppercase font-medium" style={{ color: COLORS.TEXT_WHITE }}>
                                {key === 'requestedAmount' ? 'Requested Amount' : 
                                 key === 'equityOffered' ? 'Equity Offered' : 
                                 key === 'valuationCap' ? 'Valuation Cap (Pre-Money)' :
                                 'Current Amount Raised'}
                            </p>
                            {/* Valor (Value): Azul Neon */}
                            <p className="text-2xl font-bold" style={{ color: COLORS.STROKE }}>
                                {value}
                            </p>
                        </div>
                    ))}

                    {/* INTERACTIVE INPUT FIELDS - Neon Blue Outline/Text */}
                    <div className="pt-4 space-y-4">
                        
                        {/* Field for receiving account/wallet */}
                        <div className="relative">
                            <label htmlFor="wallet" className="block text-sm font-medium" style={{ color: COLORS.TEXT_WHITE }}>
                                Receiving Wallet/Account (Company)
                            </label>
                            <input
                                id="wallet"
                                type="text"
                                placeholder="Enter the account that will receive the funds"
                                value={walletAddress}
                                onChange={(e) => setWalletAddress(e.target.value)}
                                className="mt-1 block w-full p-2.5 text-sm rounded-lg border focus:ring-2"
                                style={{
                                    backgroundColor: COLORS.BACKGROUND,
                                    borderColor: COLORS.STROKE,
                                    color: COLORS.TEXT_WHITE,
                                    outlineColor: COLORS.STROKE
                                }}
                            />
                        </div>
                        
                        {/* Field for Digital Signature */}
                        <div className="relative">
                            <label htmlFor="signature" className="block text-sm font-medium" style={{ color: COLORS.TEXT_WHITE }}>
                                Digital Signature (Type Full Name)
                            </label>
                            <input
                                id="signature"
                                type="text"
                                placeholder="Type your full name to sign digitally"
                                value={signature}
                                onChange={(e) => setSignature(e.target.value)}
                                className="mt-1 block w-full p-2.5 text-sm rounded-lg border focus:ring-2"
                                style={{
                                    backgroundColor: COLORS.BACKGROUND,
                                    borderColor: COLORS.STROKE,
                                    color: COLORS.TEXT_WHITE,
                                    outlineColor: COLORS.STROKE
                                }}
                            />
                        </div>

                        {/* Terms Acceptance Checkbox */}
                        <div className="flex items-start mt-4">
                            <input
                                id="terms-checkbox"
                                type="checkbox"
                                checked={isTermsAccepted}
                                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                                className="mt-1 w-4 h-4 text-green-500 rounded focus:ring-green-400"
                                style={{ backgroundColor: COLORS.BACKGROUND, borderColor: COLORS.STROKE, accentColor: COLORS.STROKE }}
                            />
                            <label htmlFor="terms-checkbox" className="ml-2 text-sm select-none" style={{ color: COLORS.TEXT_WHITE }}>
                                I have read and agree to all the terms and conditions of the Solana Funding Agreement.
                            </label>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        {/* ACCEPT TERMS Button (Main Action, Conditional) - Fundo Verde, Texto Branco */}
        <button
          onClick={handleAcceptContract}
          disabled={!isAcceptButtonEnabled}
          className={`w-full py-3 mt-8 font-semibold rounded-lg transition duration-300 ${
            isAcceptButtonEnabled 
              ? 'hover:opacity-90 transform hover:scale-[1.01]' 
              : 'opacity-50 cursor-not-allowed'
          }`}
          style={{ 
              backgroundColor: COLORS.PRIMARY_ACCENT, // Verde Neon
              color: COLORS.TEXT_WHITE, // Texto Branco
              boxShadow: isAcceptButtonEnabled ? `0 0 15px ${COLORS.PRIMARY_ACCENT}80` : 'none',
          }}
        >
          {isAcceptButtonEnabled ? 'ACCEPT TERMS AND SIGN CONTRACT' : 'FILL ALL FIELDS AND ACCEPT TERMS'} {/* Texto Branco */}
        </button>

        {/* Simple Close Button - Fundo Azul Neon, Texto Branco */}
        <button
          onClick={onClose}
          className="w-full py-2 mt-3 text-sm font-medium rounded-lg transition hover:opacity-85 transform hover:scale-[1.01]"
          style={{ 
              backgroundColor: COLORS.STROKE, // Fundo Azul Neon
              color: COLORS.TEXT_WHITE, // Texto Branco
              boxShadow: `0 0 10px ${COLORS.STROKE}50`,
          }}
        >
          CLOSE WITHOUT SIGNING
        </button>
      </div>
    </div>
  );
};
// =================================================================


// --- Header Component ---
const AppHeader = () => (
  <header 
    className="py-4 px-6 shadow-lg sticky top-0 z-50" 
    style={{ backgroundColor: COLORS.CARD_BG, borderBottom: `1px solid ${COLORS.PRIMARY_ACCENT}1A` }}
  >
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      {/* Title/Logo NodeHub in Neon Blue Stroke */}
      <div className="flex items-center space-x-3">
       <Image
        src="/images/perfil.jpg" // Se for local, o caminho é a partir da pasta 'public'
        alt="Foto de perfil do usuário" // ESSENCIAL para acessibilidade
        width={500} // Largura em pixels
        height={300} // Altura em pixels
        priority // Opcional, para carregamento prioritário
      />
        <h2 style={{ color: COLORS.TEXT_WHITE, fontSize: '1.5rem', fontWeight: 700 }}>
          NodeHub
        </h2>
      </div>
      
      {/* Navigation Links */}
      <nav className=".flex space-x-6">
        <button 
          onClick={() => simulateNavigation('/home')} 
          style={{ color: COLORS.TEXT_WHITE }} 
          className="bg-transparent border-none p-0 cursor-pointer text-base hover:text-gray-400 transition">
          Home
        </button>
        <button 
          onClick={() => simulateNavigation('/explore')} 
          style={{ color: COLORS.TEXT_WHITE }} 
          className="bg-transparent border-none p-0 cursor-pointer text-base hover:text-gray-400 transition">
          Explore
        </button>
        <button 
          onClick={() => simulateNavigation('/login')} 
          style={{ color: COLORS.SECONDARY_ACCENT }} // Roxo Neon
          className="bg-transparent border-none p-0 cursor-pointer text-base font-semibold hover:opacity-80 transition">
          Login
        </button>
      </nav>
    </div>
  </header>
);

// --- JSDoc Type Definition ---
/**
 * @typedef {Object} CardItem
 * @property {string} title - The card's title.
 * @property {string} desc - The card's description.
 */

// --- Mock Data for Carousel ---
/** @type {CardItem[]} */
const carouselCards = [
    { title: "Smart Contracts", desc: "Scalable infrastructure for decentralized projects." },
    { title: "APIs and SDKs", desc: "Robust tools for developers building on Solana." },
    { title: "Advanced Security", desc: "Enterprise-grade security protocols." },
    { title: "Unmatched Speed", desc: "Transactions in milliseconds with minimal costs." },
    { title: "Strong Community", desc: "Connect with the global Solana developer community." },
    { title: "24/7 Support", desc: "Specialized technical assistance always available." },
];

// --- Simple Carousel Component (Self-contained) ---
/**
 * @param {object} props
 * @param {CardItem[]} props.items - The array of carousel items.
 */
const SimpleCarousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCards = 3; // Number of visible cards

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
          {/* Flex container for cards */}
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: getTransform() }}>
              {items.map((
                  /** @type {CardItem} */ card, 
                  /** @type {number} */ idx) => (
                  <div 
                      key={/** @type {number} */ (idx)} 
                      className="shrink-0 p-6 rounded-xl border-2 shadow-2xl transition-all duration-300 mx-3 hover:shadow-cyan-500/50"
                      style={{ 
                        width: `calc(100% / ${visibleCards} - 1.5rem)`, 
                        backgroundColor: COLORS.CARD_BG, 
                        borderColor: COLORS.STROKE, // Borda Azul Neon
                        marginRight: idx < items.length - 1 ? '1.5rem' : '0', 
                      }}
                  >
                    <div 
                      className="text-4xl mb-4" 
                      style={{ color: COLORS.SECONDARY_ACCENT }} // Ícone Roxo Neon
                    >
                      {/* Example Icon: Node Connection */}
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.STROKE }}>
                      {card.title}
                    </h3>
                    <p className="text-gray-300 text-sm" style={{ color: COLORS.TEXT_WHITE }}>
                      {card.desc}
                    </p>
                  </div>
              ))}
          </div>

          {/* Navigation controls (arrows) */}
          <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 rounded-full transition-opacity z-10 hover:opacity-80"
              style={{ backgroundColor: COLORS.CARD_BG, color: COLORS.SECONDARY_ACCENT }} // Roxo Neon
          >
              {/* Left Arrow Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 rounded-full transition-opacity z-10 hover:opacity-80"
              style={{ backgroundColor: COLORS.CARD_BG, color: COLORS.SECONDARY_ACCENT }} // Roxo Neon
          >
              {/* Right Arrow Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
      </div>
    );
};


// --- Main Landing Page Component ---
export default function NodeHubLandingPage() {
    // STATE FOR THE MODAL
    const [isContractModalOpen, setIsContractModalOpen] = useState(false);

    // HANDLER to open the modal
    const handleViewContract = () => {
        setIsContractModalOpen(true);
    };

    return (
      // Main background with color #04352D
      <div 
          style={{ 
              minHeight: '100vh', 
              fontFamily: 'Inter, sans-serif',
              backgroundColor: COLORS.BACKGROUND,
              color: COLORS.TEXT_WHITE,
          }}
      >
        <AppHeader />

        {/* Hero Section: Title and Subtitle */}
        <section className="py-24 px-8 max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side: Featured Logo */}
          <div className="flex-1 flex justify-start items-start">
            <image
            src="/files/Group 13.png"
            alt="NodeHub Large Logo" 
            className="h-40 w-40 object-contain"
            style={{ filter: `drop-shadow(0 0 10px ${COLORS.STROKE})` }}/>
          </div>

          {/* Right Side: Title and Subtitle */}
          <div className="flex-1 text-right max-w-4xl ml-auto"> 
              <h1 className="text-7xl font-extrabold mb-2" style={{ color: COLORS.TEXT_WHITE }}>
                NodeHub
              </h1>
              <p className="text-2xl mt-2" style={{ color: COLORS.STROKE }}> 
                Powering the next generation of Solana infrastructure
              </p>
          </div>
        </section>

        {/* Carousel Cards Section */}
        <section className="py-12 px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: COLORS.TEXT_WHITE }}>
            Our Highlights
          </h2>
          
          <SimpleCarousel items={carouselCards} />
          
        </section>
        
        {/* SECTION 2: Problem and The Startup Cards - Problem Azul, Startup Roxo */}
        <section className="py-12 px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: Problem - Borda Azul Neon */}
              <div 
                  className="p-8 rounded-xl border-2 hover:scale-[1.02] transition duration-300"
                  style={{ 
                      backgroundColor: COLORS.CARD_BG, 
                      borderColor: COLORS.STROKE, // Borda Azul Neon
                      boxShadow: `0 0 15px ${COLORS.STROKE}50`,
                  }}
              >
                  <h3 className="text-3xl font-bold mb-4" style={{ color: COLORS.TEXT_WHITE }}> 
                      Problem
                  </h3>
                  <p className="text-lg text-gray-300" style={{ color: COLORS.TEXT_WHITE }}> 
                      Running and maintaining nodes on the Solana network is still expensive, complex, and time-consuming. Developers and validators face technical challenges from the initial synchronization process to continuous monitoring of performance and uptime. Each network update requires manual adjustments and advanced infrastructure knowledge, making node operation inaccessible to most Web3 teams. This scenario limits decentralization and slows down ecosystem growth, as many projects abandon running their own validators or RPCs due to the complexity and cost involved.
                  </p>
              </div>

              {/* Card 2: The Startup - Borda Roxo Neon (SECONDARY_ACCENT) */}
              <div 
                  className="p-8 rounded-xl border-2 hover:scale-[1.02] transition duration-300"
                  style={{ 
                      backgroundColor: COLORS.CARD_BG, 
                      borderColor: COLORS.SECONDARY_ACCENT, // Borda Roxo Neon
                      boxShadow: `0 0 15px ${COLORS.SECONDARY_ACCENT}50`, // Sombra Roxo Neon
                  }}
              >
                  <h3 className="text-3xl font-bold mb-4" style={{ color: COLORS.TEXT_WHITE }}> 
                      The Startup
                  </h3>
                  <p className="text-lg text-gray-300" style={{ color: COLORS.TEXT_WHITE }}> 
                      NodeHub was created to simplify Solana node operations. It is an infrastructure platform that allows any team to run, monitor, and scale Solana nodes with a single click. The system automates deployment, updates, and observability, integrating real-time metrics, intelligent alerts, and detailed logs in a unified dashboard. Built upon Solana’s high-performance architecture, NodeHub delivers an optimized experience for validators, RPC providers, and dApp developers. Our mission is to remove the technical barriers that hinder Solana’s growth, making node management as simple and accessible as deploying an app to the cloud.
                  </p>
              </div>
          </div>
        </section>

        {/* SECTION 3: Funding Rectangular Card - Contorno e CTAs em Verde Neon */}
        <section className="py-12 px-8 max-w-7xl mx-auto">
          <div 
              className="p-12 rounded-xl shadow-2xl"
              style={{ 
                  backgroundColor: COLORS.BLACK_CARD, 
                  border: `2px solid ${COLORS.PRIMARY_ACCENT}`, // Contorno Verde Neon
                  boxShadow: `0 0 25px ${COLORS.PRIMARY_ACCENT}50`, // Sombra Verde Neon
              }}
          >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
                  
                  {/* Column 1: Requested amount (Left) */}
                  <div className="text-left">
                      <p className="text-lg font-semibold uppercase" style={{ color: COLORS.TEXT_WHITE }}>Requested amount</p>
                      <h4 className="text-5xl font-extrabold mt-1" style={{ color: COLORS.PRIMARY_ACCENT }}>
                          USD 30.000
                      </h4>
                      <p className="text-base" style={{ color: COLORS.TEXT_WHITE }}>
                          In pre-seed funding
                      </p>
                  </div>

                  {/* Column 2: Equity offered (Center) */}
                  <div className="text-center">
                      <p className="text-lg font-semibold uppercase" style={{ color: COLORS.TEXT_WHITE }}>Equity offered</p>
                      <h4 className="text-5xl font-extrabold mt-1" style={{ color: COLORS.PRIMARY_ACCENT }}>
                          8%
                      </h4>
                      <p className="text-base" style={{ color: COLORS.TEXT_WHITE }}>
                          Ownership stake
                      </p>
                  </div>

                  {/* Column 3: Action Buttons (Right) */}
                  <div className="flex flex-col space-y-5 md:items-end md:text-right"> 
                      
                      {/* Button 1: INVEST NOW (Solid Purple) - Voltou para Roxo */}
                      <button 
                          className="w-full md:w-auto px-8 py-4 text-lg font-bold rounded-lg uppercase transition duration-300 transform hover:scale-[1.05] shadow-lg"
                          style={{ 
                              backgroundColor: COLORS.SECONDARY_ACCENT, // Roxo Neon
                              color: COLORS.BLACK_CARD,
                              boxShadow: `0 0 15px ${COLORS.SECONDARY_ACCENT}`,
                          }}
                          onClick={() => console.log('Invest Now clicked')}
                      >
                          INVEST NOW
                      </button>

                      {/* Button 2: VIEW FULL CONTRACT (Green Border) */}
                      <button 
                          onClick={handleViewContract} 
                          className="w-full md:w-auto px-8 py-4 text-lg font-bold rounded-lg uppercase border-2 transition duration-300 transform hover:scale-[1.05]"
                          style={{ 
                              backgroundColor: 'transparent',
                              color: COLORS.PRIMARY_ACCENT, // Verde Neon
                              borderColor: COLORS.PRIMARY_ACCENT, // Verde Neon
                              boxShadow: `0 0 10px ${COLORS.PRIMARY_ACCENT}50`,
                          }}
                      >
                          VIEW FULL CONTRACT
                      </button>
                  </div>
              </div>
          </div>
        </section>

        {/* Empty Space for Additional Content */}
        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="mt-12 p-8 border-dashed border-2 rounded-lg text-center" style={{ borderColor: COLORS.STROKE, color: COLORS.TEXT_WHITE }}>
              <p>Add more sections here</p>
          </div>
        </section>
        
        {/* ================================================================= */}
        {/* 🛑 NEW CONTRACT MODAL RENDERING */}
        {/* ================================================================= */}
        <ContractModal 
          isOpen={isContractModalOpen} 
          onClose={() => setIsContractModalOpen(false)} 
          title="Funding Contract Details"
        />
        {/* ================================================================= */}

      </div>
    );
}
