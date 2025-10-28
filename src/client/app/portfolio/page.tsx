PAGINA DE PORTIFÓLIO. 


import React, { useState } from 'react';

// --- Placeholder for DashboardLayout (Apenas para renderização) ---
// Em um projeto real, você importaria de "@/components/layout/DashboardLayout"
const DashboardLayout = ({ children }) => (
  <div style={{ backgroundColor: '#121A21', minHeight: '100vh', color: '#fff' }}>
    <header style={{ backgroundColor: '#092C4C' }} className="py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <h2 style={{ color: '#BD2EF0', fontSize: '1.5rem', fontWeight: 700 }}>NodeHub Dashboard</h2>
      </div>
    </header>
    <div className="pt-4 pb-12"> {/* Adicionado padding vertical para o conteúdo */}
        {children}
    </div>
  </div>
);
// --- FIM Placeholder DashboardLayout ---

// --- Definição de Cores ---
const COLORS = {
  BACKGROUND: '#092C4C', // Header/Darker Section Background
  PAGE_BG: '#121A21', // Main Page Background (Very Dark Grey)
  CARD_BG: '#2B3342', // Card Background (Dark Slate)
  ACCENT_PRIMARY: '#BD2EF0', // Purple Neon (Main Accent for buttons, progress)
  STROKE: '#62C2E8', // Blue Neon (Borders, subtle highlights)
  TEXT_WHITE: '#ffffff', // Pure White text
  TEXT_GRAY: '#9CA3AF', // Lighter gray text for descriptions
  INPUT_BG: '#053752', // Input background
};

