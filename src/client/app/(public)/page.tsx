"use client";

import { StartupGrid } from "@/components/startup";
import { Button } from "@/components/ui";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="h-screen flex items-center justify-center bg-linear-to-b from-primary/20 to-background">
        <div className="w-[1440px] mx-auto px-8 text-center space-y-8">
          <h1 className="text-6xl font-bold text-white">Meet NodeHub</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Uma plataforma Web3 desenvolvida no ecossistema Solana, criada para
            conectar startups emergentes com investidores interessados em apoiar
            projetos inovadores de forma transparente, rastreável e segura.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/explore" passHref>
              <Button className="px-8 py-3 rounded-lg font-semibold bg-accent text-white hover:opacity-90 transition-opacity">
                Explorar Startups
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button className="px-8 py-3 rounded-lg font-semibold border-2 border-accent text-accent hover:bg-accent/10 transition-colors">
                Publicar Startup
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Startups em destaque */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8">Startups em Destaque</h2>
        <StartupGrid startups={[]} />
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-900">
        <div className="w-[1440px] mx-auto px-8 space-y-12">
          <h2 className="text-4xl font-bold text-white text-center">
            Por que investir conosco?
          </h2>
          <div className="grid grid-cols-4 gap-8">
            {[
              {
                icon: "🔒",
                title: "Segurança",
                desc: "Todos os investimentos registrados na blockchain",
              },
              {
                icon: "🎮",
                title: "Gamificação",
                desc: "NFTs dinâmicos que evoluem com marcos",
              },
              {
                icon: "⚡",
                title: "Velocidade",
                desc: "Transações rápidas com taxas mínimas",
              },
              {
                icon: "🤝",
                title: "Direto",
                desc: "Sem intermediários, relação direta",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-lg p-6 text-center space-y-4"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}