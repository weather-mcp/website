'use client';

import useSWR from 'swr';
import type { AnalyticsData } from '@/types/analytics';
import { fetcher } from '@/lib/api';

interface UseAnalyticsOptions {
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
}

export function useAnalytics(
  timeRange: string,
  options: UseAnalyticsOptions = {}
) {
  const {
    refreshInterval = 30000, // 30 seconds default
    revalidateOnFocus = true,
  } = options;

  const { data, error, isLoading, mutate } = useSWR<AnalyticsData>(
    `/stats/overview?period=${timeRange}`,
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus,
      dedupingInterval: 10000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    data,
    error,
    isLoading,
    refresh: mutate,
  };
}
