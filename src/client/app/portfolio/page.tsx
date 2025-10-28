"use client";

import React, { useState, useEffect, useCallback } from 'react';

// --- FIREBASE IMPORTS (MANDATORY FOR PERSISTENCE) ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// =================================================================
// 🎨 COLOR PALETTE
// =================================================================
const COLORS = {
  BACKGROUND: '#04352D', // Main Background (Dark Teal)
  CARD_BG: '#092C4C',    // Card and Filter Background
  PRIMARY_ACCENT: '#01F4CC', // Neon Green (Success / New Section Highlight / View Contract)
  SECONDARY_ACCENT: '#BD2EF0', // Neon Purple (Highlight/Main Button / Identity Section Highlight)
  STROKE: '#62C2E8',     // Neon Blue (General Details/Borders/Inputs)
  TEXT_WHITE: '#ffffff', // General Text to Pure White
  TEXT_GRAY: '#a0a0a0',  // Subtext
  BLACK_CARD: '#000000', // Used for dark text on bright buttons
};

// --- Utility Functions ---
const simulateNavigation = (path) => {
  console.log(`Simulating navigation to: ${path}`);
};

// --- Firebase Global Vars ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;


// =================================================================
// 🛠️ COMPONENTS
// =================================================================

// --- Header Component (Adjusted for Registration) ---
const AppHeader = () => (
  <header 
    className="py-4 px-8 shadow-lg sticky top-0 z-50" 
    style={{ backgroundColor: COLORS.CARD_BG, borderBottom: `1px solid ${COLORS.STROKE}1A` }} 
  >
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => simulateNavigation('/')}>
        <span 
            className="text-3xl font-extrabold" 
            style={{ color: COLORS.STROKE, textShadow: `0 0 7px ${COLORS.STROKE}` }}
        >
          NH
        </span>
        <h2 style={{ color: COLORS.TEXT_WHITE, fontSize: '1.75rem', fontWeight: 800 }}>
          NodeHub
        </h2>
      </div>
      
      <nav className="flex space-x-8 text-lg">
        <button 
          onClick={() => simulateNavigation('/home')} 
          style={{ color: COLORS.TEXT_GRAY }} 
          className="bg-transparent border-none p-0 cursor-pointer hover:text-gray-400 transition">
          Home
        </button>
        <button 
          onClick={() => simulateNavigation('/portfolio')} 
          style={{ color: COLORS.TEXT_GRAY }} 
          className="bg-transparent border-none p-0 cursor-pointer hover:text-gray-400 transition"
        >
          Portfolio
        </button>
        <button 
          onClick={() => simulateNavigation('/register')} 
          style={{ color: COLORS.SECONDARY_ACCENT }} 
          className="bg-transparent border-none p-0 cursor-pointer font-semibold transition border-b-2"
        >
          Register Startup
        </button>
      </nav>
    </div>
  </header>
);

