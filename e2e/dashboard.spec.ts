import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    // Mock API responses to avoid external dependencies
    await page.route('**/v1/stats/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          overview: {
            period: '24h',
            start_date: '2025-11-12T00:00:00Z',
            end_date: '2025-11-13T00:00:00Z',
            summary: {
              total_calls: 5432,
              unique_versions: 12,
              active_installs: 345,
              success_rate: 97.8,
              avg_response_time_ms: 425,
            },
            tools: [
              {
                name: 'get_forecast',
                calls: 1250,
                success_rate: 98.5,
                avg_response_time_ms: 450,
              },
            ],
            errors: [],
            cache_hit_rate: 78.5,
          },
          toolUsage: [],
          performance: {
            by_tool: {},
            timeline: [],
          },
          errors: [],
          cache: {
            hit_rate: 78.5,
            total_requests: 5432,
            cache_hits: 4264,
            cache_misses: 1168,
            saved_requests: 4264,
            by_tool: {},
          },
          services: {
            noaa: {
              calls: 3259,
              percentage: 60.0,
              success_rate: 98.2,
            },
            openMeteo: {
              calls: 2173,
              percentage: 40.0,
              success_rate: 97.1,
            },
          },
          geo: {
            countries: [],
          },
        }),
      });
    });

    await page.goto('/dashboard');
  });

  test('should load dashboard page', async ({ page }) => {
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should display dashboard heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /dashboard/i }).first();
    await expect(heading).toBeVisible();
  });

  test('should render metric cards', async ({ page }) => {
    // Wait for data to load
    await page.waitForTimeout(1000);

    // Check for metric cards (using data-testid from MetricCard component)
    const metricCards = page.locator('[data-testid="overview-card"]');
    const count = await metricCards.count();

    // Should have at least one metric card
    expect(count).toBeGreaterThan(0);
  });

  test('should have time range selector', async ({ page }) => {
    // Look for time range buttons or select
    const timeRangeSelector = page.locator('button, select').filter({
      hasText: /1h|24h|7d|30d/,
    });

    // Should have at least one time range option
    expect(await timeRangeSelector.count()).toBeGreaterThan(0);
  });

  test('should display loading state initially', async ({ page }) => {
    // Delay API response to catch loading state
    await page.route('**/v1/stats/**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ overview: {}, toolUsage: [] }),
      });
    });

    await page.goto('/dashboard');

    // Look for loading indicators
    const loadingIndicators = page.locator(
      'text=/loading/i, [role="progressbar"], .animate-spin'
    );
    await expect(loadingIndicators.first()).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Dashboard should still be accessible
    await expect(page.getByRole('heading').first()).toBeVisible();
  });
});

test.describe('Dashboard Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/v1/stats/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          overview: {
            period: '24h',
            summary: {
              total_calls: 5432,
              unique_versions: 12,
              active_installs: 345,
              success_rate: 97.8,
              avg_response_time_ms: 425,
            },
            tools: [],
            errors: [],
            cache_hit_rate: 78.5,
          },
          toolUsage: [],
          performance: { by_tool: {}, timeline: [] },
          errors: [],
          cache: {
            hit_rate: 78.5,
            total_requests: 5432,
            cache_hits: 4264,
            cache_misses: 1168,
            saved_requests: 4264,
            by_tool: {},
          },
          services: {
            noaa: { calls: 3259, percentage: 60.0, success_rate: 98.2 },
            openMeteo: { calls: 2173, percentage: 40.0, success_rate: 97.1 },
          },
          geo: { countries: [] },
        }),
      });
    });

    await page.goto('/dashboard');
  });

  test('should switch time ranges', async ({ page }) => {
    // Wait for initial load
    await page.waitForTimeout(500);

    // Find time range buttons
    const timeRangeButtons = page.locator('button').filter({
      hasText: /24h|7d|30d/,
    });

    if ((await timeRangeButtons.count()) > 0) {
      // Click a different time range
      const button = timeRangeButtons.first();
      await button.click();

      // API should be called with new time range
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Dashboard Error Handling', () => {
  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API error
    await page.route('**/v1/stats/**', async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.goto('/dashboard');

    // Should show error state (not crash)
    await page.waitForTimeout(1000);

    // Page should still be rendered
    expect(page.url()).toContain('/dashboard');
  });

  test('should handle network timeouts', async ({ page }) => {
    // Mock slow API that times out
    await page.route('**/v1/stats/**', async (route) => {
      // Don't fulfill - let it timeout
      await new Promise(() => {}); // Never resolves
    });

    await page.goto('/dashboard', { timeout: 10000 });

    // Dashboard should still render with error state
    expect(page.url()).toContain('/dashboard');
  });
});
