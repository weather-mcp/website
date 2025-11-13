// API Response Validation Schemas using Zod

import { z } from 'zod';
import { VALID_TIME_RANGES } from './constants';

// Time Range validation
export const TimeRangeSchema = z.enum(VALID_TIME_RANGES);

// Tool Summary Schema
export const ToolSummarySchema = z.object({
  name: z.string(),
  calls: z.number(),
  success_rate: z.number(),
  avg_response_time_ms: z.number(),
});

// Error Summary Schema
export const ErrorSummarySchema = z.object({
  type: z.string(),
  count: z.number(),
  percentage: z.number(),
  affected_tools: z.array(z.string()),
});

// Overview Stats Schema
export const OverviewStatsSchema = z.object({
  period: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  summary: z.object({
    total_calls: z.number(),
    unique_versions: z.number(),
    active_installs: z.number(),
    success_rate: z.number(),
    avg_response_time_ms: z.number(),
  }),
  tools: z.array(ToolSummarySchema),
  errors: z.array(ErrorSummarySchema),
  cache_hit_rate: z.number(),
});

// Tool Usage Data Schema
export const ToolUsageDataSchema = z.object({
  timestamp: z.string(),
}).catchall(z.union([z.number(), z.string()]));

// Performance Metrics Schema
export const PerformanceMetricsSchema = z.object({
  by_tool: z.record(z.string(), z.object({
    p50: z.number(),
    p95: z.number(),
    p99: z.number(),
    avg: z.number(),
  })),
  timeline: z.array(z.object({
    timestamp: z.string(),
    p50: z.number(),
    p95: z.number(),
    p99: z.number(),
  })),
});

// Cache Stats Schema
export const CacheStatsSchema = z.object({
  hit_rate: z.number(),
  total_requests: z.number(),
  cache_hits: z.number(),
  cache_misses: z.number(),
  saved_requests: z.number(),
  by_tool: z.record(z.string(), z.object({
    hit_rate: z.number(),
    hits: z.number(),
    misses: z.number(),
  })),
});

// Service Distribution Schema
export const ServiceDistributionSchema = z.object({
  noaa: z.object({
    calls: z.number(),
    percentage: z.number(),
    success_rate: z.number(),
  }),
  openMeteo: z.object({
    calls: z.number(),
    percentage: z.number(),
    success_rate: z.number(),
  }),
});

// Geo Distribution Schema
export const GeoDistributionSchema = z.object({
  countries: z.array(z.object({
    code: z.string(),
    name: z.string(),
    calls: z.number(),
    percentage: z.number(),
  })),
});

// Health Status Schema
export const HealthStatusSchema = z.object({
  status: z.enum(['healthy', 'degraded', 'down']),
  uptime_seconds: z.number(),
  events_processed_24h: z.number(),
  last_event_received: z.string(),
});

// Analytics Data Schema (combined)
export const AnalyticsDataSchema = z.object({
  overview: OverviewStatsSchema,
  toolUsage: z.array(ToolUsageDataSchema),
  performance: PerformanceMetricsSchema,
  errors: z.array(ErrorSummarySchema),
  cache: CacheStatsSchema,
  services: ServiceDistributionSchema,
  geo: GeoDistributionSchema,
});

// URL validation helper
export function validateApiUrl(url: string, allowedDomains: readonly string[]): string {
  try {
    const parsed = new URL(url);

    if (!allowedDomains.includes(parsed.hostname)) {
      throw new Error(`Invalid API domain: ${parsed.hostname}`);
    }

    if (parsed.protocol !== 'https:' && parsed.hostname !== 'localhost') {
      throw new Error('API must use HTTPS in production');
    }

    return url;
  } catch (error) {
    console.error('Invalid API URL configuration:', error);
    // Fallback to default production URL
    return 'https://analytics.weather-mcp.dev/v1';
  }
}

// Time range validation helper
export function isValidTimeRange(range: string): range is typeof VALID_TIME_RANGES[number] {
  return VALID_TIME_RANGES.includes(range as typeof VALID_TIME_RANGES[number]);
}
