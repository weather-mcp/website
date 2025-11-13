import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '@/test/utils';
import { Spinner } from './Spinner';

describe('Spinner component', () => {
  describe('rendering', () => {
    it('should render spinner', () => {
      const { container } = renderWithProviders(<Spinner />);
      const spinner = container.querySelector('svg.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('should render with flex container', () => {
      const { container } = renderWithProviders(<Spinner />);
      const wrapper = container.querySelector('.flex.items-center.justify-center');
      expect(wrapper).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = renderWithProviders(<Spinner className="custom-class" />);
      const wrapper = container.querySelector('.custom-class');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it('should render small size', () => {
      const { container } = renderWithProviders(<Spinner size="sm" />);
      const spinner = container.querySelector('svg');
      expect(spinner).toHaveClass('h-4', 'w-4');
    });

    it('should render medium size by default', () => {
      const { container } = renderWithProviders(<Spinner />);
      const spinner = container.querySelector('svg');
      expect(spinner).toHaveClass('h-8', 'w-8');
    });

    it('should render large size', () => {
      const { container } = renderWithProviders(<Spinner size="lg" />);
      const spinner = container.querySelector('svg');
      expect(spinner).toHaveClass('h-12', 'w-12');
    });
  });

  describe('styling', () => {
    it('should have animation class', () => {
      const { container } = renderWithProviders(<Spinner />);
      const spinner = container.querySelector('svg');
      expect(spinner).toHaveClass('animate-spin');
    });

    it('should have primary color', () => {
      const { container } = renderWithProviders(<Spinner />);
      const spinner = container.querySelector('svg');
      expect(spinner).toHaveClass('text-primary-500');
    });

    it('should contain circle element', () => {
      const { container } = renderWithProviders(<Spinner />);
      const circle = container.querySelector('circle');
      expect(circle).toBeInTheDocument();
      expect(circle).toHaveAttribute('cx', '12');
      expect(circle).toHaveAttribute('cy', '12');
      expect(circle).toHaveAttribute('r', '10');
    });

    it('should contain path element', () => {
      const { container } = renderWithProviders(<Spinner />);
      const path = container.querySelector('path');
      expect(path).toBeInTheDocument();
      expect(path).toHaveClass('opacity-75');
    });
  });

  describe('SVG properties', () => {
    it('should have correct SVG attributes', () => {
      const { container } = renderWithProviders(<Spinner />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      expect(svg).toHaveAttribute('fill', 'none');
    });

    it('should have stroke on circle', () => {
      const { container } = renderWithProviders(<Spinner />);
      const circle = container.querySelector('circle');
      expect(circle).toHaveAttribute('stroke', 'currentColor');
      // Note: strokeWidth in JSX becomes stroke-width in DOM
      expect(circle).toHaveAttribute('stroke-width', '4');
    });
  });

  describe('combinations', () => {
    it('should combine size and custom className', () => {
      const { container } = renderWithProviders(
        <Spinner size="lg" className="my-custom-class" />
      );
      const wrapper = container.querySelector('.my-custom-class');
      expect(wrapper).toBeInTheDocument();

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('h-12', 'w-12');
    });
  });
});
