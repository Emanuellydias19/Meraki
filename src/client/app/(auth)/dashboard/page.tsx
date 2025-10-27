"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useInvestmentStats, useNFTs } from "@/lib/hooks";

export default function DashboardPage() {
  const walletAddress = "user-wallet-address"; // TODO: Obter de contexto de autenticação
  const { stats, loading: statsLoading } = useInvestmentStats(walletAddress);
  const { nfts, loading: nftsLoading } = useNFTs(walletAddress);

  return (
    <DashboardLayout>
      <div className="w-[1160px] mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Bem-vindo de volta!</p>
        </div>

        {/* Stats */}
        {!statsLoading && stats && (
          <div className="grid grid-cols-4 gap-6">
            <StatCard
              title="Total Investido"
              value={`${stats.totalInvested} SOL`}
            />
            <StatCard title="Startups" value={stats.totalStartups.toString()} />
            <StatCard
              title="Investimento Médio"
              value={`${stats.averageInvestment} SOL`}
            />
            <StatCard title="NFTs" value={stats.totalNFTs.toString()} />
          </div>
        )}

        {/* NFTs */}
        <div className="bg-gray-900 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-white">Seus NFTs</h2>
          {nftsLoading ? (
            <p className="text-gray-400">Carregando...</p>
          ) : nfts.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">{/* NFT Cards aqui */}</div>
          ) : (
            <p className="text-gray-400">Nenhum NFT ainda</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-2">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
