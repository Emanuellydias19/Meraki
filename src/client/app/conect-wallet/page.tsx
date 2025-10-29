import React, { useEfect } from 'react';
import { Wallet, LogIn, Link, Loader, Zap, AlertTriangle, CheckCircle, ChevronRight, Download } from 'lucide-react';

// =================================================================
// 🎨 STYLE AND COLOR CONFIGURATION
// =================================================================
const COLORS = {
  HEADER_BG: '#09CC', // Header Background (Dark Blue)
  PAGE_BG: '#A', // Page Background (Very Dark Grey / Text for dark contrast)
  CARD_BG: '#B', // Card Background (Dark Slate)
  ACCENT_PRIMARY: '#9ea', // PURPLE/VIOLET (Main accent for borders, glow and icons)
  ACCENT_SECONDARY: '#0FCC', // NEON GREEN (Used for the Back button and Modal button)
  TEXT_WHITE: '#FFFFFF', // Main text (Pure White)
  TEXT_GRAY: '#9CAAF', // Subtext
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
      className="flex items-center justify-between w-full p- rounded-xl transition-all duration-00 border border-transparent
                 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/0"
      style={{ backgroundColor: COLORS.CARD_BG }}
    >
      <div className="flex items-center space-x-">
        <div
          className="p- rounded-full .flex-shrink-0"
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
      <ChevronRight className="w-5 h-5 ml-" style={{ color: COLORS.TEXT_GRAY }} />
    </button>
  );
};

