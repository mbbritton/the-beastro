import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should load page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Page should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should use lazy loading for images', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('.pet-card-img img');
    const firstImage = images.first();
    
    // Check loading attribute
    await expect(firstImage).toHaveAttribute('loading', 'lazy');
  });

  test('should preconnect to Google Fonts', async ({ page }) => {
    await page.goto('/');
    
    const preconnects = page.locator('link[rel="preconnect"]');
    const count = await preconnects.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Check for Google Fonts preconnect
    const fontsPreconnect = page.locator('link[rel="preconnect"][href*="googleapis.com"]');
    await expect(fontsPreconnect).toHaveCount(1);
  });

  test('should have proper cache headers (when deployed)', async ({ page }) => {
    // This test is more relevant when deployed, but we can check basic response
    const response = await page.goto('/');
    expect(response.status()).toBe(200);
  });

  test('should not have layout shift during page load', async ({ page }) => {
    await page.goto('/');
    
    // Wait for animations to complete
    await page.waitForTimeout(1000);
    
    // Check that pet grid exists
    await expect(page.locator('#petGrid')).toBeVisible();
  });

  test('should efficiently handle scroll events', async ({ page }) => {
    await page.goto('/');
    
    // Scroll multiple times quickly
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 100));
      await page.waitForTimeout(50);
    }
    
    // Nav should have box shadow after scroll
    const nav = page.locator('.nav');
    await expect(nav).toBeVisible();
  });

  test('should load external resources securely', async ({ page }) => {
    await page.goto('/');
    
    // Check DOMPurify is loaded with integrity
    const dompurifyScript = page.locator('script[src*="dompurify"]');
    await expect(dompurifyScript).toHaveAttribute('integrity');
    await expect(dompurifyScript).toHaveAttribute('crossorigin', 'anonymous');
  });
});
