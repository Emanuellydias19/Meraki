"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";

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
    console.log("Criar startup:", formData);
    // TODO: Integrar com API
  };

  return (
    <DashboardLayout>
      <div className="w-[1160px] mx-auto space-y-8 py-12">
        <h1 className="text-3xl font-bold text-white">Criar Startup</h1>

        {/* Progress */}
        <div className="flex gap-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full ${
                s <= step ? "bg-accent" : "bg-gray-800"
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Título */}
          {step === 1 && (
            <div className="bg-gray-900 rounded-lg p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">Título da Ideia</h2>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome da sua startup"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
              />
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:opacity-90"
              >
                Próximo
              </button>
            </div>
          )}

          {/* Step 2: Detalhes */}
          {step === 2 && (
            <div className="bg-gray-900 rounded-lg p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">Detalhes</h2>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descreva sua startup"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Categoria
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="tech">Tech</option>
                  <option value="fintech">Fintech</option>
                  <option value="health">Saúde</option>
                  <option value="education">Educação</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:opacity-90"
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contrato */}
          {step === 3 && (
            <div className="bg-gray-900 rounded-lg p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">
                Informações de Contrato
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Valor Alvo (SOL)
                </label>
                <input
                  type="number"
                  name="targetAmount"
                  value={formData.targetAmount}
                  onChange={handleChange}
                  placeholder="1000"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data Limite
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:opacity-90"
                >
                  Publicar Startup
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}