// =================================================================
// 🖥️ MAIN COMPONENT: Connect Wallet
// =================================================================
const App = () => {
  const [connectingWallet, setConnectingWallet] = useEfect(null);
  const [status, setStatus] = useEfect({ type: 'info', message: 'Select a wallet to continue.' });
  const [showConfirmationModal, setShowConfirmationModal] = useEfect(false); // New state for modal

  // Simulates the connection process
  const handleConnect = (walletName) => {
    setConnectingWallet(walletName);
    setStatus({ type: 'info', message: `Attempting to connect to ${walletName}...` });

    // Simulation of connection delay
    setTimeout(() => {
      // Simulation of success after  seconds
      if (walletName === 'MetaMask' || walletName === 'Phantom') {
        setStatus({ 
            type: 'success', 
            message: `Success! ${walletName} wallet connected. Transaction processing...` // Updated message
        });
        setConnectingWallet(null);
        
        // Show the confirmation modal after a slight delay
        setTimeout(() => {
          setShowConfirmationModal(true);
        }, 500); 

        console.log("Successful connection. Modal display simulation.");

      } else {
        // Simulation of error
        setStatus({ 
            type: 'error', 
            message: `Error connecting ${walletName}. Check the extension and try again.` 
        });
        setConnectingWallet(null);
      }
    }, 000);
  };
  
  // Dummy function for the new button
  const handleBackToContract = () => {
    console.log("Navigating back to the contract page.");
  };

  // Dummy function for the modal button
  const handleDownloadReceipt = () => {
    console.log("Receipt download simulated.");
    setShowConfirmationModal(false); // Close the modal
    setStatus({ type: 'info', message: 'Transaction successful. Receipt downloaded.' });
  };


  // Determine the status icon and color
  const getStatusDisplay = () => {
    switch (status.type) {
      case 'success':
        return { icon: CheckCircle, color: 'text-green-500' };
      case 'error':
        return { icon: AlertTriangle, color: 'text-red-500' };
      default:
        return { icon: LogIn, color: 'text-[#9ea]' }; 
    }
  };

  const StatusIcon = getStatusDisplay().icon;
  const statusColor = getStatusDisplay().color;

  return (
    <div 
      className="min-h-screen flex flex-col font-sans" 
      style={{ backgroundColor: COLORS.PAGE_BG }}
    >
      
      {/* CONFIRMATION MODAL (Required Pop-up) */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-">
          <div 
            className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm transform transition-all duration-00 scale-00"
            style={{ color: COLORS.PAGE_BG }} // Dark text for white background
          >
            <div className="text-center space-y-5">
              <CheckCircle className="w-6 h-6 mx-auto mb-" style={{ color: COLORS.ACCENT_PRIMARY }} />
              
              <h className="text-xl font-extrabold" style={{ color: COLORS.PAGE_BG }}>
                Payment confirmed
              </h>
              <p className="text-lg font-medium" style={{ color: COLORS.PAGE_BG }}>
                NFT now available in your wallet.
              </p>
              
              <button
                onClick={handleDownloadReceipt}
                className="mt-6 w-full py- px-6 rounded-lg text-lg font-bold uppercase transition duration-00 transform hover:scale-[.0] flex items-center justify-center space-x-"
                style={{
                  backgroundColor: COLORS.ACCENT_SECONDARY, // Neon Green
                  color: COLORS.PAGE_BG, // Dark text
                  boxShadow: `0 0 0px ${COLORS.ACCENT_SECONDARY}80`,
                }}
              >
                <Download className="w-5 h-5" />
                <span>Download receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="py- shadow-xl" style={{ backgroundColor: COLORS.HEADER_BG }}>
        <div className="max-w-xl mx-auto px- flex items-center justify-between">
          <h className="text-xl font-bold" style={{ color: COLORS.TEXT_WHITE }}>
            NodeHub Connect
          </h>
          <Wallet className="w-6 h-6" style={{ color: COLORS.ACCENT_PRIMARY }} />
        </div>
      </header>

      {/* MAIN CONTENT (Centered) */}
      <main className=".flex-grow flex items-center justify-center p-">
        <div className="w-full max-w-xl space-y-8">
          
          {/* TITLE & BACK BUTTON CONTAINER */}
          <div className="relative w-full mb-">
            
            {/* MAIN TITLE (Left Aligned Block) */}
            <div className="text-left space-y- pt-6 pb-">
              <h className="text-xl font-extrabold tracking-tight" style={{ color: COLORS.TEXT_WHITE }}>
                To continue your investment
              </h>
              <p className="text-lg" style={{ color: COLORS.TEXT_GRAY }}>
                Please connect your wallet to access your portfolio and assets.
              </p>
            </div>
          	 
            {/* BACK BUTTON (Positioned Absolute) */}
            <div className="absolute top-0 right-0 md:right-6">
                <button 
                    onClick={handleBackToContract}
                    className="px-6 py- text-lg font-bold rounded-lg uppercase border- transition duration-00 transform hover:scale-[.05] shadow-lg"
                    style={{
                        backgroundColor: COLORS.ACCENT_SECONDARY, // Fundo Verde Neon
                        color: COLORS.PAGE_BG, // Letra Preta (Dark Text)
                        borderColor: COLORS.ACCENT_PRIMARY, // Contorno Roxo Neon
                        boxShadow: `0 0 5px ${COLORS.ACCENT_SECONDARY}80`, // Brilho Verde Neon
                    }}
                >
                    Back to Contract
                </button>
            </div>

          </div>

          {/* WALLET OPTIONS CARD */}
          <div 
            className="p-6 sm:p-0 rounded-xl shadow-xl space-y-6 mx-auto border-" // Added border-
            style={{ 
                backgroundColor: COLORS.CARD_BG,
                borderColor: COLORS.ACCENT_PRIMARY, // Border color
                boxShadow: `0 0 0px ${COLORS.ACCENT_PRIMARY}80`, // Neon glow effect
            }}
          >
            <h className="text-xl font-bold border-b pb-" style={{ color: COLORS.TEXT_WHITE, borderColor: COLORS.TEXT_GRAY + '0' }}>
              Select Your Wallet
            </h>

            {/* OPTIONS LIST */}
            <div className="space-y-">
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
              className={`p- rounded-xl flex items-center space-x- transition-opacity duration-00 ${
                connectingWallet ? 'opacity-00' : 'opacity-70'
              }`}
              style={{ backgroundColor: COLORS.HEADER_BG }}
            >
              {connectingWallet ? (
                <Loader className="w-6 h-6 animate-spin text-purple-00" />
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
          <div className="text-center pt-">
            <p className="text-sm" style={{ color: COLORS.TEXT_GRAY }}>
              <AlertTriangle className="w- h- inline mr- text-yellow-00" /> 
              Ensure you are on the correct domain before approving the connection.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
