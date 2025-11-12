// Analytics API response types

export interface OverviewStats {
  period: string;
  start_date: string;
  end_date: string;
  summary: {
    total_calls: number;
    unique_versions: number;
    active_installs: number;
    success_rate: number;
    avg_response_time_ms: number;
  };
  tools: ToolSummary[];
  errors: ErrorSummary[];
  cache_hit_rate: number;
}

export interface ToolSummary {
  name: string;
  calls: number;
  success_rate: number;
  avg_response_time_ms: number;
}

export interface ErrorSummary {
  type: string;
  count: number;
  percentage: number;
  affected_tools: string[];
}

export interface ToolUsageData {
  timestamp: string;
  [toolName: string]: number | string;
}

export interface PerformanceMetrics {
  by_tool: {
    [toolName: string]: {
      p50: number;
      p95: number;
      p99: number;
      avg: number;
    };
  };
  timeline: {
    timestamp: string;
    p50: number;
    p95: number;
    p99: number;
  }[];
}

export interface CacheStats {
  hit_rate: number;
  total_requests: number;
  cache_hits: number;
  cache_misses: number;
  saved_requests: number;
  by_tool: {
    [toolName: string]: {
      hit_rate: number;
      hits: number;
      misses: number;
    };
  };
}

export interface ServiceDistribution {
  noaa: {
    calls: number;
    percentage: number;
    success_rate: number;
  };
  openMeteo: {
    calls: number;
    percentage: number;
    success_rate: number;
  };
}

export interface GeoDistribution {
  countries: {
    code: string;
    name: string;
    calls: number;
    percentage: number;
  }[];
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'down';
  uptime_seconds: number;
  events_processed_24h: number;
  last_event_received: string;
}

export interface AnalyticsData {
  overview: OverviewStats;
  toolUsage: ToolUsageData[];
  performance: PerformanceMetrics;
  errors: ErrorSummary[];
  cache: CacheStats;
  services: ServiceDistribution;
  geo: GeoDistribution;
}
