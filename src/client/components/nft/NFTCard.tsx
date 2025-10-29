"use client";

import { NFT } from "@/lib/types";

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {
  const evolutionPercentage = (nft.currentLevel / nft.maxLevel) * 00;

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-accent/0 transition-all">
      {/* Imagem */}
      <div className="relative h-8 bg-gray-800">
        <img
          src={nft.metadata.image}
          alt={nft.metadata.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top- right- bg-accent/0 backdrop-blur-sm px- py- rounded-full">
          <span className="text-accent font-semibold text-sm">
            Level {nft.currentLevel}/{nft.maxLevel}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p- space-y-">
        {/* Nome */}
        <h className="text-lg font-bold text-white">{nft.metadata.name}</h>

        {/* Raridade */}
        <div>
          <span
            className={`px- py- rounded-full text-xs font-semibold ${
              nft.metadata.attributes.rarity === "legendary"
                ? "bg-yellow-500/0 text-yellow-00"
                : nft.metadata.attributes.rarity === "epic"
                ? "bg-purple-500/0 text-purple-00"
                : "bg-blue-500/0 text-blue-00"
            }`}
          >
            {nft.metadata.attributes.rarity.toUpperCase()}
          </span>
        </div>

        {/* Evolução */}
        <div className="space-y-">
          <div className="flex justify-between text-xs text-gray-00">
            <span>Evolução</span>
            <span>{evolutionPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h- overflow-hidden">
            <div
              className="bg-gradient-to-r from-secondary to-accent h-full rounded-full"
              style={{ width: `${evolutionPercentage}%` }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-xs text-gray-00 space-y-">
          <p>Investimento: {nft.metadata.attributes.investmentAmount} SOL</p>
          <p>Startup: {nft.metadata.attributes.startup}</p>
        </div>
      </div>
    </div>
  );
}