// =================================================================
// 🖥️ MAIN REGISTRATION PAGE
// =================================================================
export default function StartupRegistrationPage() {
    
    // --- Form States (Basic Information) ---
    const [companyName, setCompanyName] = useState('');
    const [slogan, setSlogan] = useState('');
    const [logoFile, setLogoFile] = useState(null); 
    const [logoPreview, setLogoPreview] = useState(null); 
    
    // --- Form States (Media and Description) ---
    const [pitchVideoFile, setPitchVideoFile] = useState(null);
    const [pitchVideoPreview, setPitchVideoPreview] = useState(null);
    const [mediaFiles, setMediaFiles] = useState([]); 
    const [mediaDescription, setMediaDescription] = useState(''); 
    
    // --- Form States (Problem/Summary) ---
    const [problemSolved, setProblemSolved] = useState(''); 
    const [projectSummary, setProjectSummary] = useState(''); 

    // --- Form States (NEW: Funding) ---
    const [requestedAmount, setRequestedAmount] = useState('');
    const [equityOffered, setEquityOffered] = useState('');
    const [fundingStage, setFundingStage] = useState('Pre-Seed'); 

    // --- Submission States ---
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [showContractModal, setShowContractModal] = useState(false); // State for contract modal

    // --- Firebase States ---
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    // 1. FIREBASE INITIALIZATION AND AUTHENTICATION
    useEffect(() => {
        try {
            if (Object.keys(firebaseConfig).length === 0) {
                console.error("Firebase config is empty. Cannot initialize Firestore.");
                return;
            }
            
            const app = initializeApp(firebaseConfig);
            const firestoreDb = getFirestore(app);
            const authInstance = getAuth(app);

            setDb(firestoreDb);
            setAuth(authInstance);

            const authenticate = async () => {
                try {
                    if (initialAuthToken) {
                        await signInWithCustomToken(authInstance, initialAuthToken);
                    } else {
                        await signInAnonymously(authInstance);
                    }
                    setUserId(authInstance.currentUser.uid);
                } catch (error) {
                    console.error("Firebase Authentication Error:", error);
                } finally {
                    setIsAuthReady(true);
                }
            };
            authenticate();
        } catch (error) {
            console.error("Firebase Initialization Error:", error);
        }
    }, []);
    
    // --- Upload Handlers (omitted for brevity, unchanged logic) ---
    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLogoFile(file);
            if (logoPreview) URL.revokeObjectURL(logoPreview);
            setLogoPreview(URL.createObjectURL(file));
        }
    };
    
    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPitchVideoFile(file);
            if (pitchVideoPreview) URL.revokeObjectURL(pitchVideoPreview);
            setPitchVideoPreview(URL.createObjectURL(file));
        }
    };

    const handleMediaUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setMediaFiles(prev => [...prev, ...files]);
        }
    };

    const removeMediaFile = (fileName) => {
        setMediaFiles(prev => prev.filter(f => f.name !== fileName));
    };

    // --- NEW: View Contract Handler (Simulated Modal) ---
    const handleViewContract = () => {
        setShowContractModal(true);
    };


    // 2. FORM SUBMISSION AND FIRESTORE SAVING
    const handleRegistration = useCallback(async () => {
        if (!isAuthReady || !db || !userId) {
            setSubmissionMessage({ type: 'error', text: 'Waiting for server connection...' });
            return;
        }

        // --- UPDATED VALIDATION including new funding fields ---
        if (!companyName.trim() || !slogan.trim() || !logoFile || !pitchVideoFile || !mediaDescription.trim() || !problemSolved.trim() || !projectSummary.trim() || !requestedAmount || !equityOffered) {
            setSubmissionMessage({ type: 'error', text: 'Please fill out all required fields (including funding details).' });
            return;
        }

        setIsSubmitting(true);
        setSubmissionMessage({ type: 'info', text: 'Submitting your startup...' });

        try {
            // Data to save
            const registrationData = {
                companyName: companyName.trim(),
                slogan: slogan.trim(),
                logoFilename: logoFile ? logoFile.name : null,
                pitchVideoFilename: pitchVideoFile ? pitchVideoFile.name : null, 
                mediaFilenames: mediaFiles.map(f => f.name), 
                mediaDescription: mediaDescription.trim(), 
                problemSolved: problemSolved.trim(), 
                projectSummary: projectSummary.trim(), 
                // NEW FUNDING FIELDS
                requestedAmount: parseFloat(requestedAmount),
                equityOffered: parseFloat(equityOffered),
                fundingStage: fundingStage,
                
                submissionDate: new Date(),
                userId: userId,
            };

            // Firestore path: /artifacts/{appId}/users/{userId}/registrations
            const collectionPath = `artifacts/${appId}/users/${userId}/registrations`;
            const docRef = await addDoc(collection(db, collectionPath), registrationData);

            setSubmissionMessage({ type: 'success', text: `Startup "${companyName}" registered successfully! ID: ${docRef.id}` });
            
            // Clear form
            setCompanyName('');
            setSlogan('');
            if (logoPreview) URL.revokeObjectURL(logoPreview);
            if (pitchVideoPreview) URL.revokeObjectURL(pitchVideoPreview);
            setLogoFile(null);
            setLogoPreview(null);
            setPitchVideoFile(null);
            setPitchVideoPreview(null);
            setMediaFiles([]);
            setMediaDescription('');
            setProblemSolved(''); 
            setProjectSummary('');
            setRequestedAmount('');
            setEquityOffered('');
            setFundingStage('Pre-Seed');
        } catch (e) {
            console.error("Error adding document: ", e);
            setSubmissionMessage({ type: 'error', text: `Registration failed: ${e.message}. Please try again.` });
        } finally {
            setIsSubmitting(false);
        }
    }, [isAuthReady, db, userId, companyName, slogan, logoFile, logoPreview, pitchVideoFile, pitchVideoPreview, mediaFiles, mediaDescription, problemSolved, projectSummary, requestedAmount, equityOffered, fundingStage]);


    // --- Contract Modal Component ---
    const ContractModal = ({ isVisible, onClose }) => {
        if (!isVisible) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
                <div 
                    className="p-8 rounded-xl w-full max-w-lg shadow-2xl"
                    style={{ 
                        backgroundColor: COLORS.CARD_BG, 
                        borderColor: COLORS.STROKE,
                        borderWidth: '2px',
                        boxShadow: `0 0 30px ${COLORS.STROKE}80`, 
                    }}
                >
                    <h3 className="text-3xl font-bold mb-4" style={{ color: COLORS.TEXT_WHITE }}>
                        Visualizar Contrato (Simulado)
                    </h3>
                    <p className="text-lg mb-6" style={{ color: COLORS.TEXT_GRAY }}>
                        Este recurso normalmente exibiria os termos legais completos, tokenomics e o documento SAFT/SAFE associado a esta rodada de financiamento.
                    </p>
                    <p className="text-base font-mono p-4 rounded" style={{ backgroundColor: COLORS.BACKGROUND, color: COLORS.PRIMARY_ACCENT }}>
                        [Placeholder para Hash do Smart Contract/Termos Legais]
                    </p>
                    <button
                        onClick={onClose}
                        className="mt-6 w-full py-3 text-lg font-bold rounded-lg uppercase transition duration-300 hover:opacity-90"
                        style={{ 
                            backgroundColor: COLORS.PRIMARY_ACCENT,
                            color: COLORS.CARD_BG,
                        }}
                    >
                        Fechar
                    </button>
                </div>
            </div>
        );
    };

    return (
      <div 
          style={{ 
              minHeight: '100vh', 
              fontFamily: 'Inter, sans-serif',
              backgroundColor: COLORS.BACKGROUND,
              color: COLORS.TEXT_WHITE,
          }}
      >
        <AppHeader />

        {/* Hero / Title Section */}
        <section className="py-16 px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3" style={{ color: COLORS.TEXT_WHITE }}>
            Register Your Startup with NodeHub
          </h1>
          <p className="text-2xl" style={{ color: COLORS.STROKE }}>
            The portal for funding and growth in the Solana ecosystem.
          </p>
        </section>

        {/* ========================================================== */}
        {/* 1. SECTION: BASIC INFORMATION - STROKE: PURPLE NEON */}
        {/* ========================================================== */}
        <section className="pb-8 pt-4 px-8 max-w-5xl mx-auto">
            <div 
                className="p-8 rounded-xl border-2 shadow-2xl"
                style={{ 
                    backgroundColor: COLORS.CARD_BG, 
                    borderColor: COLORS.SECONDARY_ACCENT, // <-- NEON PURPLE
                    boxShadow: `0 0 20px ${COLORS.SECONDARY_ACCENT}50`, 
                }}
            >
                <h2 className="text-4xl font-bold mb-8" style={{ color: COLORS.TEXT_WHITE }}>
                    Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* COL 1: Logo Upload */}
                    <div className="md:col-span-1 space-y-4">
                        <label className="block text-xl font-medium" style={{ color: COLORS.TEXT_WHITE }}>
                            Logo Upload (Required)
                        </label>
                        
                        <div 
                            className="w-full h-40 flex items-center justify-center rounded-lg border-2 border-dashed relative overflow-hidden cursor-pointer"
                            style={{ 
                                borderColor: COLORS.STROKE, // <-- NEON BLUE Detail
                                backgroundColor: COLORS.BACKGROUND + '80' 
                            }}
                            onClick={() => document.getElementById('logo-upload').click()}
                        >
                            <input 
                                type="file" 
                                id="logo-upload" 
                                accept="image/*" 
                                onChange={handleLogoUpload} 
                                className="hidden" 
                            />
                            
                            {logoPreview ? (
                                <img 
                                    src={logoPreview} 
                                    alt="Logo Preview" 
                                    className="object-contain w-full h-full p-2"
                                    style={{ filter: `drop-shadow(0 0 5px ${COLORS.STROKE}80)` }}
                                />
                            ) : (
                                <div className="text-center p-4">
                                    <svg className="w-10 h-10 mx-auto" style={{ color: COLORS.STROKE }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                    </svg>
                                    <p className="text-lg mt-2" style={{ color: COLORS.TEXT_GRAY }}>
                                        Click to upload
                                    </p>
                                </div>
                            )}
                        </div>
                        {logoFile && (
                            <p className="text-base text-center" style={{ color: COLORS.SECONDARY_ACCENT }}> 
                                {logoFile.name} uploaded.
                            </p>
                        )}
                    </div>
                    
                    {/* COL 2 & 3: Inputs */}
                    <div className="md:col-span-2 space-y-6">
                        
                        {/* Company Name Input */}
                        <div>
                            <label htmlFor="companyName" className="block text-xl font-medium mb-1" style={{ color: COLORS.TEXT_WHITE }}>
                                Company Name (Required)
                            </label>
                            <input
                                id="companyName"
                                type="text"
                                placeholder="Ex: NodeHub Validator Pro"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full p-4 text-xl rounded-lg border-2 focus:ring-2" 
                                style={{
                                    backgroundColor: COLORS.BACKGROUND,
                                    borderColor: COLORS.STROKE, // <-- NEON BLUE Detail
                                    color: COLORS.TEXT_WHITE,
                                    outlineColor: COLORS.STROKE,
                                    boxShadow: `0 0 5px ${COLORS.STROKE}30`,
                                }}
                            />
                        </div>

                        {/* Slogan Input */}
                        <div>
                            <label htmlFor="slogan" className="block text-xl font-medium mb-1" style={{ color: COLORS.TEXT_WHITE }}>
                                Startup Slogan (Required)
                            </label>
                            <input
                                id="slogan"
                                type="text"
                                placeholder="Ex: Simplifying Solana infrastructure with one click."
                                value={slogan}
                                onChange={(e) => setSlogan(e.target.value)}
                                className="w-full p-4 text-xl rounded-lg border-2 focus:ring-2" 
                                style={{
                                    backgroundColor: COLORS.BACKGROUND,
                                    borderColor: COLORS.STROKE, // <-- NEON BLUE Detail
                                    color: COLORS.TEXT_WHITE,
                                    outlineColor: COLORS.STROKE,
                                    boxShadow: `0 0 5px ${COLORS.STROKE}30`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/* ========================================================== */}
        {/* 2. SECTION: MEDIA AND PITCH VIDEO - STROKE: PURPLE NEON */}
        {/* ========================================================== */}
        <section className="pb-8 pt-4 px-8 max-w-5xl mx-auto">
            <div 
                className="p-8 rounded-xl border-2 shadow-2xl"
                style={{ 
                    backgroundColor: COLORS.CARD_BG, 
                    borderColor: COLORS.SECONDARY_ACCENT, // <-- NEON PURPLE
                    boxShadow: `0 0 20px ${COLORS.SECONDARY_ACCENT}50`, 
                }}
            >
                <h2 className="text-4xl font-bold mb-8" style={{ color: COLORS.TEXT_WHITE }}>
                    Pitch and Media Gallery
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* COL 1: 3-Minute Video Pitch */}
                    <div className="space-y-4">
                        <label className="block text-xl font-medium" style={{ color: COLORS.TEXT_WHITE }}>
                            Video Pitch (Max 3 min - Required)
                        </label>
                        
                        <div 
                            className="w-full h-48 flex items-center justify-center rounded-lg border-2 border-dashed relative overflow-hidden cursor-pointer"
                            style={{ 
                                borderColor: COLORS.STROKE, // <-- NEON BLUE Detail
                                backgroundColor: COLORS.BACKGROUND + '80' 
                            }}
                            onClick={() => document.getElementById('video-upload').click()}
                        >
                            <input 
                                type="file" 
                                id="video-upload" 
                                accept="video/*" 
                                onChange={handleVideoUpload} 
                                className="hidden" 
                            />
                            
                            {pitchVideoPreview ? (
                                <video 
                                    src={pitchVideoPreview} 
                                    controls 
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="text-center p-4">
                                    <svg className="w-10 h-10 mx-auto" style={{ color: COLORS.STROKE }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.55-2.28A1 1 0 0121 8.65v6.7a1 1 0 01-1.45.92L15 14m-3 4H5a2 2 0 01-2-2v-8a2 2 0 012-2h12a2 2 0 012 2v3m-7 4v-4m0 0l-4-4m4 4l4-4"></path>
                                    </svg>
                                    <p className="text-lg mt-2" style={{ color: COLORS.TEXT_GRAY }}>
                                        Click to upload the .mp4 file
                                    </p>
                                </div>
                            )}
                        </div>
                        {pitchVideoFile && (
                            <p className="text-base text-center" style={{ color: COLORS.STROKE }}> 
                                {pitchVideoFile.name} uploaded.
                            </p>
                        )}
                    </div>
                    
                    {/* COL 2: Photos and Videos Gallery Upload */}
                    <div className="space-y-4">
                        <label className="block text-xl font-medium" style={{ color: COLORS.TEXT_WHITE }}>
                            Photos and Videos Gallery (Multiple Files)
                        </label>
                        
                        <div 
                            className="w-full h-48 flex flex-col items-center justify-center rounded-lg border-2 border-dashed relative overflow-y-auto p-2"
                            style={{ 
                                borderColor: COLORS.STROKE, // <-- NEON BLUE Detail
                                backgroundColor: COLORS.BACKGROUND + '80' 
                            }}
                        >
                            <input 
                                type="file" 
                                id="media-upload" 
                                accept="image/*,video/*" 
                                multiple
                                onChange={handleMediaUpload} 
                                className="hidden" 
                            />
                            
                            {mediaFiles.length === 0 ? (
                                <div 
                                    className="text-center p-4 w-full cursor-pointer h-full flex flex-col justify-center items-center"
                                    onClick={() => document.getElementById('media-upload').click()}
                                >
                                    <svg className="w-10 h-10 mx-auto" style={{ color: COLORS.STROKE }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> 
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l1.416-2.126A2 2 0 0110.435 4h3.13a2 2 0 011.664.89l1.416 2.126a2 2 0 001.664.89H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <p className="text-lg mt-2" style={{ color: COLORS.TEXT_GRAY }}>
                                        Click to add photos or videos
                                    </p>
                                </div>
                            ) : (
                                <ul className="w-full space-y-1 p-1">
                                    {mediaFiles.map((file, index) => (
                                        <li key={index} className="flex justify-between items-center text-base p-2 rounded" style={{ backgroundColor: COLORS.BACKGROUND }}>
                                            <span style={{ color: COLORS.TEXT_WHITE }} className="truncate pr-2">
                                                {file.name}
                                            </span>
                                            <button 
                                                onClick={() => removeMediaFile(file.name)} 
                                                className="text-red-400 hover:text-red-600 transition p-1 leading-none text-xl" 
                                                type="button" 
                                            >
                                                &times;
                                            </button>
                                        </li>
                                    ))}
                                    <button 
                                        className="w-full text-center text-lg mt-2 py-1 rounded" 
                                        style={{ color: COLORS.STROKE, border: `1px dashed ${COLORS.STROKE}50` }} 
                                        onClick={() => document.getElementById('media-upload').click()}
                                        type="button"
                                    >
                                        + Add More Files ({mediaFiles.length})
                                    </button>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description Textarea (Full Width below media) */}
                <div className="mt-8">
                    <label htmlFor="mediaDescription" className="block text-xl font-medium mb-1" style={{ color: COLORS.TEXT_WHITE }}>
                        Startup and Media Description (Required)
                    </label>
                    <textarea
                        id="mediaDescription"
                        rows="5"
                        placeholder="Describe your startup, the products shown in the media, and what makes your project unique."
                        value={mediaDescription}
                        onChange={(e) => setMediaDescription(e.target.value)}
                        className="w-full p-4 text-xl rounded-lg border-2 focus:ring-2 resize-none"
                        style={{
                            backgroundColor: COLORS.BACKGROUND,
                            borderColor: COLORS.STROKE, // <-- NEON BLUE Detail
                            color: COLORS.TEXT_WHITE,
                            outlineColor: COLORS.STROKE,
                            boxShadow: `0 0 5px ${COLORS.STROKE}30`,
                        }}
                    />
                </div>
            </div>
        </section>


        {/* ========================================================== */}
        {/* 3. SECTION: PROBLEM AND SUMMARY - STROKE: GREEN NEON */}
        {/* ========================================================== */}
        <section className="pb-8 pt-4 px-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* CARD 1: The Problem We Solve */}
                <div 
                    className="p-8 rounded-xl border-2 shadow-2xl"
                    style={{ 
                        backgroundColor: COLORS.CARD_BG, 
                        borderColor: COLORS.PRIMARY_ACCENT, // <-- NEON GREEN
                        boxShadow: `0 0 20px ${COLORS.PRIMARY_ACCENT}50`, 
                    }}
                >
                    <h2 className="text-3xl font-bold mb-6" style={{ color: COLORS.TEXT_WHITE }}>
                        The Problem We Solve
                    </h2>
                    <label htmlFor="problemSolved" className="block text-xl font-medium mb-1" style={{ color: COLORS.TEXT_WHITE }}>
                        What pain point does your startup address? (Required)
                    </label>
                    <textarea
                        id="problemSolved"
                        rows="6"
                        placeholder="Clearly articulate the problem or inefficiency your solution targets in the market."
                        value={problemSolved}
                        onChange={(e) => setProblemSolved(e.target.value)}
                        className="w-full p-4 text-xl rounded-lg border-2 focus:ring-2 resize-none"
                        style={{
                            backgroundColor: COLORS.BACKGROUND,
                            borderColor: COLORS.STROKE, // <-- NEON BLUE Detail
                            color: COLORS.TEXT_WHITE,
                            outlineColor: COLORS.STROKE,
                            boxShadow: `0 0 5px ${COLORS.STROKE}30`,
                        }}
                    />
                </div>

                {/* CARD 2: Project Summary */}
                <div 
                    className="p-8 rounded-xl border-2 shadow-2xl"
                    style={{ 
                        backgroundColor: COLORS.CARD_BG, 
                        borderColor: COLORS.PRIMARY_ACCENT, // <-- NEON GREEN
                        boxShadow: `0 0 20px ${COLORS.PRIMARY_ACCENT}50`, 
                    }}
                >
                    <h2 className="text-3xl font-bold mb-6" style={{ color: COLORS.TEXT_WHITE }}>
                        Project Summary
                    </h2>
                    <label htmlFor="projectSummary" className="block text-xl font-medium mb-1" style={{ color: COLORS.TEXT_WHITE }}>
                        Provide a brief resume of your project. (Required)
                    </label>
                    <textarea
                        id="projectSummary"
                        rows="6"
                        placeholder="A concise, high-level overview of your project, its solution, and its mission."
                        value={projectSummary}
                        onChange={(e) => setProjectSummary(e.target.value)}
                        className="w-full p-4 text-xl rounded-lg border-2 focus:ring-2 resize-none"
                        style={{
                            backgroundColor: COLORS.BACKGROUND,
                            borderColor: COLORS.STROKE, // <-- NEON BLUE Detail
                            color: COLORS.TEXT_WHITE,
                            outlineColor: COLORS.STROKE,
                            boxShadow: `0 0 5px ${COLORS.STROKE}30`,
                        }}
                    />
                </div>
            </div>
        </section>
        
        {/* ========================================================== */}
        {/* 4. SECTION: FUNDING AND ACTION (NEW CARD) */}
        {/* ========================================================== */}
        <section className="pb-8 pt-4 px-8 max-w-5xl mx-auto">
            <div 
                className="p-8 rounded-xl border-2 shadow-2xl"
                style={{ 
                    backgroundColor: COLORS.CARD_BG, 
                    borderColor: COLORS.STROKE, // Using NEON BLUE for the overall funding container
                    boxShadow: `0 0 20px ${COLORS.STROKE}50`, 
                }}
            >
                <h2 className="text-4xl font-bold mb-8" style={{ color: COLORS.TEXT_WHITE }}>
                    Funding Request
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
                    
                    {/* Column 1: Requested amount (Input) */}
                    <div className="text-left space-y-3">
                        <label className="text-xl font-semibold uppercase block" htmlFor="requestedAmount" style={{ color: COLORS.TEXT_WHITE }}>
                            Requested Amount (USD)
                        </label>
                        <input
                            id="requestedAmount"
                            type="number"
                            placeholder="Ex: 30000"
                            value={requestedAmount}
                            onChange={(e) => setRequestedAmount(e.target.value)}
                            className="w-full p-3 text-2xl font-extrabold rounded-lg border-2 focus:ring-2"
                            style={{
                                backgroundColor: COLORS.BACKGROUND,
                                borderColor: COLORS.STROKE,
                                color: COLORS.PRIMARY_ACCENT, // Green for amount display
                                outlineColor: COLORS.STROKE,
                                boxShadow: `0 0 5px ${COLORS.STROKE}30`,
                            }}
                        />
                        <select
                            value={fundingStage}
                            onChange={(e) => setFundingStage(e.target.value)}
                            className="w-full p-2 text-base rounded-lg border-2"
                            style={{
                                backgroundColor: COLORS.BACKGROUND,
                                borderColor: COLORS.STROKE,
                                color: COLORS.TEXT_WHITE,
                                outlineColor: COLORS.STROKE,
                            }}
                        >
                            <option value="Pre-Seed">Pre-Seed</option>
                            <option value="Seed">Seed</option>
                            <option value="Series A">Series A</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Column 2: Equity offered (Input) */}
                    <div className="text-left md:text-center space-y-3">
                        <label className="text-xl font-semibold uppercase block" htmlFor="equityOffered" style={{ color: COLORS.TEXT_WHITE }}>
                            Equity Offered (%)
                        </label>
                        <input
                            id="equityOffered"
                            type="number"
                            placeholder="Ex: 8"
                            value={equityOffered}
                            onChange={(e) => setEquityOffered(e.target.value)}
                            className="w-full p-3 text-2xl font-extrabold rounded-lg border-2 focus:ring-2"
                            style={{
                                backgroundColor: COLORS.BACKGROUND,
                                borderColor: COLORS.STROKE,
                                color: COLORS.PRIMARY_ACCENT, // Green for amount display
                                outlineColor: COLORS.STROKE,
                                boxShadow: `0 0 5px ${COLORS.STROKE}30`,
                            }}
                        />
                        <p className="text-base pt-2 md:pt-4" style={{ color: COLORS.TEXT_WHITE }}>
                            Participação Acionária
                        </p>
                    </div>

                    {/* Column 3: Action Buttons (Right) */}
                    <div className="flex flex-col space-y-5 md:items-end md:text-right"> 
                        
                        {/* Button 1: SUBMIT YOUR STARTUP (Solid Purple Neon with White Text) */}
                        <button 
                            className="w-full md:w-auto px-8 py-4 text-lg font-bold rounded-lg uppercase transition duration-300 transform hover:scale-[1.05] shadow-lg"
                            style={{ 
                                backgroundColor: COLORS.SECONDARY_ACCENT, // <-- ROXO NEON
                                color: COLORS.TEXT_WHITE, // <-- BRANCO
                                boxShadow: `0 0 15px ${COLORS.SECONDARY_ACCENT}`, // <-- ROXO NEON SHADOW
                            }}
                            onClick={() => console.log('Submit your Startup clicked')}
                        >
                            Submit your Startup
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


        {/* Submission Button and Message */}
        <section className="pb-24 pt-4 px-8 max-w-5xl mx-auto">
            {/* Submission Button (Main action - Text color set to TEXT_WHITE) */}
            <div className="pt-4">
                <button
                    onClick={handleRegistration}
                    disabled={isSubmitting || !isAuthReady || !db}
                    className={`w-full py-4 text-xl font-bold rounded-lg uppercase transition duration-300 transform ${
                        (isSubmitting || !isAuthReady || !db)
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:scale-[1.01] hover:opacity-90'
                    }`}
                    style={{ 
                        backgroundColor: COLORS.SECONDARY_ACCENT, // Neon Purple 
                        color: COLORS.TEXT_WHITE, // <-- Texto em Branco
                        boxShadow: `0 0 15px ${COLORS.SECONDARY_ACCENT}80`,
                    }}
                >
                    {isSubmitting ? 'SUBMITTING...' : 'REGISTER AND SUBMIT COMPLETE FORM'}
                </button>
            </div>
            
            {/* Submission Status Message */}
            {submissionMessage && (
                <p 
                    className={`mt-3 text-lg text-center font-medium p-4 rounded-lg ${
                        submissionMessage.type === 'error' ? 'bg-red-900 border-red-500' : 
                        submissionMessage.type === 'success' ? 'bg-green-900 border-green-500' : 'bg-gray-700 border-gray-500'
                    } border`}
                    style={{ 
                        color: submissionMessage.type === 'error' ? '#FF5555' : 
                               submissionMessage.type === 'success' ? COLORS.PRIMARY_ACCENT : COLORS.TEXT_WHITE 
                    }}
                >
                    {submissionMessage.text}
                </p>
            )}

            {/* Loading Indicator for Auth */}
            {!isAuthReady && (
                <p className="text-center text-lg mt-4" style={{ color: COLORS.STROKE }}> 
                    Connecting to NodeHub Data...
                </p>
            )}
        </section>

        {/* Contract Modal Overlay */}
        <ContractModal 
            isVisible={showContractModal} 
            onClose={() => setShowContractModal(false)} 
        />
      </div>
    );
}
