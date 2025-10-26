"use client";

import { StartupList } from "@/components/startup";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">NodeHub</h1>
          <p className="text-xl mb-8">
            Investimentos descentralizados com NFTs dinâmicos
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/explore">
              <Button size="lg">Explorar Startups</Button>
            </Link>
            <Link href="/auth/dashboard">
              <Button variant="outline" size="lg">
                Meu Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Startups em destaque */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8">Startups em Destaque</h2>
        <StartupList />
      </section>
    </div>
  );
}
