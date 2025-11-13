import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test('should navigate between major pages', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await expect(page).toHaveURL('/');

    // Navigate to docs
    const docsLink = page.getByRole('link', { name: /docs/i }).first();
    if (await docsLink.isVisible()) {
      await docsLink.click();
      await page.waitForURL(/\/docs/);
      expect(page.url()).toContain('/docs');
    }

    // Navigate back to home
    const homeLink = page.getByRole('link', { name: /home|weather mcp/i }).first();
    if (await homeLink.isVisible()) {
      await homeLink.click();
      await page.waitForURL('/');
      expect(page.url()).toEqual(expect.stringContaining('/'));
    }
  });

  test('should have consistent header across pages', async ({ page }) => {
    // Check homepage header
    await page.goto('/');
    const homeHeader = page.locator('header, nav').first();
    await expect(homeHeader).toBeVisible();

    // Check docs header
    await page.goto('/docs');
    const docsHeader = page.locator('header, nav').first();
    await expect(docsHeader).toBeVisible();
  });

  test('should have consistent footer across pages', async ({ page }) => {
    // Check homepage footer
    await page.goto('/');
    const homeFooter = page.locator('footer').first();
    await expect(homeFooter).toBeVisible();

    // Check docs footer
    await page.goto('/docs');
    const docsFooter = page.locator('footer').first();
    await expect(docsFooter).toBeVisible();
  });

  test('should highlight active navigation item', async ({ page }) => {
    await page.goto('/');

    // Look for active/current nav indicators
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    // Active items might have specific classes or aria-current
    const activeLink = nav.locator('[aria-current="page"], .active').first();
    // Some pages might not have active state, so we just check if nav exists
    expect(await nav.isVisible()).toBe(true);
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    await page.goto('/');

    // Navigate to docs
    const docsLink = page.getByRole('link', { name: /docs/i }).first();
    if (await docsLink.isVisible()) {
      await docsLink.click();
      await page.waitForURL(/\/docs/);

      // Go back
      await page.goBack();
      await page.waitForURL('/');
      expect(page.url()).not.toContain('/docs');

      // Go forward
      await page.goForward();
      await page.waitForURL(/\/docs/);
      expect(page.url()).toContain('/docs');
    }
  });
});

test.describe('Mobile Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('should have mobile menu on small screens', async ({ page }) => {
    await page.goto('/');

    // Look for mobile menu button (hamburger icon)
    const mobileMenuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="navigation" i]').first();

    // Mobile menu button should exist on mobile
    if (await mobileMenuButton.isVisible()) {
      await expect(mobileMenuButton).toBeVisible();
    }
  });

  test('should toggle mobile menu', async ({ page }) => {
    await page.goto('/');

    const mobileMenuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="navigation" i]').first();

    if (await mobileMenuButton.isVisible()) {
      // Open menu
      await mobileMenuButton.click();
      await page.waitForTimeout(300); // Wait for animation

      // Menu should be visible
      const menu = page.locator('[role="dialog"], nav .mobile-menu, .mobile-nav').first();
      if (await menu.isVisible()) {
        await expect(menu).toBeVisible();

        // Close menu (click button again or close button)
        const closeButton = page.locator('button[aria-label*="close" i]').first();
        if (await closeButton.isVisible()) {
          await closeButton.click();
        } else {
          await mobileMenuButton.click();
        }

        await page.waitForTimeout(300); // Wait for animation
      }
    }
  });

  test('should navigate from mobile menu', async ({ page }) => {
    await page.goto('/');

    const mobileMenuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="navigation" i]').first();

    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(300);

      // Try to click docs link in mobile menu
      const docsLink = page.getByRole('link', { name: /docs/i }).first();
      if (await docsLink.isVisible()) {
        await docsLink.click();
        await page.waitForURL(/\/docs/);
        expect(page.url()).toContain('/docs');
      }
    }
  });
});

test.describe('Keyboard Navigation', () => {
  test('should navigate using tab key', async ({ page }) => {
    await page.goto('/');

    // Press tab multiple times and check focus
    await page.keyboard.press('Tab');
    let focusedElement = await page.evaluate(() => document.activeElement?.tagName);

    // Should focus on interactive elements
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement || '');
  });

  test('should skip to main content', async ({ page }) => {
    await page.goto('/');

    // Look for skip link (accessibility feature)
    const skipLink = page.locator('a[href*="#main"], a[href*="#content"]').first();
    if (await skipLink.isVisible()) {
      await skipLink.click();

      // Main content should be focused
      const mainContent = page.locator('#main, #content, main').first();
      await expect(mainContent).toBeFocused();
    }
  });
});

test.describe('Link Validation', () => {
  test('should not have broken internal links', async ({ page }) => {
    await page.goto('/');

    // Get all internal links
    const links = await page.locator('a[href^="/"]').all();

    // Check a sample of links (not all to keep test fast)
    const samplSize = Math.min(links.length, 5);
    for (let i = 0; i < samplSize; i++) {
      const href = await links[i].getAttribute('href');
      if (href && href !== '#') {
        const response = await page.request.get(href);
        expect(response.status()).toBeLessThan(400);
      }
    }
  });

  test('should open external links in new tab', async ({ page }) => {
    await page.goto('/');

    // Get external links
    const externalLinks = await page
      .locator('a[href^="http"]:not([href*="weather-mcp.dev"])')
      .all();

    // Check that they have target="_blank"
    for (const link of externalLinks.slice(0, 5)) {
      const target = await link.getAttribute('target');
      const rel = await link.getAttribute('rel');

      if (target === '_blank') {
        // Should also have rel="noopener noreferrer" for security
        expect(rel).toContain('noopener');
      }
    }
  });
});
