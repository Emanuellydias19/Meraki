// src/client/components/layout/Header.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export function Header() {
  const location = usePathname();
  
  if (location.startsWith("/login") || location.startsWith("/register")) {
    return null; // Não renderiza o Header nessas rotas
  }

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="w-full mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">NH</span>
          </div>
          <span className="text-white font-bold text-lg">Meraki</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-8">
          <Link
            href="/explore"
            className="text-gray-400 hover:text-white transition"
          >
            Explorar
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white transition"
          >
            Dashboard
          </Link>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 rounded-lg font-semibold bg-accent text-white hover:opacity-90 transition">
            Conectar Wallet
          </button>
        </div>
      </div>
    </header>
  );
}
