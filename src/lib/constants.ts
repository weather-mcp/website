// API Configuration Constants

export const API_TIMEOUTS = {
  DEFAULT: 5000,
  LONG_RUNNING: 10000,
} as const;

export const SWR_CONFIG = {
  REFRESH_INTERVAL: 30000, // 30 seconds
  DEDUPING_INTERVAL: 10000, // 10 seconds
  ERROR_RETRY_INTERVAL: 5000, // 5 seconds
  ERROR_RETRY_COUNT: 3,
  MIN_REFRESH_INTERVAL: 10000, // 10 seconds minimum
} as const;

// Allowed API domains for security
export const ALLOWED_API_DOMAINS = [
  'analytics.weather-mcp.dev',
  'localhost',
] as const;

// Valid time ranges for analytics queries
export const VALID_TIME_RANGES = ['1h', '24h', '7d', '30d'] as const;
export type TimeRange = typeof VALID_TIME_RANGES[number];
