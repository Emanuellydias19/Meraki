"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useStartups } from "@/lib/hooks";
import { StartupGrid } from "@/components/startup/StartupGrid";

const CATEGORIES = [
  { id: "all", name: "Todos" },
  { id: "tech", name: "Tech" },
  { id: "fintech", name: "Fintech" },
  { id: "health", name: "Saúde" },
  { id: "education", name: "Educação" },
];

export default function ExplorePage() {
  const [category, setCategory] = useState("all");
  const { startups, loading } = useStartups();

  const filtered =
    category === "all"
      ? startups
      : startups.filter((s) => s.category === category);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-[1440px] mx-auto px-8 py-12 space-y-12">
        {/* Título */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">Explore Startups</h1>
          <p className="text-gray-400">
            Descubra projetos inovadores e invista no futuro
          </p>
        </div>

        {/* Filtros */}
        <div className="flex gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                category === cat.id
                  ? "bg-accent text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Carregando startups...</p>
          </div>
        ) : filtered.length > 0 ? (
          <StartupGrid startups={filtered} columns={4} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Nenhuma startup encontrada</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
