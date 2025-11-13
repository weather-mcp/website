import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  validateApiUrl,
  isValidTimeRange,
  TimeRangeSchema,
  OverviewStatsSchema,
  ToolSummarySchema,
  HealthStatusSchema,
} from './validation';
import { VALID_TIME_RANGES, ALLOWED_API_DOMAINS } from './constants';
import { mockOverviewStats, mockToolSummary, mockHealthStatus } from '@/test/mocks';

describe('validation utilities', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Suppress console.error during tests that expect errors
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('validateApiUrl', () => {
    it('should accept valid HTTPS URLs from allowed domains', () => {
      const url = 'https://analytics.weather-mcp.dev/v1';
      expect(validateApiUrl(url, ALLOWED_API_DOMAINS)).toBe(url);
    });

    it('should accept localhost URLs with HTTP', () => {
      const url = 'http://localhost:3100/v1';
      expect(validateApiUrl(url, ALLOWED_API_DOMAINS)).toBe(url);
    });

    it('should reject HTTP URLs for non-localhost domains', () => {
      const url = 'http://analytics.weather-mcp.dev/v1';
      const result = validateApiUrl(url, ALLOWED_API_DOMAINS);
      // Should fallback to default production URL
      expect(result).toBe('https://analytics.weather-mcp.dev/v1');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should reject URLs from disallowed domains', () => {
      const url = 'https://malicious-site.com/v1';
      const result = validateApiUrl(url, ALLOWED_API_DOMAINS);
      // Should fallback to default production URL
      expect(result).toBe('https://analytics.weather-mcp.dev/v1');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should handle invalid URL format', () => {
      const url = 'not-a-valid-url';
      const result = validateApiUrl(url, ALLOWED_API_DOMAINS);
      // Should fallback to default production URL
      expect(result).toBe('https://analytics.weather-mcp.dev/v1');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should handle empty string', () => {
      const result = validateApiUrl('', ALLOWED_API_DOMAINS);
      // Should fallback to default production URL
      expect(result).toBe('https://analytics.weather-mcp.dev/v1');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('isValidTimeRange', () => {
    it('should accept valid time ranges', () => {
      VALID_TIME_RANGES.forEach((range) => {
        expect(isValidTimeRange(range)).toBe(true);
      });
    });

    it('should reject invalid time ranges', () => {
      expect(isValidTimeRange('1d')).toBe(false);
      expect(isValidTimeRange('60m')).toBe(false);
      expect(isValidTimeRange('invalid')).toBe(false);
      expect(isValidTimeRange('')).toBe(false);
    });
  });

  describe('Zod schemas', () => {
    describe('TimeRangeSchema', () => {
      it('should validate valid time ranges', () => {
        VALID_TIME_RANGES.forEach((range) => {
          expect(() => TimeRangeSchema.parse(range)).not.toThrow();
        });
      });

      it('should reject invalid time ranges', () => {
        expect(() => TimeRangeSchema.parse('invalid')).toThrow();
        expect(() => TimeRangeSchema.parse('1d')).toThrow();
      });
    });

    describe('ToolSummarySchema', () => {
      it('should validate valid tool summary', () => {
        expect(() => ToolSummarySchema.parse(mockToolSummary)).not.toThrow();
      });

      it('should reject missing required fields', () => {
        expect(() =>
          ToolSummarySchema.parse({
            name: 'test',
            calls: 100,
            // missing success_rate and avg_response_time_ms
          })
        ).toThrow();
      });

      it('should reject invalid field types', () => {
        expect(() =>
          ToolSummarySchema.parse({
            name: 'test',
            calls: '100', // should be number
            success_rate: 98.5,
            avg_response_time_ms: 450,
          })
        ).toThrow();
      });
    });

    describe('OverviewStatsSchema', () => {
      it('should validate valid overview stats', () => {
        expect(() => OverviewStatsSchema.parse(mockOverviewStats)).not.toThrow();
      });

      it('should reject invalid structure', () => {
        expect(() =>
          OverviewStatsSchema.parse({
            period: '24h',
            // missing other required fields
          })
        ).toThrow();
      });

      it('should validate nested arrays', () => {
        const validData = {
          ...mockOverviewStats,
          tools: [mockToolSummary],
          errors: [],
        };
        expect(() => OverviewStatsSchema.parse(validData)).not.toThrow();
      });
    });

    describe('HealthStatusSchema', () => {
      it('should validate valid health status', () => {
        expect(() => HealthStatusSchema.parse(mockHealthStatus)).not.toThrow();
      });

      it('should reject invalid status values', () => {
        expect(() =>
          HealthStatusSchema.parse({
            ...mockHealthStatus,
            status: 'unknown', // not in enum
          })
        ).toThrow();
      });

      it('should accept all valid status values', () => {
        ['healthy', 'degraded', 'down'].forEach((status) => {
          expect(() =>
            HealthStatusSchema.parse({
              ...mockHealthStatus,
              status,
            })
          ).not.toThrow();
        });
      });
    });
  });
});
