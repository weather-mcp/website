import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils';
import { Navigation } from './Navigation';

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('Navigation component', () => {
  describe('rendering', () => {
    it('should render all navigation items', () => {
      vi.mock('next/navigation', () => ({
        usePathname: () => '/',
      }));

      renderWithProviders(<Navigation />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Docs')).toBeInTheDocument();
      expect(screen.getByText('Examples')).toBeInTheDocument();
      expect(screen.getByText('Community')).toBeInTheDocument();
    });

    it('should render GitHub link', () => {
      vi.mock('next/navigation', () => ({
        usePathname: () => '/',
      }));

      renderWithProviders(<Navigation />);
      const githubLink = screen.getByLabelText('GitHub repository');
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com/dgahagan/weather-mcp');
    });

    it('should render GitHub icon', () => {
      vi.mock('next/navigation', () => ({
        usePathname: () => '/',
      }));

      const { container } = renderWithProviders(<Navigation />);
      const githubIcon = container.querySelector('svg[aria-hidden="true"]');
      expect(githubIcon).toBeInTheDocument();
    });
  });

  describe('navigation links', () => {
    it('should have correct hrefs', () => {
      vi.mock('next/navigation', () => ({
        usePathname: () => '/',
      }));

      const { container } = renderWithProviders(<Navigation />);

      const homeLink = screen.getByText('Home').closest('a');
      const dashboardLink = screen.getByText('Dashboard').closest('a');
      const docsLink = screen.getByText('Docs').closest('a');
      const examplesLink = screen.getByText('Examples').closest('a');
      const communityLink = screen.getByText('Community').closest('a');

      expect(homeLink).toHaveAttribute('href', '/');
      expect(dashboardLink).toHaveAttribute('href', '/dashboard');
      expect(docsLink).toHaveAttribute('href', '/docs');
      expect(examplesLink).toHaveAttribute('href', '/examples');
      expect(communityLink).toHaveAttribute('href', '/community');
    });
  });

  describe('accessibility', () => {
    it('should have navigation landmark', () => {
      vi.mock('next/navigation', () => ({
        usePathname: () => '/',
      }));

      const { container } = renderWithProviders(<Navigation />);
      const nav = container.querySelector('nav[aria-label="Main navigation"]');
      expect(nav).toBeInTheDocument();
    });

    it('should have aria-label on GitHub link', () => {
      vi.mock('next/navigation', () => ({
        usePathname: () => '/',
      }));

      renderWithProviders(<Navigation />);
      const githubLink = screen.getByLabelText('GitHub repository');
      expect(githubLink).toHaveAttribute('aria-label', 'GitHub repository');
    });

    it('should open GitHub link in new tab', () => {
      vi.mock('next/navigation', () => ({
        usePathname: () => '/',
      }));

      renderWithProviders(<Navigation />);
      const githubLink = screen.getByLabelText('GitHub repository');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('layout', () => {
    it('should render nav items in flex container', () => {
      vi.mock('next/navigation', () => ({
        usePathname: () => '/',
      }));

      const { container } = renderWithProviders(<Navigation />);
      const nav = container.querySelector('nav');
      expect(nav?.className).toContain('flex');
      expect(nav?.className).toContain('items-center');
    });

    it('should have spacing between items', () => {
      vi.mock('next/navigation', () => ({
        usePathname: () => '/',
      }));

      const { container } = renderWithProviders(<Navigation />);
      const nav = container.querySelector('nav');
      expect(nav?.className).toContain('space-x-1');
    });
  });

  describe('styling', () => {
    it('should have rounded navigation links', () => {
      vi.mock('next/navigation', () => ({
        usePathname: () => '/',
      }));

      renderWithProviders(<Navigation />);
      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink?.className).toContain('rounded-md');
    });

    it('should have transition on navigation links', () => {
      vi.mock('next/navigation', () => ({
        usePathname: () => '/',
      }));

      renderWithProviders(<Navigation />);
      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink?.className).toContain('transition-colors');
    });
  });
});
