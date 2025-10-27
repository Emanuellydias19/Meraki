"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", formData);
    // TODO: Integrar com API
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Faça o Login</h1>
            <p className="text-gray-400">Bem-vindo de volta ao NodeHub</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Esqueceu Senha */}
            <div className="text-right">
              <a href="#" className="text-accent hover:underline text-sm">
                Esqueceu sua senha?
              </a>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="w-full py-3 bg-accent text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              Entrar
            </button>
          </form>

          {/* Link para Signup */}
          <div className="text-center text-gray-400">
            Não tem uma conta?{" "}
            <Link href="/signup" className="text-accent hover:underline">
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
