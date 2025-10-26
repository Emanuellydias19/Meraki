"use client";

import Link from "next/link";
import { Startup } from "@/lib/types";
import { formatSOL, formatPercentage } from "@/lib/utils";
import { Card, Badge } from "@/components/ui";

interface StartupCardProps {
  startup: Startup;
}

export function StartupCard({ startup }: StartupCardProps) {
  const progress = startup.raisedAmount / startup.targetAmount;

  return (
    <Link href={`/startups/${startup.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
        {/* Imagem */}
        <div className="relative h-48 bg-gray-200 -m-6 mb-4">
          <img
            src={startup.image}
            alt={startup.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge
              variant={startup.status === "active" ? "success" : "warning"}
            >
              {startup.status}
            </Badge>
          </div>
        </div>

        {/* Conteúdo */}
        <h3 className="text-lg font-bold mb-2">{startup.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {startup.description}
        </p>

        {/* Progresso */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${Math.min(progress * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{formatSOL(startup.raisedAmount)}</span>
            <span>{formatPercentage(progress)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
          <span>{startup.investorCount} investidores</span>
          <span>{startup.milestones.length} marcos</span>
        </div>
      </Card>
    </Link>
  );
}
