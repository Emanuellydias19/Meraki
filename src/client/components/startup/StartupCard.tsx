'use client';

import Link from 'next/link';
import { Startup } from '@/lib/types';
import { formatSOL, formatPercentage } from '@/lib/utils';

interface StartupCardProps {
  startup: Startup;
}

export function StartupCard({ startup }: StartupCardProps) {
  const progress = startup.raisedAmount / startup.targetAmount;

  return (
    <Link href={`/startup/${startup.id}`}>
      <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-accent/20 transition-all cursor-pointer group">
        {/* Imagem */}
        <div className="relative h-48 bg-gray-800 overflow-hidden">
          <img
            src={startup.image}
            alt={startup.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              startup.status === 'active'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {startup.status.toUpperCase()}
            </span>
          </div>
        </div>
        {/* Conteúdo */}
        <div className="p-4 space-y-3">
          {/* Título */}
          <h3 className="text-lg font-bold text-white group-hover:text-accent transition">
            {startup.name}
          </h3>
          {/* Descrição */}
          <p className="text-gray-400 text-sm line-clamp-2">
            {startup.description}
          </p>
          {/* Progresso */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatSOL(startup.raisedAmount)}</span>
              <span>{formatSOL(startup.targetAmount)}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-linear-to-r from-secondary to-accent h-full rounded-full transition-all"
                style={{ width: `${Math.min(progress * 100, 100)}%` }}
              />
            </div>
          </div>
          {/* Stats */}
          <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-gray-800">
            <span>{startup.investorCount} investidores</span>
            <span>{formatPercentage(progress)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}