import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils';
import { Header } from './Header';

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header component', () => {
  describe('rendering', () => {
    it('should render Weather MCP logo text', () => {
      renderWithProviders(<Header />);
      expect(screen.getByText('Weather MCP')).toBeInTheDocument();
    });

    it('should render W logo icon', () => {
      renderWithProviders(<Header />);
      expect(screen.getByText('W')).toBeInTheDocument();
    });

    it('should render logo as link to home', () => {
      const { container } = renderWithProviders(<Header />);
      const logoLink = container.querySelector('a[href="/"]');
      expect(logoLink).toBeInTheDocument();
    });
  });

  describe('mobile menu button', () => {
    it('should render mobile menu button', () => {
      renderWithProviders(<Header />);
      const button = screen.getByLabelText('Toggle navigation menu');
      expect(button).toBeInTheDocument();
    });

    it('should have Open main menu text for screen readers', () => {
      renderWithProviders(<Header />);
      expect(screen.getByText('Open main menu')).toBeInTheDocument();
    });

    it('should toggle mobile menu when clicked', async () => {
      const { user } = renderWithProviders(<Header />);
      const button = screen.getByLabelText('Toggle navigation menu');

      expect(button).toHaveAttribute('aria-expanded', 'false');

      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');

      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should show hamburger icon when menu is closed', () => {
      const { container } = renderWithProviders(<Header />);
      const button = screen.getByLabelText('Toggle navigation menu');
      const svg = button.querySelector('svg');
      const path = svg?.querySelector('path');

      // Hamburger icon has three lines path
      expect(path?.getAttribute('d')).toContain('M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5');
    });

    it('should show close icon when menu is open', async () => {
      const { user } = renderWithProviders(<Header />);
      const button = screen.getByLabelText('Toggle navigation menu');

      await user.click(button);

      const svg = button.querySelector('svg');
      const path = svg?.querySelector('path');

      // Close icon has X shape path
      expect(path?.getAttribute('d')).toContain('M6 18L18 6M6 6l12 12');
    });
  });

  describe('layout', () => {
    it('should have sticky header', () => {
      const { container } = renderWithProviders(<Header />);
      const header = container.querySelector('header');
      expect(header?.className).toContain('sticky');
      expect(header?.className).toContain('top-0');
    });

    it('should have z-index for proper layering', () => {
      const { container } = renderWithProviders(<Header />);
      const header = container.querySelector('header');
      expect(header?.className).toContain('z-50');
    });

    it('should have backdrop blur effect', () => {
      const { container } = renderWithProviders(<Header />);
      const header = container.querySelector('header');
      expect(header?.className).toContain('backdrop-blur');
    });
  });

  describe('responsive behavior', () => {
    it('should hide navigation on mobile', () => {
      const { container } = renderWithProviders(<Header />);
      const desktopNav = container.querySelector('.hidden.md\\:flex');
      expect(desktopNav).toBeInTheDocument();
    });

    it('should show mobile menu button only on mobile', () => {
      const { container } = renderWithProviders(<Header />);
      const mobileButton = container.querySelector('.flex.md\\:hidden');
      expect(mobileButton).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper button type', () => {
      renderWithProviders(<Header />);
      const button = screen.getByLabelText('Toggle navigation menu');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should have aria-label', () => {
      renderWithProviders(<Header />);
      const button = screen.getByLabelText('Toggle navigation menu');
      expect(button).toHaveAttribute('aria-label', 'Toggle navigation menu');
    });

    it('should have aria-expanded attribute', () => {
      renderWithProviders(<Header />);
      const button = screen.getByLabelText('Toggle navigation menu');
      expect(button).toHaveAttribute('aria-expanded');
    });

    it('should have sr-only text', () => {
      const { container } = renderWithProviders(<Header />);
      const srOnly = container.querySelector('.sr-only');
      expect(srOnly).toBeInTheDocument();
      expect(srOnly).toHaveTextContent('Open main menu');
    });

    it('should have aria-hidden on icons', () => {
      const { container } = renderWithProviders(<Header />);
      const svg = container.querySelector('svg[aria-hidden="true"]');
      expect(svg).toBeInTheDocument();
    });
  });
});
