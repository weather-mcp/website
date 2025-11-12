// Analytics API client

import type {
  OverviewStats,
  ToolSummary,
  HealthStatus,
  AnalyticsData,
} from '@/types/analytics';

const API_BASE_URL = process.env.NEXT_PUBLIC_ANALYTICS_API || 'https://analytics.weather-mcp.dev/v1';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = 5000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        `API request failed: ${response.statusText}`
      );
    }

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Analytics Endpoints
export const analyticsApi = {
  async getOverview(period: string): Promise<OverviewStats> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/stats/overview?period=${period}`
    );
    return response.json();
  },

  async getToolStats(
    toolName: string,
    period: string
  ): Promise<ToolSummary> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/stats/tool/${toolName}?period=${period}`
    );
    return response.json();
  },

  async getHealthStatus(): Promise<HealthStatus> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/stats/health`
    );
    return response.json();
  },
};

// SWR Fetcher
export const fetcher = async (url: string) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}${url}`);
  return response.json();
};
