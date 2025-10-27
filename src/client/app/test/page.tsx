// app/test/page.tsx

"use client";

import { useState } from "react";
import { StartupCard } from "@/components/startup/StartupCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const mockStartup = {
  id: "1",
  name: "TechStartup Inc.",
  description: "Plataforma de IA",
  image: "https://via.placeholder.com/300x200",
  category: "tech",
  status: "active",
  raisedAmount: 50,
  targetAmount: 100,
  createdAt: new Date(),
  owner: "11111111111111111111111111111111",
  verified: true,
};

export default function TestPage() {
  const [selected, setSelected] = useState("startup-card");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-6">
        <h1 className="text-3xl font-bold">Teste de Componentes</h1>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r p-6">
          <h2 className="font-bold mb-4">Componentes</h2>
          <button
            onClick={() => setSelected("startup-card")}
            className={`w-full text-left px-4 py-2 rounded ${
              selected === "startup-card" ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            StartupCard
          </button>
          <button
            onClick={() => setSelected("badge")}
            className={`w-full text-left px-4 py-2 rounded ${
              selected === "badge" ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            Badge
          </button>
        </div>

        {/* Main */}
        <div className="flex-1 p-12">
          {selected === "startup-card" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">StartupCard</h2>
              <div className="grid grid-cols-3 gap-6">
                <StartupCard startup={mockStartup} />
                <StartupCard startup={mockStartup} isNew={true} />
                <StartupCard
                  startup={{ ...mockStartup, status: "completed" }}
                />
              </div>
            </div>
          )}

          {selected === "badge" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Badge</h2>
              <div className="flex gap-4">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
