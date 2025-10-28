import React, { useState } from 'react';
import { Wallet, LogIn, Link, Loader2, Zap, AlertTriangle, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

// =================================================================
// 🎨 STYLE AND COLOR CONFIGURATION
// =================================================================
const COLORS = {
  HEADER_BG: '#092C4C', // Header Background (Dark Blue)
  PAGE_BG: '#121A21', // Page Background (Very Dark Grey / Text for dark contrast)
  CARD_BG: '#2B3342', // Card Background (Dark Slate)
  ACCENT_PRIMARY: '#9333ea', // PURPLE/VIOLET (Main accent for borders, glow and icons)
  ACCENT_SECONDARY: '#01F4CC', // NEON GREEN (Used for the Back button)
  TEXT_WHITE: '#FFFFFF', // Main text (Pure White)
  TEXT_GRAY: '#9CA3AF', // Subtext
};

// =================================================================
// 🛠️ MOCKED WALLET DATA
// =================================================================
const WALLET_OPTIONS = [
  { name: "Phantom", icon: Wallet, description: "Popular Solana wallet, recommended." },
  { name: "MetaMask", icon: Zap, description: "The most widely used wallet, for EVM networks." },
  { name: "Solflare", icon: CheckCircle, description: "Hardware and desktop wallet." },
  { name: "WalletConnect", icon: Link, description: "Connect using QR codes and deep links." },
];

// =================================================================
// 💻 AUXILIARY COMPONENT: Wallet Option
// =================================================================
const WalletOption = ({ name, icon: Icon, description, onConnect }) => {
  return (
    <button
      onClick={() => onConnect(name)}
      className="flex items-center justify-between w-full p-4 rounded-xl transition-all duration-300 border border-transparent
                 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
      style={{ backgroundColor: COLORS.CARD_BG }}
    >
      <div className="flex items-center space-x-4">
        <div
          className="p-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: COLORS.ACCENT_PRIMARY }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-left">
          <p className="text-xl font-semibold" style={{ color: COLORS.TEXT_WHITE }}>
            {name}
          </p>
          <p className="text-sm" style={{ color: COLORS.TEXT_GRAY }}>
            {description}
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 ml-4" style={{ color: COLORS.TEXT_GRAY }} />
    </button>
  );
};

// =================================================================
// 🖥️ MAIN COMPONENT: Connect Wallet
// =================================================================
const App = () => {
  const [connectingWallet, setConnectingWallet] = useState(null);
  const [status, setStatus] = useState({ type: 'info', message: 'Select a wallet to continue.' });

  // Simulates the connection process
  const handleConnect = (walletName) => {
    setConnectingWallet(walletName);
    setStatus({ type: 'info', message: `Attempting to connect to ${walletName}...` });

    // Simulation of connection delay
    setTimeout(() => {
      // Simulation of success after 2 seconds
      if (walletName === 'MetaMask' || walletName === 'Phantom') {
        setStatus({ 
            type: 'success', 
            message: `Success! ${walletName} wallet connected. Redirecting...` 
        });
        setConnectingWallet(null);
        // In a real application, you would handle redirection here
        console.log("Successful connection. Redirection simulation.");
      } else {
        // Simulation of error
        setStatus({ 
            type: 'error', 
            message: `Error connecting ${walletName}. Check the extension and try again.` 
        });
        setConnectingWallet(null);
      }
    }, 2000);
  };
  
  // Dummy function for the new button
  const handleBackToContract = () => {
    // In a real app, this would navigate the user back to the contract viewing page.
    console.log("Navigating back to the contract page.");
    // NOTE: Avoids using alert() as per environment restrictions.
  };

  // Determine the status icon and color
  const getStatusDisplay = () => {
    // Using cooler, standardized colors for status
    switch (status.type) {
      case 'success':
        return { icon: CheckCircle, color: 'text-green-500' };
      case 'error':
        return { icon: AlertTriangle, color: 'text-red-500' };
      default:
        // The "default" status now uses the Purple color (ACCENT_PRIMARY)
        return { icon: LogIn, color: 'text-[#9333ea]' }; 
    }
  };

  const StatusIcon = getStatusDisplay().icon;
  const statusColor = getStatusDisplay().color;

  return (
    <div 
      className="min-h-screen flex flex-col font-sans" 
      style={{ backgroundColor: COLORS.PAGE_BG }}
    >
      {/* HEADER */}
      <header className="py-4 shadow-xl" style={{ backgroundColor: COLORS.HEADER_BG }}>
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: COLORS.TEXT_WHITE }}>
            NodeHub Connect
          </h1>
          <Wallet className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
        </div>
      </header>

      {/* MAIN CONTENT (Centered) */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-8">
          
          {/* TITLE & BACK BUTTON CONTAINER */}
          <div className="relative w-full mb-12">
            
            {/* MAIN TITLE (Left Aligned Block) */}
            <div className="text-left space-y-2 pt-6 pb-2">
              <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: COLORS.TEXT_WHITE }}>
                To continue your investment
              </h1>
              <p className="text-lg" style={{ color: COLORS.TEXT_GRAY }}>
                Please connect your wallet to access your portfolio and assets.
              </p>
            </div>
              
            {/* BACK BUTTON (Positioned Absolute to the right of the title area, MOVIDO PARA top-10) */}
            <div className="absolute top-10 right-16">
                <button 
                    onClick={handleBackToContract}
                    className="px-6 py-3 text-lg font-bold rounded-lg uppercase border-2 transition duration-300 transform hover:scale-[1.05] shadow-lg"
                    style={{
                        backgroundColor: COLORS.ACCENT_SECONDARY, // Fundo Verde Neon
                        color: COLORS.PAGE_BG, // Letra Preta (Dark Text)
                        borderColor: COLORS.ACCENT_PRIMARY, // Contorno Roxo Neon
                        boxShadow: `0 0 15px ${COLORS.ACCENT_SECONDARY}80`, // Brilho Verde Neon
                    }}
                >
                    Back to Contract
                </button>
            </div>

          </div>

          {/* WALLET OPTIONS CARD */}
          <div 
            className="p-6 sm:p-10 rounded-3xl shadow-2xl space-y-6 mx-auto border-2" // Added border-2
            style={{ 
                backgroundColor: COLORS.CARD_BG,
                borderColor: COLORS.ACCENT_PRIMARY, // Border color
                boxShadow: `0 0 30px ${COLORS.ACCENT_PRIMARY}80`, // Neon glow effect
            }}
          >
            <h2 className="text-2xl font-bold border-b pb-4" style={{ color: COLORS.TEXT_WHITE, borderColor: COLORS.TEXT_GRAY + '30' }}>
              Select Your Wallet
            </h2>

            {/* OPTIONS LIST */}
            <div className="space-y-4">
              {WALLET_OPTIONS.map((wallet) => (
                <WalletOption
                  key={wallet.name}
                  {...wallet}
                  onConnect={handleConnect}
                />
              ))}
            </div>
            
            {/* CONNECTION STATUS */}
            <div 
              className={`p-4 rounded-xl flex items-center space-x-3 transition-opacity duration-300 ${
                connectingWallet ? 'opacity-100' : 'opacity-70'
              }`}
              style={{ backgroundColor: COLORS.HEADER_BG }}
            >
              {connectingWallet ? (
                <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
              ) : (
                <StatusIcon className={`w-6 h-6 ${statusColor}`} />
              )}
              <p className="text-base font-medium" style={{ color: COLORS.TEXT_WHITE }}>
                {connectingWallet 
                  ? `Awaiting confirmation in ${connectingWallet}...`
                  : status.message
                }
              </p>
            </div>
          </div>
          
          {/* Security Warning */}
          <div className="text-center pt-4">
            <p className="text-sm" style={{ color: COLORS.TEXT_GRAY }}>
              <AlertTriangle className="w-4 h-4 inline mr-1 text-yellow-400" /> 
              Ensure you are on the correct domain before approving the connection.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
