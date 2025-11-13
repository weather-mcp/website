// Analytics API client

import type {
  OverviewStats,
  ToolSummary,
  HealthStatus,
  AnalyticsData,
} from '@/types/analytics';
import {
  OverviewStatsSchema,
  ToolSummarySchema,
  HealthStatusSchema,
  AnalyticsDataSchema,
  validateApiUrl,
  isValidTimeRange,
} from './validation';
import { API_TIMEOUTS, ALLOWED_API_DOMAINS } from './constants';

// Validate and secure the API base URL
const API_BASE_URL = validateApiUrl(
  process.env.NEXT_PUBLIC_ANALYTICS_API || 'https://analytics.weather-mcp.dev/v1',
  ALLOWED_API_DOMAINS
);

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
  const { timeout = API_TIMEOUTS.DEFAULT, ...fetchOptions } = options;

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
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if ((error as Error).name === 'AbortError') {
      throw new ApiError(408, 'Request Timeout', `Request timed out after ${timeout}ms`);
    }
    throw new ApiError(0, 'Network Error', `Network request failed: ${(error as Error).message}`);
  } finally {
    clearTimeout(timeoutId);
  }
}

// Analytics Endpoints
export const analyticsApi = {
  async getOverview(period: string): Promise<OverviewStats> {
    // Validate time range parameter
    if (!isValidTimeRange(period)) {
      throw new ApiError(400, 'Bad Request', `Invalid time range: ${period}`);
    }

    const response = await fetchWithTimeout(
      `${API_BASE_URL}/stats/overview?period=${period}`
    );
    const data = await response.json();

    // Validate response schema
    return OverviewStatsSchema.parse(data);
  },

  async getToolStats(
    toolName: string,
    period: string
  ): Promise<ToolSummary> {
    // Validate time range parameter
    if (!isValidTimeRange(period)) {
      throw new ApiError(400, 'Bad Request', `Invalid time range: ${period}`);
    }

    const response = await fetchWithTimeout(
      `${API_BASE_URL}/stats/tool/${encodeURIComponent(toolName)}?period=${period}`
    );
    const data = await response.json();

    // Validate response schema
    return ToolSummarySchema.parse(data);
  },

  async getHealthStatus(): Promise<HealthStatus> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/stats/health`
    );
    const data = await response.json();

    // Validate response schema
    return HealthStatusSchema.parse(data);
  },
};

// SWR Fetcher with validation
export const fetcher = async (url: string): Promise<AnalyticsData> => {
  const response = await fetchWithTimeout(`${API_BASE_URL}${url}`);
  const data = await response.json();

  // Validate response schema and cast to expected type
  const validated = AnalyticsDataSchema.parse(data);
  return validated as AnalyticsData;
};
