"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Fixo */}
      <aside className="w-[80px] bg-gray-900 border-r border-gray-800 flex flex-col fixed left-0 top-0 h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NH</span>
            </div>
            <span className="text-white font-bold">NodeHub</span>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex- p- space-y-">
          <NavItem href="/dashboard" icon="📊">
            Dashboard
          </NavItem>
          <NavItem href="/explore" icon="🔍">
            Explorar
          </NavItem>
          <NavItem href="/portfolio" icon="🎨">
            Portfolio
          </NavItem>
          <NavItem href="/create-startup" icon="➕">
            Criar Startup
          </NavItem>
        </nav>

        {/* User */}
        <div className="p- border-t border-gray-800">
          <div className="bg-gray-800 rounded-lg p- text-center">
            <p className="text-white text-sm font-semibold">Usuário</p>
            <p className="text-gray-00 text-xs truncate">wallet...</p>
          </div>
        </div>
      </aside>

      {/* Main Content - Scrollável */}
      <main className="flex- ml-[80px] overflow-auto">
        <div className="min-h-screen bg-background">{children}</div>
      </main>
    </div>
  );
}

function NavItem({
  href,
  icon,
  children,
}: {
  href: string;
  icon: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap- px- py- rounded-lg text-gray-00 hover:bg-gray-800 hover:text-white transition"
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{children}</span>
    </Link>
  );
}
