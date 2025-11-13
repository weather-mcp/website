import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils';
import { Button } from './Button';

describe('Button component', () => {
  describe('rendering', () => {
    it('should render button with children', () => {
      renderWithProviders(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('should apply default variant and size', () => {
      renderWithProviders(<Button>Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary-500');
      expect(button).toHaveClass('px-4', 'py-2');
    });

    it('should render with custom className', () => {
      renderWithProviders(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('variants', () => {
    it('should render primary variant', () => {
      renderWithProviders(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary-500', 'text-white');
    });

    it('should render secondary variant', () => {
      renderWithProviders(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-secondary-500', 'text-white');
    });

    it('should render outline variant', () => {
      renderWithProviders(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border-2', 'border-primary-500');
    });

    it('should render ghost variant', () => {
      renderWithProviders(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-primary-500');
    });
  });

  describe('sizes', () => {
    it('should render small size', () => {
      renderWithProviders(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });

    it('should render medium size', () => {
      renderWithProviders(<Button size="md">Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-4', 'py-2', 'text-base');
    });

    it('should render large size', () => {
      renderWithProviders(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
    });
  });

  describe('states', () => {
    it('should render disabled state', () => {
      renderWithProviders(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });

    it('should render loading state', () => {
      renderWithProviders(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      // Check for spinner SVG
      expect(button.querySelector('svg.animate-spin')).toBeInTheDocument();
    });

    it('should disable button when loading', () => {
      renderWithProviders(<Button loading>Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('interactions', () => {
    it('should call onClick handler', async () => {
      const handleClick = vi.fn();
      const { user } = renderWithProviders(
        <Button onClick={handleClick}>Click me</Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const { user } = renderWithProviders(
        <Button disabled onClick={handleClick}>
          Click me
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', async () => {
      const handleClick = vi.fn();
      const { user } = renderWithProviders(
        <Button loading onClick={handleClick}>
          Click me
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have button role', () => {
      renderWithProviders(<Button>Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should support aria attributes', () => {
      renderWithProviders(
        <Button aria-label="Custom label" aria-describedby="description">
          Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
      expect(button).toHaveAttribute('aria-describedby', 'description');
    });

    it('should support type attribute', () => {
      renderWithProviders(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('combinations', () => {
    it('should combine variant, size, and custom className', () => {
      renderWithProviders(
        <Button variant="outline" size="lg" className="custom">
          Combined
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border-2', 'px-6', 'py-3', 'custom');
    });

    it('should handle all props together', () => {
      const handleClick = vi.fn();
      renderWithProviders(
        <Button
          variant="secondary"
          size="sm"
          disabled
          onClick={handleClick}
          aria-label="Test button"
        >
          Test
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('bg-secondary-500', 'px-3', 'py-1.5');
      expect(button).toHaveAttribute('aria-label', 'Test button');
    });
  });
});
