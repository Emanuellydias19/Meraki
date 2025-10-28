useInvestments:
// src/client/lib/hooks/useInvestments.ts

'use client';

import { useEffect, useState } from 'react';
import { investmentApi } from '../api';
import { Investment, InvestmentStats } from '../types';

export function useInvestments(walletAddress: string) {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchInvestments = async () => {
      try {
        setLoading(true);
        const data = await investmentApi.getByInvestor(walletAddress);
        setInvestments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [walletAddress]);

  return { investments, loading, error };
}

export function useInvestmentStats(walletAddress: string) {
  const [stats, setStats] = useState<InvestmentStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchStats = async () => {
      try {
        const data = await investmentApi.getStats(walletAddress);
        setStats(data);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [walletAddress]);

  return { stats, loading };
}