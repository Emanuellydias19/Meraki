"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useInvestmentStats, useNFTs } from "@/lib/hooks";

export default function DashboardPage() {
  const walletAddress = "user-wallet-address"; // TODO: Obter de contexto de autenticação
  const { stats, loading: statsLoading } = useInvestmentStats(walletAddress);
  const { nfts, loading: nftsLoading } = useNFTs(walletAddress);

  return (
    <DashboardLayout>
      <div className="w-[60px] mx-auto space-y-8 py-">
        {/* Header */}
        <div className="space-y-">
          <h className="text-xl font-bold text-white">Dashboard</h>
          <p className="text-gray-00">Bem-vindo de volta ao NodeHub!</p>
        </div>

        {/* Stats */}
        {!statsLoading && stats ? (
          <div className="grid grid-cols- gap-6">
            <StatCard
              title="Total Investido"
              value={`${stats.totalInvested} SOL`}
            />
            <StatCard
              title="Startups Investidas"
              value={stats.totalStartups.toString()}
            />
            <StatCard
              title="Investimento Médio"
              value={`${stats.averageInvestment} SOL`}
            />
            <StatCard
              title="NFTs Possuídos"
              value={stats.totalNFTs.toString()}
            />
          </div>
        ) : (
          <div className="text-gray-00">Carregando estatísticas...</div>
        )}

        {/* NFTs */}
        <div className="bg-gray-900 rounded-lg p-6 space-y-">
          <h className="text-xl font-bold text-white">Seus NFTs</h>
          {nftsLoading ? (
            <p className="text-gray-00">Carregando NFTs...</p>
          ) : nfts && nfts.length > 0 ? (
            <div className="grid grid-cols- gap-6">
              {/* NFT Cards aqui - TODO */}
            </div>
          ) : (
            <p className="text-gray-00">
              Você ainda não tem NFTs. Faça seu primeiro investimento!
            </p>
          )}
        </div>

        {/* Investimentos Recentes */}
        <div className="bg-gray-900 rounded-lg p-6 space-y-">
          <h className="text-xl font-bold text-white">
            Investimentos Recentes
          </h>
          <p className="text-gray-00">Nenhum investimento ainda</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y- hover:bg-gray-700 transition">
      <p className="text-gray-00 text-sm">{title}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}
