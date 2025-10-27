"use client";

import { StartupGrid } from "@/components/startup";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-b from-primary/20 to-background">
        <div className="w-[1440px] mx-auto px-8 text-center space-y-8">
          <h1 className="text-6xl font-bold text-white">Meet NodeHub</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Uma plataforma Web3 desenvolvida no ecossistema Solana, criada para
            conectar startups emergentes com investidores interessados em apoiar
            projetos inovadores de forma transparente, rastreável e segura.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/explore">
              <button className="px-8 py-3 rounded-lg font-semibold bg-accent text-white hover:opacity-90 transition">
                Explorar Startups
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-8 py-3 rounded-lg font-semibold border-2 border-accent text-accent hover:bg-accent/10 transition">
                Publicar Startup
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Startups em destaque */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8">Startups em Destaque</h2>
        <StartupGrid startups={[]} columns={4} />
      </section>
    </div>
  );
}
