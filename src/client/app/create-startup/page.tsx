"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";

export default function CreateStartupPage() {
  const [step, setStep] = useState();
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
      <div className="w-[60px] mx-auto space-y-8 py-">
        <h className="text-xl font-bold text-white">Criar Startup</h>

        {/* Progress */}
        <div className="flex gap-">
          {[, , ].map((s) => (
            <div
              key={s}
              className={`flex- h- rounded-full ${
                s <= step ? "bg-accent" : "bg-gray-800"
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step : Título */}
          {step ===  && (
            <div className="bg-gray-900 rounded-lg p-8 space-y-6">
              <h className="text-xl font-bold text-white">Título da Ideia</h>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome da sua startup"
                className="w-full px- py- bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
              />
              <button
                type="button"
                onClick={() => setStep()}
                className="px-6 py- bg-accent text-white font-semibold rounded-lg hover:opacity-90"
              >
                Próximo
              </button>
            </div>
          )}

          {/* Step : Detalhes */}
          {step ===  && (
            <div className="bg-gray-900 rounded-lg p-8 space-y-6">
              <h className="text-xl font-bold text-white">Detalhes</h>

              <div>
                <label className="block text-sm font-medium text-gray-00 mb-">
                  Descrição
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descreva sua startup"
                  className="w-full px- py- bg-gray-800 border border-gray-700 rounded-lg text-white h-"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-00 mb-">
                  Categoria
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px- py- bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="tech">Tech</option>
                  <option value="fintech">Fintech</option>
                  <option value="health">Saúde</option>
                  <option value="education">Educação</option>
                </select>
              </div>

              <div className="flex gap-">
                <button
                  type="button"
                  onClick={() => setStep()}
                  className="px-6 py- bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => setStep()}
                  className="px-6 py- bg-accent text-white font-semibold rounded-lg hover:opacity-90"
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Step : Contrato */}
          {step ===  && (
            <div className="bg-gray-900 rounded-lg p-8 space-y-6">
              <h className="text-xl font-bold text-white">
                Informações de Contrato
              </h>

              <div>
                <label className="block text-sm font-medium text-gray-00 mb-">
                  Valor Alvo (SOL)
                </label>
                <input
                  type="number"
                  name="targetAmount"
                  value={formData.targetAmount}
                  onChange={handleChange}
                  placeholder="000"
                  className="w-full px- py- bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-00 mb-">
                  Data Limite
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px- py- bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>

              <div className="flex gap-">
                <button
                  type="button"
                  onClick={() => setStep()}
                  className="px-6 py- bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="px-6 py- bg-accent text-white font-semibold rounded-lg hover:opacity-90"
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
