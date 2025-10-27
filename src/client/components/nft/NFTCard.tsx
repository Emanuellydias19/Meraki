"use client";

import { NFT } from "@/lib/types";

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {
  const evolutionPercentage = (nft.currentLevel / nft.maxLevel) * 100;

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-accent/20 transition-all">
      {/* Imagem */}
      <div className="relative h-48 bg-gray-800">
        <img
          src={nft.metadata.image}
          alt={nft.metadata.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-accent/20 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-accent font-semibold text-sm">
            Level {nft.currentLevel}/{nft.maxLevel}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4 space-y-3">
        {/* Nome */}
        <h3 className="text-lg font-bold text-white">{nft.metadata.name}</h3>

        {/* Raridade */}
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              nft.metadata.attributes.rarity === "legendary"
                ? "bg-yellow-500/20 text-yellow-400"
                : nft.metadata.attributes.rarity === "epic"
                ? "bg-purple-500/20 text-purple-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {nft.metadata.attributes.rarity.toUpperCase()}
          </span>
        </div>

        {/* Evolução */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Evolução</span>
            <span>{evolutionPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-secondary to-accent h-full rounded-full"
              style={{ width: `${evolutionPercentage}%` }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-xs text-gray-400 space-y-1">
          <p>Investimento: {nft.metadata.attributes.investmentAmount} SOL</p>
          <p>Startup: {nft.metadata.attributes.startup}</p>
        </div>
      </div>
    </div>
  );
}
