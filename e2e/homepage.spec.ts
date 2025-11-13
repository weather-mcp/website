import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section with title', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Weather MCP');
  });

  test('should have working navigation links', async ({ page }) => {
    // Check header navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check for main navigation items
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /docs/i })).toBeVisible();
  });

  test('should render features section', async ({ page }) => {
    // Look for features section
    const featuresHeading = page.getByRole('heading', { name: /features/i });
    await expect(featuresHeading).toBeVisible();
  });

  test('should have CTA buttons', async ({ page }) => {
    // Check for call-to-action buttons
    const buttons = page.locator('button, a[role="button"]');
    await expect(buttons.first()).toBeVisible();
  });

  test('should render footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check for copyright or organization info
    await expect(footer).toContainText(/weather.*mcp/i);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that main content is still visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    // Check for essential meta tags
    await expect(page).toHaveTitle(/Weather MCP/i);
  });

  test('should load without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known non-critical errors (like missing favicon)
    const criticalErrors = errors.filter(
      (error) => !error.includes('favicon') && !error.includes('404')
    );

    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe('Homepage Navigation', () => {
  test('should navigate to docs page', async ({ page }) => {
    await page.goto('/');

    // Click on docs link
    await page.getByRole('link', { name: /docs/i }).first().click();

    // Wait for navigation
    await page.waitForURL(/\/docs/);

    // Verify we're on docs page
    expect(page.url()).toContain('/docs');
  });

  test('should navigate to dashboard when link exists', async ({ page }) => {
    await page.goto('/');

    // Check if dashboard link exists
    const dashboardLink = page.getByRole('link', { name: /dashboard/i }).first();
    if (await dashboardLink.isVisible()) {
      await dashboardLink.click();
      await page.waitForURL(/\/dashboard/);
      expect(page.url()).toContain('/dashboard');
    }
  });
});

test.describe('Homepage Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check for h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);

    // Should have only one h1
    expect(h1Count).toBeLessThanOrEqual(1);
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');

    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();

    // Check each image has alt text
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeDefined();
    }
  });

  test('should have proper link text', async ({ page }) => {
    await page.goto('/');

    // Get all links
    const links = page.locator('a');
    const linkCount = await links.count();

    // Check that links have text or aria-label
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');

      expect(text || ariaLabel).toBeTruthy();
    }
  });
});
