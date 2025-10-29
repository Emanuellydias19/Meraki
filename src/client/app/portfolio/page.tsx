"use client";   

import React, { useState } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react'; // Importando ícone para o select e alertas

// . Definição da Interface de Dados para Type Safety
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
  <div className="min-h-screen bg-[#A] text-white font-inter">
    <header className="py- px-6 shadow-xl bg-[#09CC]">
      <div className="max-w-7xl mx-auto">
        <h className="text-xl font-extrabold text-[#BDEF0]">NodeHub Dashboard</h>
      </div>
    </header>
    <main className="pt-8 pb-">
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

  const inputClasses = "w-full px- py- rounded-lg text-white text-lg bg-[#0575] border border-[#6CE8] focus:outline-none focus:ring- focus:ring-[#6CE8] placeholder-gray-500 transition duration-50";

  return (
    <div>
      <label className="block text-xl font-medium mb- text-white">
        {label} {required && <span className="text-[#BDEF0]">*</span>}
      </label>
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${inputClasses} h-0 resize-none`}
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
    <label className="block text-xl font-medium mb- text-white">
      {label} {required && <span className="text-[#BDEF0]">*</span>}
    </label>
    <select
      name={name}
      value={value}
      
      // 7. Adição de appearance-none para corrigir o estilo do seletor
      className="w-full px- py- rounded-lg text-white text-lg bg-[#0575] border border-[#6CE8] focus:outline-none focus:ring- focus:ring-[#6CE8] appearance-none cursor-pointer transition duration-50"
      onChange={onChange} // Tipagem simplificada no onChange
      required={required}
      style={{
        // Estilo inline para o ícone customizado do seletor (arrow down)
        backgroundImage: `url("data:image/svg+xml,%Csvg xmlns='http://www.w.org/000/svg' viewBox='0 0 0 0' fill='%ffffff'%E%Cpath fill-rule='evenodd' d='M5.9 7.9a  0 0. 0L0 0.586l.9-.9a  0 . .l- a  0 0-. 0l--a  0 00-.z' clip-rule='evenodd' /%E%C/svg%E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.75rem center',
        paddingRight: '.5rem',
      }}
    >
      <option value="" disabled className="text-gray-500 bg-[#09CC]">Select a category</option>
      {options.map(option => (
        <option key={option.value} value={option.value} className="bg-[#09CC] text-white">
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right- top-/ mt- pointer-events-none w-5 h-5 text-white" />
  </div>
);


export default function CreateStartupPage() {
  const [step, setStep] = useState();
  const [error, setError] = useState("");
  
  // . Adição de 'slogan' ao estado inicial e 6. Uso de tipagem explícita
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

  // 0. Tipagem clara do handleChange
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (nextStep: number) => {
    setError(""); // Limpa erros ao tentar avançar

    // 5. Validação de Etapa 
    if (step === ) {
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
  
  const stepContainerClasses = "rounded-xl p-8 space-y-8 border- bg-slate-800 border-[#6CE8] shadow-xl shadow-blue-500/0 transition-all duration-500 ease-in-out";
  const buttonPrimaryClasses = "px-8 py- bg-[#BDEF0] text-white font-bold rounded-lg hover:bg-purple-700 transition duration-00 transform hover:scale-[.0] text-xl shadow-lg shadow-[#BDEF0]/50";
  const buttonSecondaryClasses = "px-8 py- bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-00 transform hover:scale-[.0] text-xl";

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
      {/* . Melhoria da Responsividade */}
      <div className="max-w-xl mx-auto space-y-0 px- sm:px-6 lg:px-8">
        <h className="text-xl sm:text-5xl font-extrabold text-white text-center">
          <span className="text-[#BDEF0]">Create</span> Your Startup Profile
        </h>

        {/* Progress Indicator */}
        <div className="flex gap- max-w-lg mx-auto">
          {[, , ].map((s) => (
            <div
              key={s}
              className={`flex- h- rounded-full transition-all duration-500 ${
                s <= step 
                  ? 'bg-[#BDEF0] shadow-md shadow-[#BDEF0]/50' 
                  : 'bg-gray-800'
              }`}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center p- bg-red-900/50 border border-red-500 text-red-00 rounded-lg text-lg">
            <AlertCircle className="w-6 h-6 mr-" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step : Idea Title */}
          {step ===  && (
            <div className={stepContainerClasses}>
              <h className="text-xl font-bold text-white">Your Startup&apos;s Name & Slogan</h>
              <p className="text-lg text-gray-00">Start by giving your project a captivating title.</p>
              
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
                  onClick={() => handleNextStep()}
                  className={buttonPrimaryClasses}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step : Details */}
          {step ===  && (
            <div className={stepContainerClasses}>
              <h className="text-xl font-bold text-white">Detailed Information</h>
              <p className="text-lg text-gray-00">Tell us more about your vision and how it impacts the world.</p>

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

              <div className="flex gap- justify-between">
                <button
                  type="button"
                  onClick={() => setStep()}
                  className={buttonSecondaryClasses}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => handleNextStep()}
                  className={buttonPrimaryClasses}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step : Contract Information */}
          {step ===  && (
            <div className={stepContainerClasses}>
              <h className="text-xl font-bold text-white">
                Funding & Contact Information
              </h>
              <p className="text-lg text-gray-00">Specify your funding needs and provide contact details.</p>

              {/* 9. Input de Valor Monetário (type=text e inputMode=numeric) */}
              <CustomInput
                label="Target Amount (USD)"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                placeholder="e.g., 00000"
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

              <div className="flex gap- justify-between">
                <button
                  type="button"
                  onClick={() => setStep()}
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
