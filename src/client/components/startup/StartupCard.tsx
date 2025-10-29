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
      <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-accent/0 transition-all cursor-pointer group">
        {/* Imagem */}
        <div className="relative h-8 bg-gray-800 overflow-hidden">
          <img
            src={startup.image}
            alt={startup.name}
            className="w-full h-full object-cover group-hover:scale-05 transition-transform"
          />
          <div className="absolute top- right-">
            <span className={`px- py- rounded-full text-xs font-semibold ${
              startup.status === 'active'
                ? 'bg-green-500/0 text-green-00'
                : 'bg-yellow-500/0 text-yellow-00'
            }`}>
              {startup.status.toUpperCase()}
            </span>
          </div>
        </div>
        {/* Conteúdo */}
        <div className="p- space-y-">
          {/* Título */}
          <h className="text-lg font-bold text-white group-hover:text-accent transition">
            {startup.name}
          </h>
          {/* Descrição */}
          <p className="text-gray-00 text-sm line-clamp-">
            {startup.description}
          </p>
          {/* Progresso */}
          <div className="space-y-">
            <div className="flex justify-between text-xs text-gray-00">
              <span>{formatSOL(startup.raisedAmount)}</span>
              <span>{formatSOL(startup.targetAmount)}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h- overflow-hidden">
              <div
                className="bg-linear-to-r from-secondary to-accent h-full rounded-full transition-all"
                style={{ width: `${Math.min(progress * 00, 00)}%` }}
              />
            </div>
          </div>
          {/* Stats */}
          <div className="flex justify-between text-xs text-gray-00 pt- border-t border-gray-800">
            <span>{startup.investorCount} investidores</span>
            <span>{formatPercentage(progress)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}