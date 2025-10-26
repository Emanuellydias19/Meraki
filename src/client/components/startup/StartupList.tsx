"use client";

import { useStartups } from "@/lib/hooks";
import { Loading } from "@/components/ui";
import { StartupCard } from "./StartupCard";

export function StartupList() {
  const { startups, loading, error } = useStartups();

  if (loading) return <Loading />;
  if (error)
    return <div className="text-red-500 text-center p-8">Erro: {error}</div>;
  if (startups.length === 0)
    return <div className="text-center p-8">Nenhuma startup encontrada</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {startups.map((startup) => (
        <StartupCard key={startup.id} startup={startup} />
      ))}
    </div>
  );
}
