"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Senhas não conferem!");
      return;
    }
    console.log("Signup:", formData);
    // TODO: Integrar com API
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Criar Conta</h1>
            <p className="text-gray-400">Junte-se ao NodeHub hoje</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition"
                placeholder="Seu nome"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition"
                placeholder="seu@email.com"
                required
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="w-full py-3 bg-accent text-white font-semibold rounded-lg hover:opacity-90 transition mt-6"
            >
              Criar Conta
            </button>
          </form>

          {/* Link para Login */}
          <div className="text-center text-gray-400">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Faça login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
