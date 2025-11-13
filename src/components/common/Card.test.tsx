import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils';
import { Card } from './Card';

describe('Card component', () => {
  describe('rendering', () => {
    it('should render card with children', () => {
      renderWithProviders(
        <Card>
          <div>Card content</div>
        </Card>
      );
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should apply default styles', () => {
      renderWithProviders(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      // Check that styles are present (may be merged in className string)
      expect(card.className).toContain('bg-white');
      expect(card.className).toContain('rounded-lg');
    });

    it('should render with custom className', () => {
      renderWithProviders(<Card className="custom-class" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('custom-class');
    });
  });

  describe('padding variants', () => {
    it('should apply no padding', () => {
      renderWithProviders(<Card padding="none" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).not.toContain('p-4');
      expect(card.className).not.toContain('p-6');
      expect(card.className).not.toContain('p-8');
    });

    it('should apply small padding', () => {
      renderWithProviders(<Card padding="sm" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-4');
    });

    it('should apply medium padding by default', () => {
      renderWithProviders(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-6');
    });

    it('should apply large padding', () => {
      renderWithProviders(<Card padding="lg" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-8');
    });
  });

  describe('hover effect', () => {
    it('should not have hover effect by default', () => {
      renderWithProviders(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).not.toContain('hover:shadow-md');
    });

    it('should have hover effect when enabled', () => {
      renderWithProviders(<Card hover data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('transition-shadow');
      expect(card.className).toContain('hover:shadow-md');
    });
  });

  describe('combinations', () => {
    it('should combine padding, hover, and custom className', () => {
      renderWithProviders(
        <Card padding="lg" hover className="custom" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-8');
      expect(card.className).toContain('hover:shadow-md');
      expect(card.className).toContain('custom');
    });

    it('should handle all props together', () => {
      renderWithProviders(
        <Card padding="none" hover={false} className="test-class">
          <span data-testid="child">Child element</span>
        </Card>
      );
      const card = screen.getByTestId('child').parentElement;
      expect(card?.className).toContain('test-class');
      expect(card?.className).not.toContain('p-4');
      expect(card?.className).not.toContain('p-6');
      expect(card?.className).not.toContain('p-8');
      expect(card?.className).not.toContain('hover:shadow-md');
    });
  });

  describe('content rendering', () => {
    it('should render multiple children', () => {
      renderWithProviders(
        <Card>
          <h1>Title</h1>
          <p>Description</p>
        </Card>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('should render complex content', () => {
      renderWithProviders(
        <Card>
          <div data-testid="complex">
            <span>Nested</span>
            <button>Action</button>
          </div>
        </Card>
      );
      expect(screen.getByTestId('complex')).toBeInTheDocument();
      expect(screen.getByText('Nested')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
