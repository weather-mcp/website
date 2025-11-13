import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils';
import { Badge } from './Badge';

describe('Badge component', () => {
  describe('rendering', () => {
    it('should render badge with children', () => {
      renderWithProviders(<Badge>Badge Text</Badge>);
      expect(screen.getByText('Badge Text')).toBeInTheDocument();
    });

    it('should apply default styles', () => {
      renderWithProviders(<Badge>Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('inline-flex', 'items-center', 'font-medium', 'rounded-full', 'border');
    });

    it('should render with custom className', () => {
      renderWithProviders(<Badge className="custom-class">Badge</Badge>);
      const badge = screen.getByText('Badge');
      expect(badge).toHaveClass('custom-class');
    });
  });

  describe('variants', () => {
    it('should render primary variant', () => {
      renderWithProviders(<Badge variant="primary">Primary</Badge>);
      const badge = screen.getByText('Primary');
      expect(badge).toHaveClass('bg-primary-100', 'text-primary-700', 'border-primary-200');
    });

    it('should render secondary variant', () => {
      renderWithProviders(<Badge variant="secondary">Secondary</Badge>);
      const badge = screen.getByText('Secondary');
      expect(badge).toHaveClass('bg-secondary-100', 'text-secondary-700', 'border-secondary-200');
    });

    it('should render error variant', () => {
      renderWithProviders(<Badge variant="error">Error</Badge>);
      const badge = screen.getByText('Error');
      expect(badge).toHaveClass('bg-error-100', 'text-error-700', 'border-error-200');
    });

    it('should render success variant', () => {
      renderWithProviders(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText('Success');
      expect(badge).toHaveClass('bg-secondary-100', 'text-secondary-700');
    });

    it('should render neutral variant by default', () => {
      renderWithProviders(<Badge>Neutral</Badge>);
      const badge = screen.getByText('Neutral');
      expect(badge).toHaveClass('bg-neutral-100', 'text-neutral-700', 'border-neutral-200');
    });
  });

  describe('sizes', () => {
    it('should render small size', () => {
      renderWithProviders(<Badge size="sm">Small</Badge>);
      const badge = screen.getByText('Small');
      expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs');
    });

    it('should render medium size by default', () => {
      renderWithProviders(<Badge>Medium</Badge>);
      const badge = screen.getByText('Medium');
      expect(badge).toHaveClass('px-2.5', 'py-1', 'text-sm');
    });

    it('should render large size', () => {
      renderWithProviders(<Badge size="lg">Large</Badge>);
      const badge = screen.getByText('Large');
      expect(badge).toHaveClass('px-3', 'py-1.5', 'text-base');
    });
  });

  describe('combinations', () => {
    it('should combine variant, size, and custom className', () => {
      renderWithProviders(
        <Badge variant="error" size="lg" className="custom">
          Combined
        </Badge>
      );
      const badge = screen.getByText('Combined');
      expect(badge).toHaveClass('bg-error-100', 'px-3', 'py-1.5', 'custom');
    });

    it('should handle all props together', () => {
      renderWithProviders(
        <Badge variant="primary" size="sm" className="test-class">
          Test Badge
        </Badge>
      );
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('bg-primary-100', 'px-2', 'py-0.5', 'test-class');
    });
  });

  describe('content rendering', () => {
    it('should render text content', () => {
      renderWithProviders(<Badge>Text Content</Badge>);
      expect(screen.getByText('Text Content')).toBeInTheDocument();
    });

    it('should render with icons', () => {
      renderWithProviders(
        <Badge>
          <svg data-testid="icon" />
          <span>With Icon</span>
        </Badge>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('should render numeric content', () => {
      renderWithProviders(<Badge>42</Badge>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should use span element', () => {
      const { container } = renderWithProviders(<Badge>Badge</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toBeInTheDocument();
    });

    it('should support data attributes', () => {
      const { container } = renderWithProviders(
        <Badge data-testid="custom-badge">Badge</Badge>
      );
      const badge = container.querySelector('[data-testid="custom-badge"]');
      expect(badge).toBeInTheDocument();
    });
  });
});
