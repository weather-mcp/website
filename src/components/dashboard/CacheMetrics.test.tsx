import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils';
import { CacheMetrics } from './CacheMetrics';
import type { CacheStats } from '@/types/analytics';

describe('CacheMetrics component', () => {
  const mockCacheStats: CacheStats = {
    hit_rate: 85.5,
    total_requests: 1000,
    cache_hits: 855,
    cache_misses: 145,
    saved_requests: 855,
    by_tool: {
      forecast: {
        hit_rate: 90.2,
        hits: 452,
        misses: 49,
      },
      current_conditions: {
        hit_rate: 82.1,
        hits: 329,
        misses: 72,
      },
      alerts: {
        hit_rate: 75.6,
        hits: 74,
        misses: 24,
      },
    },
  };

  describe('rendering', () => {
    it('should render cache performance heading', () => {
      renderWithProviders(<CacheMetrics stats={mockCacheStats} />);
      expect(screen.getByText('Cache Performance')).toBeInTheDocument();
    });

    it('should render hit rate', () => {
      renderWithProviders(<CacheMetrics stats={mockCacheStats} />);
      expect(screen.getByText('85.5%')).toBeInTheDocument();
      expect(screen.getByText('Hit Rate')).toBeInTheDocument();
    });

    it('should render saved requests', () => {
      renderWithProviders(<CacheMetrics stats={mockCacheStats} />);
      expect(screen.getByText('855')).toBeInTheDocument();
      expect(screen.getByText('Saved Requests')).toBeInTheDocument();
    });
  });

  describe('no data state', () => {
    it('should render no data message when stats is null', () => {
      renderWithProviders(<CacheMetrics stats={null as any} />);
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('should render no data message when stats is undefined', () => {
      renderWithProviders(<CacheMetrics stats={undefined as any} />);
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });
  });

  describe('tool-specific stats', () => {
    it('should render tool names', () => {
      renderWithProviders(<CacheMetrics stats={mockCacheStats} />);
      expect(screen.getByText('forecast')).toBeInTheDocument();
      expect(screen.getByText('current conditions')).toBeInTheDocument();
      expect(screen.getByText('alerts')).toBeInTheDocument();
    });

    it('should render tool hit rates', () => {
      renderWithProviders(<CacheMetrics stats={mockCacheStats} />);
      expect(screen.getByText('90.2%')).toBeInTheDocument();
      expect(screen.getByText('82.1%')).toBeInTheDocument();
      expect(screen.getByText('75.6%')).toBeInTheDocument();
    });

    it('should render progress bars for each tool', () => {
      const { container } = renderWithProviders(<CacheMetrics stats={mockCacheStats} />);
      const progressBars = container.querySelectorAll('.bg-secondary-500');
      expect(progressBars.length).toBe(3);
    });

    it('should handle empty by_tool object', () => {
      const statsWithoutTools: CacheStats = {
        ...mockCacheStats,
        by_tool: {},
      };
      renderWithProviders(<CacheMetrics stats={statsWithoutTools} />);
      expect(screen.queryByText('By Tool')).not.toBeInTheDocument();
    });
  });

  describe('formatting', () => {
    it('should format hit rate with one decimal place', () => {
      const stats: CacheStats = {
        ...mockCacheStats,
        hit_rate: 85.567,
      };
      renderWithProviders(<CacheMetrics stats={stats} />);
      expect(screen.getByText('85.6%')).toBeInTheDocument();
    });

    it('should format saved requests with locale string', () => {
      const stats: CacheStats = {
        ...mockCacheStats,
        saved_requests: 1234567,
      };
      renderWithProviders(<CacheMetrics stats={stats} />);
      expect(screen.getByText('1,234,567')).toBeInTheDocument();
    });

    it('should replace underscores in tool names with spaces', () => {
      const stats: CacheStats = {
        ...mockCacheStats,
        by_tool: {
          marine_conditions: {
            hit_rate: 88.0,
            hits: 100,
            misses: 12,
          },
        },
      };
      renderWithProviders(<CacheMetrics stats={stats} />);
      expect(screen.getByText('marine conditions')).toBeInTheDocument();
    });
  });

  describe('layout', () => {
    it('should render overall stats in grid', () => {
      const { container } = renderWithProviders(<CacheMetrics stats={mockCacheStats} />);
      const grid = container.querySelector('.grid.grid-cols-2');
      expect(grid).toBeInTheDocument();
    });

    it('should render tool list when tools exist', () => {
      renderWithProviders(<CacheMetrics stats={mockCacheStats} />);
      expect(screen.getByText('By Tool')).toBeInTheDocument();
    });
  });
});
