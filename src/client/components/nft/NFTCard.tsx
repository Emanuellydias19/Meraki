'use client';

import { NFT } from '@/lib/types';
import { formatSOL } from '@/lib/utils';
import { Card } from '@/components/ui';

interface NFTCardProps {
  nft: NFT;
  onClick?: () => void;
}

export function NFTCard({ nft, onClick }: NFTCardProps) {
  const rarityColors = {
    common: 'bg-gray-500',
    uncommon: 'bg-green-500',
    rare: 'bg-blue-500',
    epic: 'bg-purple-500',
    legendary: 'bg-yellow-500',
  };

  return (
    <Card
      className={`overflow-hidden ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}`}
      onClick={onClick}
    >
      {/* Imagem */}
      <div className="relative h-64 bg-linear-to-br from-purple-400 to-pink-400 -m-6 mb-4">
        <img
          src={nft.metadata.image}
          alt={nft.metadata.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold">
          Nível {nft.currentLevel}/{nft.maxLevel}
        </div>
      </div>

      {/* Conteúdo */}
      <h3 className="text-lg font-bold mb-1">{nft.metadata.name}</h3>
      <p className="text-gray-600 text-sm mb-3">{nft.metadata.description}</p>

      {/* Raridade */}
      <div className="mb-3">
        <span className={`px-2 py-1 rounded text-xs font-bold text-white ${rarityColors[nft.metadata.attributes.rarity]}`}>
          {nft.metadata.attributes.rarity.toUpperCase()}
        </span>
      </div>

      {/* Investimento */}
      <div className="text-sm text-gray-600 border-t pt-3">
        <p>Investimento: {formatSOL(nft.metadata.attributes.investmentAmount)}</p>
      </div>
    </Card>
  );
}