export default function CreateStartupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    targetAmount: "",
    deadline: "",
    website: "",
    twitter: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create startup:", formData);
    // TODO: Integrate with API
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 py-12 px-4"> {/* Aumentei a largura para max-w-4xl e adicionei px-4 */}
        <h1 className="text-4xl font-extrabold text-white">Create Your Startup Profile</h1>

        {/* Progress Indicator */}
        <div className="flex gap-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-3 rounded-full ${ // Aumentei a altura da barra de progresso
                s <= step ? 'bg-purple-500 shadow-md shadow-purple-500/50' : 'bg-gray-800' // Adicionei sombra e usei cor roxa
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Idea Title */}
          {step === 1 && (
            <div
              className="rounded-lg p-8 space-y-6 border-2"
              style={{
                backgroundColor: COLORS.CARD_BG,
                borderColor: COLORS.STROKE, // Borda Azul Neon
                boxShadow: `0 0 20px ${COLORS.STROKE}30`, // Sombra sutil azul
              }}
            >
              <h2 className="text-3xl font-bold" style={{ color: COLORS.TEXT_WHITE }}>Your Startup's Name & Slogan</h2>
              <p className="text-lg" style={{ color: COLORS.TEXT_GRAY }}>Start by giving your project a captivating title.</p>
              
              <div>
                <label className="block text-xl font-medium mb-2" style={{ color: COLORS.TEXT_WHITE }}>
                  Startup Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Quantum Leap Labs"
                  className="w-full px-4 py-3 rounded-lg text-white text-lg focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: COLORS.INPUT_BG, 
                    borderColor: COLORS.STROKE, 
                    border: '1px solid',
                    color: COLORS.TEXT_WHITE,
                    '--tw-ring-color': COLORS.STROKE + '80' // Cor do anel de foco
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-medium mb-2" style={{ color: COLORS.TEXT_WHITE }}>
                  Slogan (Optional)
                </label>
                <input
                  type="text"
                  name="slogan" // Assumindo que você adicione 'slogan' ao formData
                  value={formData.slogan || ''} // Usar '' se slogan for undefined
                  onChange={handleChange}
                  placeholder="e.g., Innovating the future of decentralized finance."
                  className="w-full px-4 py-3 rounded-lg text-white text-lg focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: COLORS.INPUT_BG, 
                    borderColor: COLORS.STROKE, 
                    border: '1px solid',
                    color: COLORS.TEXT_WHITE,
                    '--tw-ring-color': COLORS.STROKE + '80'
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-[1.02] text-xl"
                style={{ backgroundColor: COLORS.ACCENT_PRIMARY, boxShadow: `0 0 15px ${COLORS.ACCENT_PRIMARY}50` }}
              >
                Next Step
              </button>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div
              className="rounded-lg p-8 space-y-6 border-2"
              style={{
                backgroundColor: COLORS.CARD_BG,
                borderColor: COLORS.STROKE, // Borda Azul Neon
                boxShadow: `0 0 20px ${COLORS.STROKE}30`,
              }}
            >
              <h2 className="text-3xl font-bold" style={{ color: COLORS.TEXT_WHITE }}>Detailed Information</h2>
              <p className="text-lg" style={{ color: COLORS.TEXT_GRAY }}>Tell us more about your vision and how it impacts the world.</p>

              <div>
                <label className="block text-xl font-medium mb-2" style={{ color: COLORS.TEXT_WHITE }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your startup in detail, its mission, and what makes it unique."
                  className="w-full px-4 py-3 rounded-lg text-white text-lg h-40 focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: COLORS.INPUT_BG, 
                    borderColor: COLORS.STROKE, 
                    border: '1px solid',
                    color: COLORS.TEXT_WHITE,
                    '--tw-ring-color': COLORS.STROKE + '80'
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-medium mb-2" style={{ color: COLORS.TEXT_WHITE }}>
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg text-white text-lg focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: COLORS.INPUT_BG, 
                    borderColor: COLORS.STROKE, 
                    border: '1px solid',
                    color: COLORS.TEXT_WHITE,
                    '--tw-ring-color': COLORS.STROKE + '80'
                  }}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="tech">Tech</option>
                  <option value="fintech">Fintech</option>
                  <option value="health">Health</option>
                  <option value="education">Education</option>
                  <option value="blockchain">Blockchain</option> {/* Added a new category */}
                  <option value="sustainability">Sustainability</option>
                </select>
              </div>

              <div className="flex gap-4 justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-8 py-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-300 transform hover:scale-[1.02] text-xl"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-[1.02] text-xl"
                  style={{ backgroundColor: COLORS.ACCENT_PRIMARY, boxShadow: `0 0 15px ${COLORS.ACCENT_PRIMARY}50` }}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contract Information */}
          {step === 3 && (
            <div
              className="rounded-lg p-8 space-y-6 border-2"
              style={{
                backgroundColor: COLORS.CARD_BG,
                borderColor: COLORS.STROKE, // Borda Azul Neon
                boxShadow: `0 0 20px ${COLORS.STROKE}30`,
              }}
            >
              <h2 className="text-3xl font-bold" style={{ color: COLORS.TEXT_WHITE }}>
                Funding & Contact Information
              </h2>
              <p className="text-lg" style={{ color: COLORS.TEXT_GRAY }}>Specify your funding needs and provide contact details.</p>

              <div>
                <label className="block text-xl font-medium mb-2" style={{ color: COLORS.TEXT_WHITE }}>
                  Target Amount (USD)
                </label>
                <input
                  type="number"
                  name="targetAmount"
                  value={formData.targetAmount}
                  onChange={handleChange}
                  placeholder="e.g., 100000"
                  className="w-full px-4 py-3 rounded-lg text-white text-lg focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: COLORS.INPUT_BG, 
                    borderColor: COLORS.STROKE, 
                    border: '1px solid',
                    color: COLORS.TEXT_WHITE,
                    '--tw-ring-color': COLORS.STROKE + '80'
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-medium mb-2" style={{ color: COLORS.TEXT_WHITE }}>
                  Funding Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg text-white text-lg focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: COLORS.INPUT_BG, 
                    borderColor: COLORS.STROKE, 
                    border: '1px solid',
                    color: COLORS.TEXT_WHITE,
                    '--tw-ring-color': COLORS.STROKE + '80'
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-medium mb-2" style={{ color: COLORS.TEXT_WHITE }}>
                  Website URL
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourstartup.com"
                  className="w-full px-4 py-3 rounded-lg text-white text-lg focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: COLORS.INPUT_BG, 
                    borderColor: COLORS.STROKE, 
                    border: '1px solid',
                    color: COLORS.TEXT_WHITE,
                    '--tw-ring-color': COLORS.STROKE + '80'
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-medium mb-2" style={{ color: COLORS.TEXT_WHITE }}>
                  Twitter/X Handle
                </label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="@yourstartup"
                  className="w-full px-4 py-3 rounded-lg text-white text-lg focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: COLORS.INPUT_BG, 
                    borderColor: COLORS.STROKE, 
                    border: '1px solid',
                    color: COLORS.TEXT_WHITE,
                    '--tw-ring-color': COLORS.STROKE + '80'
                  }}
                />
              </div>

              <div className="flex gap-4 justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-8 py-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-300 transform hover:scale-[1.02] text-xl"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-[1.02] text-xl"
                  style={{ backgroundColor: COLORS.ACCENT_PRIMARY, boxShadow: `0 0 15px ${COLORS.ACCENT_PRIMARY}50` }}
                >
                  Publish Startup
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}
