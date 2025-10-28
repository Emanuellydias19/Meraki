'use client';

import { useEffect, useState } from 'react';
import { startupApi } from '../api';
import { Startup } from '../types';

export function useStartups() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        const data = await startupApi.getAll();
        setStartups(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar');
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  return { startups, loading, error };
}

export function useStartup(id: string) {
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchStartup = async () => {
      try {
        setLoading(true);
        const data = await startupApi.getById(id);
        setStartup(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar');
      } finally {
        setLoading(false);
      }
    };

    fetchStartup();
  }, [id]);

  return { startup, loading, error };
}`
`