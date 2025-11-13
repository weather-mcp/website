import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils';
import { TimeRangeSelector, TimeRange } from './TimeRangeSelector';

describe('TimeRangeSelector component', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('rendering', () => {
    it('should render time range label', () => {
      renderWithProviders(<TimeRangeSelector value="24h" onChange={mockOnChange} />);
      expect(screen.getByText('Time Range:')).toBeInTheDocument();
    });

    it('should render all time range options', () => {
      renderWithProviders(<TimeRangeSelector value="24h" onChange={mockOnChange} />);
      expect(screen.getByText('Last Hour')).toBeInTheDocument();
      expect(screen.getByText('Last 24 Hours')).toBeInTheDocument();
      expect(screen.getByText('Last 7 Days')).toBeInTheDocument();
      expect(screen.getByText('Last 30 Days')).toBeInTheDocument();
    });

    it('should render four buttons', () => {
      renderWithProviders(<TimeRangeSelector value="24h" onChange={mockOnChange} />);
      const buttons = screen.getAllByTestId('time-range-option');
      expect(buttons).toHaveLength(4);
    });
  });

  describe('active state', () => {
    it('should highlight selected 1h option', () => {
      renderWithProviders(<TimeRangeSelector value="1h" onChange={mockOnChange} />);
      const button = screen.getByText('Last Hour');
      expect(button.className).toContain('bg-primary-500');
      expect(button.className).toContain('text-white');
    });

    it('should highlight selected 24h option', () => {
      renderWithProviders(<TimeRangeSelector value="24h" onChange={mockOnChange} />);
      const button = screen.getByText('Last 24 Hours');
      expect(button.className).toContain('bg-primary-500');
      expect(button.className).toContain('text-white');
    });

    it('should highlight selected 7d option', () => {
      renderWithProviders(<TimeRangeSelector value="7d" onChange={mockOnChange} />);
      const button = screen.getByText('Last 7 Days');
      expect(button.className).toContain('bg-primary-500');
      expect(button.className).toContain('text-white');
    });

    it('should highlight selected 30d option', () => {
      renderWithProviders(<TimeRangeSelector value="30d" onChange={mockOnChange} />);
      const button = screen.getByText('Last 30 Days');
      expect(button.className).toContain('bg-primary-500');
      expect(button.className).toContain('text-white');
    });

    it('should not highlight unselected options', () => {
      renderWithProviders(<TimeRangeSelector value="24h" onChange={mockOnChange} />);
      const button = screen.getByText('Last Hour');
      expect(button.className).not.toContain('bg-primary-500');
      expect(button.className).toContain('text-neutral-700');
    });
  });

  describe('interactions', () => {
    it('should call onChange when clicking 1h', async () => {
      const { user } = renderWithProviders(
        <TimeRangeSelector value="24h" onChange={mockOnChange} />
      );
      const button = screen.getByText('Last Hour');
      await user.click(button);
      expect(mockOnChange).toHaveBeenCalledWith('1h');
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('should call onChange when clicking 24h', async () => {
      const { user } = renderWithProviders(
        <TimeRangeSelector value="1h" onChange={mockOnChange} />
      );
      const button = screen.getByText('Last 24 Hours');
      await user.click(button);
      expect(mockOnChange).toHaveBeenCalledWith('24h');
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('should call onChange when clicking 7d', async () => {
      const { user } = renderWithProviders(
        <TimeRangeSelector value="24h" onChange={mockOnChange} />
      );
      const button = screen.getByText('Last 7 Days');
      await user.click(button);
      expect(mockOnChange).toHaveBeenCalledWith('7d');
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('should call onChange when clicking 30d', async () => {
      const { user } = renderWithProviders(
        <TimeRangeSelector value="24h" onChange={mockOnChange} />
      );
      const button = screen.getByText('Last 30 Days');
      await user.click(button);
      expect(mockOnChange).toHaveBeenCalledWith('30d');
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('should allow clicking the currently selected option', async () => {
      const { user } = renderWithProviders(
        <TimeRangeSelector value="24h" onChange={mockOnChange} />
      );
      const button = screen.getByText('Last 24 Hours');
      await user.click(button);
      expect(mockOnChange).toHaveBeenCalledWith('24h');
    });

    it('should handle multiple clicks', async () => {
      const { user } = renderWithProviders(
        <TimeRangeSelector value="24h" onChange={mockOnChange} />
      );
      const button1h = screen.getByText('Last Hour');
      const button7d = screen.getByText('Last 7 Days');

      await user.click(button1h);
      await user.click(button7d);

      expect(mockOnChange).toHaveBeenCalledTimes(2);
      expect(mockOnChange).toHaveBeenNthCalledWith(1, '1h');
      expect(mockOnChange).toHaveBeenNthCalledWith(2, '7d');
    });
  });

  describe('accessibility', () => {
    it('should render all buttons as button elements', () => {
      const { container } = renderWithProviders(
        <TimeRangeSelector value="24h" onChange={mockOnChange} />
      );
      const buttons = container.querySelectorAll('button');
      expect(buttons).toHaveLength(4);
    });

    it('should have data-testid on all options', () => {
      renderWithProviders(<TimeRangeSelector value="24h" onChange={mockOnChange} />);
      const buttons = screen.getAllByTestId('time-range-option');
      expect(buttons).toHaveLength(4);
    });
  });

  describe('layout', () => {
    it('should render buttons in a flex container', () => {
      const { container } = renderWithProviders(
        <TimeRangeSelector value="24h" onChange={mockOnChange} />
      );
      const flexContainer = container.querySelector('.flex.items-center.gap-2');
      expect(flexContainer).toBeInTheDocument();
    });

    it('should render buttons in a rounded border group', () => {
      const { container } = renderWithProviders(
        <TimeRangeSelector value="24h" onChange={mockOnChange} />
      );
      const buttonGroup = container.querySelector('.inline-flex.rounded-lg.border');
      expect(buttonGroup).toBeInTheDocument();
    });
  });

  describe('TypeScript types', () => {
    it('should accept valid TimeRange types', () => {
      const ranges: TimeRange[] = ['1h', '24h', '7d', '30d'];
      ranges.forEach((range) => {
        renderWithProviders(<TimeRangeSelector value={range} onChange={mockOnChange} />);
      });
    });
  });
});
