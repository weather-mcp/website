import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderWithProviders, screen, waitFor } from '@/test/utils';
import { MetricCard } from './MetricCard';

describe('MetricCard component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('rendering', () => {
    it('should render title and value', () => {
      renderWithProviders(<MetricCard title="Total Calls" value={5432} />);
      expect(screen.getByText('Total Calls')).toBeInTheDocument();
      expect(screen.getByText('5432')).toBeInTheDocument();
    });

    it('should render string values', () => {
      renderWithProviders(<MetricCard title="Status" value="Active" />);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('should render numeric values', () => {
      renderWithProviders(<MetricCard title="Count" value={123} />);
      expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('should render with data-testid', () => {
      renderWithProviders(<MetricCard title="Test" value={100} />);
      expect(screen.getByTestId('overview-card')).toBeInTheDocument();
    });
  });

  describe('trend indicators', () => {
    it('should render upward trend', () => {
      renderWithProviders(
        <MetricCard
          title="Users"
          value={1000}
          trend={{ value: 15, direction: 'up' }}
        />
      );
      expect(screen.getByText('+15%')).toBeInTheDocument();
      const trendElement = screen.getByText('+15%');
      expect(trendElement).toHaveClass('text-secondary-600');
    });

    it('should render downward trend', () => {
      renderWithProviders(
        <MetricCard
          title="Errors"
          value={50}
          trend={{ value: 10, direction: 'down' }}
        />
      );
      expect(screen.getByText('10%')).toBeInTheDocument();
      const trendElement = screen.getByText('10%');
      expect(trendElement).toHaveClass('text-error-600');
    });

    it('should render neutral trend', () => {
      renderWithProviders(
        <MetricCard
          title="Performance"
          value={500}
          trend={{ value: 0, direction: 'neutral' }}
        />
      );
      expect(screen.getByText('0%')).toBeInTheDocument();
      const trendElement = screen.getByText('0%');
      expect(trendElement).toHaveClass('text-neutral-600');
    });

    it('should not render trend when not provided', () => {
      renderWithProviders(<MetricCard title="Test" value={100} />);
      expect(screen.queryByText('%')).not.toBeInTheDocument();
    });

    it('should render trend icon for upward direction', () => {
      const { container } = renderWithProviders(
        <MetricCard
          title="Test"
          value={100}
          trend={{ value: 5, direction: 'up' }}
        />
      );
      const svg = container.querySelector('svg.text-secondary-500');
      expect(svg).toBeInTheDocument();
    });

    it('should render trend icon for downward direction', () => {
      const { container } = renderWithProviders(
        <MetricCard
          title="Test"
          value={100}
          trend={{ value: 5, direction: 'down' }}
        />
      );
      const svg = container.querySelector('svg.text-error-500');
      expect(svg).toBeInTheDocument();
    });

    it('should render trend icon for neutral direction', () => {
      const { container } = renderWithProviders(
        <MetricCard
          title="Test"
          value={100}
          trend={{ value: 0, direction: 'neutral' }}
        />
      );
      const svg = container.querySelector('svg.text-neutral-500');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('icon', () => {
    it('should render custom icon', () => {
      const icon = (
        <svg data-testid="custom-icon">
          <circle cx="10" cy="10" r="5" />
        </svg>
      );
      renderWithProviders(<MetricCard title="Test" value={100} icon={icon} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should render without icon', () => {
      const { container } = renderWithProviders(
        <MetricCard title="Test" value={100} />
      );
      const iconWrapper = container.querySelector('.bg-primary-50');
      expect(iconWrapper).not.toBeInTheDocument();
    });
  });

  describe('animation', () => {
    it('should have opacity transition classes', () => {
      const { container } = renderWithProviders(
        <MetricCard title="Test" value={100} />
      );
      const valueElement = screen.getByText('100');
      expect(valueElement).toHaveClass('transition-all', 'duration-500');
    });

    it('should update value when prop changes', async () => {
      const { rerender } = renderWithProviders(
        <MetricCard title="Test" value={100} />
      );
      expect(screen.getByText('100')).toBeInTheDocument();

      rerender(<MetricCard title="Test" value={200} />);
      await waitFor(() => {
        expect(screen.getByText('200')).toBeInTheDocument();
      });
    });

    it('should handle string value changes', async () => {
      const { rerender } = renderWithProviders(
        <MetricCard title="Status" value="Pending" />
      );
      expect(screen.getByText('Pending')).toBeInTheDocument();

      rerender(<MetricCard title="Status" value="Active" />);
      await waitFor(() => {
        expect(screen.getByText('Active')).toBeInTheDocument();
      });
    });
  });

  describe('styling', () => {
    it('should apply Card component with hover effect', () => {
      renderWithProviders(<MetricCard title="Test" value={100} />);
      const card = screen.getByTestId('overview-card');
      expect(card).toHaveClass('bg-white', 'rounded-lg');
    });

    it('should have proper text styling for title', () => {
      renderWithProviders(<MetricCard title="Test Title" value={100} />);
      const title = screen.getByText('Test Title');
      expect(title).toHaveClass('text-sm', 'font-medium', 'text-neutral-600');
    });

    it('should have proper text styling for value', () => {
      renderWithProviders(<MetricCard title="Test" value={100} />);
      const value = screen.getByText('100');
      expect(value).toHaveClass('text-3xl', 'font-bold', 'text-neutral-900');
    });
  });

  describe('layout', () => {
    it('should have flex layout with icon', () => {
      const icon = <div data-testid="icon">Icon</div>;
      const { container } = renderWithProviders(
        <MetricCard title="Test" value={100} icon={icon} />
      );
      const wrapper = container.querySelector('.flex.items-start.justify-between');
      expect(wrapper).toBeInTheDocument();
    });

    it('should position icon correctly', () => {
      const icon = <div data-testid="icon">Icon</div>;
      const { container } = renderWithProviders(
        <MetricCard title="Test" value={100} icon={icon} />
      );
      const iconWrapper = container.querySelector('.ml-4.rounded-lg.bg-primary-50');
      expect(iconWrapper).toBeInTheDocument();
    });
  });

  describe('complete examples', () => {
    it('should render complete metric card with all features', () => {
      const icon = <div data-testid="metric-icon">📊</div>;
      renderWithProviders(
        <MetricCard
          title="Total API Calls"
          value="5,432"
          trend={{ value: 12.5, direction: 'up' }}
          icon={icon}
        />
      );

      expect(screen.getByText('Total API Calls')).toBeInTheDocument();
      expect(screen.getByText('5,432')).toBeInTheDocument();
      expect(screen.getByText('+12.5%')).toBeInTheDocument();
      expect(screen.getByTestId('metric-icon')).toBeInTheDocument();
    });

    it('should render minimal metric card', () => {
      renderWithProviders(<MetricCard title="Simple Metric" value={42} />);

      expect(screen.getByText('Simple Metric')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.queryByText('%')).not.toBeInTheDocument();
    });
  });
});
