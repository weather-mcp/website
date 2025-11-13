import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils';
import { ErrorSummary } from './ErrorSummary';
import type { ErrorSummary as ErrorSummaryType } from '@/types/analytics';

describe('ErrorSummary component', () => {
  const mockErrors: ErrorSummaryType[] = [
    {
      type: 'ValidationError',
      count: 42,
      percentage: 15.5,
      affected_tools: ['forecast', 'alerts'],
    },
    {
      type: 'NetworkTimeout',
      count: 18,
      percentage: 6.7,
      affected_tools: ['current_conditions'],
    },
    {
      type: 'RateLimitExceeded',
      count: 8,
      percentage: 3.0,
      affected_tools: ['forecast', 'current_conditions', 'alerts'],
    },
  ];

  describe('rendering', () => {
    it('should render error summary heading', () => {
      renderWithProviders(<ErrorSummary errors={mockErrors} />);
      expect(screen.getByText('Error Summary')).toBeInTheDocument();
    });

    it('should render error types', () => {
      renderWithProviders(<ErrorSummary errors={mockErrors} />);
      expect(screen.getByText('ValidationError')).toBeInTheDocument();
      expect(screen.getByText('NetworkTimeout')).toBeInTheDocument();
      expect(screen.getByText('RateLimitExceeded')).toBeInTheDocument();
    });

    it('should render error counts', () => {
      renderWithProviders(<ErrorSummary errors={mockErrors} />);
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('18')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
    });

    it('should render error percentages', () => {
      renderWithProviders(<ErrorSummary errors={mockErrors} />);
      expect(screen.getByText('15.5%')).toBeInTheDocument();
      expect(screen.getByText('6.7%')).toBeInTheDocument();
      expect(screen.getByText('3.0%')).toBeInTheDocument();
    });

    it('should render affected tools', () => {
      renderWithProviders(<ErrorSummary errors={mockErrors} />);
      // Count all instances of affected tools
      const forecastBadges = screen.getAllByText('forecast');
      const alertsBadges = screen.getAllByText('alerts');
      const conditionsBadges = screen.getAllByText('current_conditions');

      expect(forecastBadges.length).toBeGreaterThan(0);
      expect(alertsBadges.length).toBeGreaterThan(0);
      expect(conditionsBadges.length).toBeGreaterThan(0);
    });
  });

  describe('no errors state', () => {
    it('should render success message when errors array is empty', () => {
      renderWithProviders(<ErrorSummary errors={[]} />);
      expect(screen.getByText('No errors in this time period')).toBeInTheDocument();
    });

    it('should render success icon when errors array is empty', () => {
      const { container } = renderWithProviders(<ErrorSummary errors={[]} />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should render success message when errors is null', () => {
      renderWithProviders(<ErrorSummary errors={null as any} />);
      expect(screen.getByText('No errors in this time period')).toBeInTheDocument();
    });

    it('should render success message when errors is undefined', () => {
      renderWithProviders(<ErrorSummary errors={undefined as any} />);
      expect(screen.getByText('No errors in this time period')).toBeInTheDocument();
    });
  });

  describe('formatting', () => {
    it('should format percentage with one decimal place', () => {
      const errors: ErrorSummaryType[] = [
        {
          type: 'TestError',
          count: 10,
          percentage: 12.456,
          affected_tools: ['test'],
        },
      ];
      renderWithProviders(<ErrorSummary errors={errors} />);
      expect(screen.getByText('12.5%')).toBeInTheDocument();
    });

    it('should render percentage with zero decimal places when whole number', () => {
      const errors: ErrorSummaryType[] = [
        {
          type: 'TestError',
          count: 10,
          percentage: 10.0,
          affected_tools: ['test'],
        },
      ];
      renderWithProviders(<ErrorSummary errors={errors} />);
      expect(screen.getByText('10.0%')).toBeInTheDocument();
    });
  });

  describe('single error', () => {
    it('should render single error correctly', () => {
      const singleError: ErrorSummaryType[] = [
        {
          type: 'SingleError',
          count: 5,
          percentage: 2.5,
          affected_tools: ['tool1', 'tool2'],
        },
      ];
      renderWithProviders(<ErrorSummary errors={singleError} />);

      expect(screen.getByText('SingleError')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('2.5%')).toBeInTheDocument();
      expect(screen.getByText('tool1')).toBeInTheDocument();
      expect(screen.getByText('tool2')).toBeInTheDocument();
    });
  });

  describe('error with no affected tools', () => {
    it('should handle error with empty affected_tools array', () => {
      const errors: ErrorSummaryType[] = [
        {
          type: 'EmptyToolsError',
          count: 3,
          percentage: 1.5,
          affected_tools: [],
        },
      ];
      renderWithProviders(<ErrorSummary errors={errors} />);

      expect(screen.getByText('EmptyToolsError')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('error with many affected tools', () => {
    it('should render multiple affected tools', () => {
      const errors: ErrorSummaryType[] = [
        {
          type: 'MultiToolError',
          count: 15,
          percentage: 8.2,
          affected_tools: ['tool1', 'tool2', 'tool3', 'tool4', 'tool5'],
        },
      ];
      renderWithProviders(<ErrorSummary errors={errors} />);

      expect(screen.getByText('tool1')).toBeInTheDocument();
      expect(screen.getByText('tool2')).toBeInTheDocument();
      expect(screen.getByText('tool3')).toBeInTheDocument();
      expect(screen.getByText('tool4')).toBeInTheDocument();
      expect(screen.getByText('tool5')).toBeInTheDocument();
    });
  });

  describe('layout', () => {
    it('should render errors in a list', () => {
      const { container } = renderWithProviders(<ErrorSummary errors={mockErrors} />);
      const errorItems = container.querySelectorAll('.space-y-3 > div');
      expect(errorItems.length).toBe(3);
    });

    it('should apply correct styling to error items', () => {
      const { container } = renderWithProviders(<ErrorSummary errors={mockErrors} />);
      const errorItem = container.querySelector('.bg-neutral-50.rounded-lg.border');
      expect(errorItem).toBeInTheDocument();
    });
  });
});
