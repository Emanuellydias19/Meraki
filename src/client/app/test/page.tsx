// app/test/page.tsx

"use client";

import { useState } from "react";
import { StartupCard } from "@/components/startup/StartupCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const mockStartup = {
  id: "",
  name: "TechStartup Inc.",
  description: "Plataforma de IA",
  image: "https://via.placeholder.com/00x00",
  category: "tech",
  status: "active",
  raisedAmount: 50,
  targetAmount: 00,
  createdAt: new Date(),
  owner: "",
  verified: true,
};

export default function TestPage() {
  const [selected, setSelected] = useState("startup-card");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-6">
        <h className="text-xl font-bold">Teste de Componentes</h>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-6 bg-white border-r p-6">
          <h className="font-bold mb-">Componentes</h>
          <button
            onClick={() => setSelected("startup-card")}
            className={`w-full text-left px- py- rounded ${
              selected === "startup-card" ? "bg-blue-00" : "hover:bg-gray-00"
            }`}
          >
            StartupCard
          </button>
          <button
            onClick={() => setSelected("badge")}
            className={`w-full text-left px- py- rounded ${
              selected === "badge" ? "bg-blue-00" : "hover:bg-gray-00"
            }`}
          >
            Badge
          </button>
        </div>

        {/* Main */}
        <div className="flex- p-">
          {selected === "startup-card" && (
            <div>
              <h className="text-xl font-bold mb-6">StartupCard</h>
              <div className="grid grid-cols- gap-6">
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
              <h className="text-xl font-bold mb-6">Badge</h>
              <div className="flex gap-">
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
