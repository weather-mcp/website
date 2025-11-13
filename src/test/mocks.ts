import type {
  OverviewStats,
  ToolSummary,
  HealthStatus,
  AnalyticsData,
} from '@/types/analytics';

export const mockToolSummary: ToolSummary = {
  name: 'get_forecast',
  calls: 1250,
  success_rate: 98.5,
  avg_response_time_ms: 450,
};

export const mockOverviewStats: OverviewStats = {
  period: '24h',
  start_date: '2025-11-12T00:00:00Z',
  end_date: '2025-11-13T00:00:00Z',
  summary: {
    total_calls: 5432,
    unique_versions: 12,
    active_installs: 345,
    success_rate: 97.8,
    avg_response_time_ms: 425,
  },
  tools: [
    mockToolSummary,
    {
      name: 'get_current_conditions',
      calls: 980,
      success_rate: 99.1,
      avg_response_time_ms: 380,
    },
    {
      name: 'get_alerts',
      calls: 456,
      success_rate: 96.5,
      avg_response_time_ms: 520,
    },
  ],
  errors: [
    {
      type: 'network_error',
      count: 45,
      percentage: 2.1,
      affected_tools: ['get_forecast', 'get_current_conditions'],
    },
    {
      type: 'validation_error',
      count: 12,
      percentage: 0.5,
      affected_tools: ['get_alerts'],
    },
  ],
  cache_hit_rate: 78.5,
};

export const mockHealthStatus: HealthStatus = {
  status: 'healthy',
  uptime_seconds: 864000,
  events_processed_24h: 5432,
  last_event_received: '2025-11-13T12:00:00Z',
};

export const mockAnalyticsData: AnalyticsData = {
  overview: mockOverviewStats,
  toolUsage: [
    {
      timestamp: '2025-11-13T00:00:00Z',
      get_forecast: 125,
      get_current_conditions: 98,
      get_alerts: 45,
    },
    {
      timestamp: '2025-11-13T01:00:00Z',
      get_forecast: 130,
      get_current_conditions: 102,
      get_alerts: 48,
    },
  ],
  performance: {
    by_tool: {
      get_forecast: {
        p50: 420,
        p95: 850,
        p99: 1200,
        avg: 450,
      },
      get_current_conditions: {
        p50: 350,
        p95: 720,
        p99: 980,
        avg: 380,
      },
    },
    timeline: [
      {
        timestamp: '2025-11-13T00:00:00Z',
        p50: 400,
        p95: 800,
        p99: 1100,
      },
    ],
  },
  errors: mockOverviewStats.errors,
  cache: {
    hit_rate: 78.5,
    total_requests: 5432,
    cache_hits: 4264,
    cache_misses: 1168,
    saved_requests: 4264,
    by_tool: {
      get_forecast: {
        hit_rate: 82.3,
        hits: 1029,
        misses: 221,
      },
      get_current_conditions: {
        hit_rate: 75.1,
        hits: 736,
        misses: 244,
      },
    },
  },
  services: {
    noaa: {
      calls: 3259,
      percentage: 60.0,
      success_rate: 98.2,
    },
    openMeteo: {
      calls: 2173,
      percentage: 40.0,
      success_rate: 97.1,
    },
  },
  geo: {
    countries: [
      {
        code: 'US',
        name: 'United States',
        calls: 3800,
        percentage: 70.0,
      },
      {
        code: 'CA',
        name: 'Canada',
        calls: 900,
        percentage: 16.5,
      },
      {
        code: 'GB',
        name: 'United Kingdom',
        calls: 432,
        percentage: 8.0,
      },
    ],
  },
};

// Mock fetch responses
export function createMockResponse(data: any, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: async () => data,
    text: async () => JSON.stringify(data),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  } as Response;
}

export function mockFetch(data: any, status = 200) {
  global.fetch = vi.fn().mockResolvedValue(createMockResponse(data, status));
}

export function mockFetchError(error: Error) {
  global.fetch = vi.fn().mockRejectedValue(error);
}
