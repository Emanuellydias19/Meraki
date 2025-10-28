'use client';

import { useEffect, useState } from 'react';
import { nftApi } from '../api';
import { NFT } from '../types';

export function useNFTs(walletAddress: string) {
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchNFTs = async () => {
      try {
        setLoading(true);
        const data = await nftApi.getByOwner(walletAddress);
        setNFTs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar');
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [walletAddress]);

  return { nfts, loading, error };
}