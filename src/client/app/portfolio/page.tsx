"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useNFTs } from "@/lib/hooks";

export default function PortfolioPage() {
  const walletAddress = "user-wallet-address"; // TODO: Obter de contexto
  const { nfts, loading } = useNFTs(walletAddress);

  return (
    <DashboardLayout>
      <div className="w-[1160px] mx-auto space-y-8 py-12">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Portfolio</h1>
          <p className="text-gray-400">Seus NFTs de investimento</p>
        </div>

        {/* NFTs Grid */}
        {loading ? (
          <div className="text-gray-400">Carregando NFTs...</div>
        ) : nfts && nfts.length > 0 ? (
          <div className="grid grid-cols-4 gap-6">
            {nfts.map((nft) => (
              <div
                key={nft.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-accent/20 transition"
              >
                <div className="h-48 bg-gray-800">
                  <img
                    src={nft.metadata.image}
                    alt={nft.metadata.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-white">
                    {nft.metadata.name}
                  </h3>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        nft.metadata.attributes.rarity === "legendary"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {nft.metadata.attributes.rarity.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <p>
                      Level {nft.currentLevel}/{nft.maxLevel}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg p-12 text-center">
            <p className="text-gray-400 mb-4">Você ainda não tem NFTs</p>
            <a
              href="/explore"
              className="inline-block px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90"
            >
              Explorar Startups
            </a>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
