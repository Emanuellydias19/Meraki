"use client";   

import React, { useState } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react'; // Importando ícone para o select e alertas

// 1. Definição da Interface de Dados para Type Safety
interface StartupFormData {
  name: string;
  slogan: string;
  description: string;
  category: string;
  targetAmount: string; // Mantido como string para melhor manipulação de inputs financeiros
  deadline: string;
  website: string;
  twitter: string;
}

// 6. Tipagem do Placeholder DashboardLayout
const DashboardLayout: React.FC<React.PropsWithChildren<object>> = ({ children }) => (
  // 8. Refatoração do Placeholder para usar classes Tailwind
  <div className="min-h-screen bg-[#121A21] text-white font-inter">
    <header className="py-4 px-6 shadow-xl bg-[#092C4C]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-extrabold text-[#BD2EF0]">NodeHub Dashboard</h2>
      </div>
    </header>
    <main className="pt-8 pb-12">
      {children}
    </main>
  </div>
);

// Componente reutilizável para inputs
const CustomInput: React.FC<{
  label: string;
  name: keyof StartupFormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  inputMode?: 'text' | 'numeric' | 'url';
  isTextArea?: boolean;
}> = ({ label, name, value, onChange, placeholder, type = 'text', required = false, inputMode = 'text', isTextArea = false }) => {

  const inputClasses = "w-full px-4 py-3 rounded-lg text-white text-lg bg-[#053752] border border-[#62C2E8] focus:outline-none focus:ring-2 focus:ring-[#62C2E8] placeholder-gray-500 transition duration-150";

  return (
    <div>
      <label className="block text-xl font-medium mb-2 text-white">
        {label} {required && <span className="text-[#BD2EF0]">*</span>}
      </label>
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${inputClasses} h-40 resize-none`}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClasses}
          required={required}
          inputMode={inputMode}
        />
      )}
    </div>
  );
};

// Componente para Select
const CustomSelect: React.FC<{
  label: string;
  name: keyof StartupFormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: { value: string, label: string }[];
}> = ({ label, name, value, onChange, required = false, options }) => (
  <div className="relative">
    <label className="block text-xl font-medium mb-2 text-white">
      {label} {required && <span className="text-[#BD2EF0]">*</span>}
    </label>
    <select
      name={name}
      value={value}
      
      // 7. Adição de appearance-none para corrigir o estilo do seletor
      className="w-full px-4 py-3 rounded-lg text-white text-lg bg-[#053752] border border-[#62C2E8] focus:outline-none focus:ring-2 focus:ring-[#62C2E8] appearance-none cursor-pointer transition duration-150"
      onChange={onChange} // Tipagem simplificada no onChange
      required={required}
      style={{
        // Estilo inline para o ícone customizado do seletor (arrow down)
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23ffffff'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.75rem center',
        paddingRight: '2.5rem',
      }}
    >
      <option value="" disabled className="text-gray-500 bg-[#092C4C]">Select a category</option>
      {options.map(option => (
        <option key={option.value} value={option.value} className="bg-[#092C4C] text-white">
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 mt-3 pointer-events-none w-5 h-5 text-white" />
  </div>
);


export default function CreateStartupPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  
  // 2. Adição de 'slogan' ao estado inicial e 16. Uso de tipagem explícita
  const [formData, setFormData] = useState<StartupFormData>({
    name: "",
    slogan: "",
    description: "",
    category: "",
    targetAmount: "",
    deadline: "",
    website: "",
    twitter: "",
  });

  // 10. Tipagem clara do handleChange
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (nextStep: number) => {
    setError(""); // Limpa erros ao tentar avançar

    // 5. Validação de Etapa 1
    if (step === 1) {
      if (!formData.name.trim()) {
        setError("The Startup Name is mandatory to proceed.");
        return;
      }
    }
    setStep(nextStep);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create startup:", formData);
    // TODO: Integrate with API
    alert("Startup Profile Submitted! Check console for data."); // Usando alert apenas para debug
  };
  
  const stepContainerClasses = "rounded-xl p-8 space-y-8 border-2 bg-slate-800 border-[#62C2E8] shadow-xl shadow-blue-500/30 transition-all duration-500 ease-in-out";
  const buttonPrimaryClasses = "px-8 py-4 bg-[#BD2EF0] text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-[1.02] text-xl shadow-lg shadow-[#BD2EF0]/50";
  const buttonSecondaryClasses = "px-8 py-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-300 transform hover:scale-[1.02] text-xl";

  const categoryOptions = [
    { value: "tech", label: "Tech" },
    { value: "fintech", label: "Fintech" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "blockchain", label: "Blockchain" },
    { value: "sustainability", label: "Sustainability" },
  ];

  return (
    <DashboardLayout>
      {/* 11. Melhoria da Responsividade */}
      <div className="max-w-4xl mx-auto space-y-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center">
          <span className="text-[#BD2EF0]">Create</span> Your Startup Profile
        </h1>

        {/* Progress Indicator */}
        <div className="flex gap-4 max-w-lg mx-auto">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-3 rounded-full transition-all duration-500 ${
                s <= step 
                  ? 'bg-[#BD2EF0] shadow-md shadow-[#BD2EF0]/50' 
                  : 'bg-gray-800'
              }`}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg text-lg">
            <AlertCircle className="w-6 h-6 mr-3" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Idea Title */}
          {step === 1 && (
            <div className={stepContainerClasses}>
              <h2 className="text-3xl font-bold text-white">Your Startup&apos;s Name & Slogan</h2>
              <p className="text-lg text-gray-400">Start by giving your project a captivating title.</p>
              
              <CustomInput
                label="Startup Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Quantum Leap Labs"
                required
              />

              <CustomInput
                label="Slogan (Optional)"
                name="slogan"
                value={formData.slogan}
                onChange={handleChange}
                placeholder="e.g., Innovating the future of decentralized finance."
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleNextStep(2)}
                  className={buttonPrimaryClasses}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className={stepContainerClasses}>
              <h2 className="text-3xl font-bold text-white">Detailed Information</h2>
              <p className="text-lg text-gray-400">Tell us more about your vision and how it impacts the world.</p>

              <CustomInput
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your startup in detail, its mission, and what makes it unique."
                required
                isTextArea
              />

              <CustomSelect
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                options={categoryOptions}
              />

              <div className="flex gap-4 justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={buttonSecondaryClasses}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => handleNextStep(3)}
                  className={buttonPrimaryClasses}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contract Information */}
          {step === 3 && (
            <div className={stepContainerClasses}>
              <h2 className="text-3xl font-bold text-white">
                Funding & Contact Information
              </h2>
              <p className="text-lg text-gray-400">Specify your funding needs and provide contact details.</p>

              {/* 9. Input de Valor Monetário (type=text e inputMode=numeric) */}
              <CustomInput
                label="Target Amount (USD)"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                placeholder="e.g., 100000"
                type="text"
                inputMode="numeric"
                required
              />

              <CustomInput
                              label="Funding Deadline"
                              name="deadline"
                              value={formData.deadline}
                              onChange={handleChange}
                              type="date"
                              required placeholder={''}              />

              <CustomInput
                label="Website URL"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourstartup.com"
                type="url"
                inputMode="url"
                required
              />

              <CustomInput
                label="Twitter/X Handle (Optional)"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="@yourstartup"
                required={false}
              />

              <div className="flex gap-4 justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={buttonSecondaryClasses}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={buttonPrimaryClasses}
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
