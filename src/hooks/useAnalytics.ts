'use client';

import useSWR from 'swr';
import type { AnalyticsData } from '@/types/analytics';
import { fetcher } from '@/lib/api';
import { isValidTimeRange } from '@/lib/validation';
import { SWR_CONFIG } from '@/lib/constants';

interface UseAnalyticsOptions {
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
}

export function useAnalytics(
  timeRange: string,
  options: UseAnalyticsOptions = {}
) {
  // Validate time range parameter
  if (!isValidTimeRange(timeRange)) {
    throw new Error(`Invalid time range: ${timeRange}. Must be one of: 1h, 24h, 7d, 30d`);
  }

  const {
    refreshInterval = SWR_CONFIG.REFRESH_INTERVAL,
    revalidateOnFocus = true,
  } = options;

  // Enforce minimum refresh interval for rate limiting
  const safeRefreshInterval = Math.max(refreshInterval, SWR_CONFIG.MIN_REFRESH_INTERVAL);

  const { data, error, isLoading, mutate } = useSWR<AnalyticsData>(
    `/stats/all?period=${timeRange}`,
    fetcher,
    {
      refreshInterval: safeRefreshInterval,
      revalidateOnFocus,
      dedupingInterval: SWR_CONFIG.DEDUPING_INTERVAL,
      errorRetryCount: SWR_CONFIG.ERROR_RETRY_COUNT,
      errorRetryInterval: SWR_CONFIG.ERROR_RETRY_INTERVAL,
    }
  );

  return {
    data,
    error,
    isLoading,
    refresh: mutate,
  };
}
