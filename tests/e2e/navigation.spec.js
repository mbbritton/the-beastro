import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main navigation', async ({ page }) => {
    await expect(page.locator('.nav-logo')).toContainText('The Beastro');
    await expect(page.locator('.nav-links')).toBeVisible();
  });

  test('should navigate to sections via nav links', async ({ page }) => {
    await page.click('a[href="#about"]');
    await expect(page.locator('#about')).toBeInViewport();

    await page.click('a[href="#questionnaire"]');
    await expect(page.locator('#questionnaire')).toBeInViewport();

    await page.click('a[href="#gallery"]');
    await expect(page.locator('#gallery')).toBeInViewport();

    await page.click('a[href="#menu"]');
    await expect(page.locator('#menu')).toBeInViewport();
  });

  test('should toggle mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const mobileNav = page.locator('#navMobile');
    await expect(mobileNav).not.toHaveClass(/open/);

    await page.click('.nav-hamburger');
    await expect(mobileNav).toHaveClass(/open/);

    await page.click('.nav-hamburger');
    await expect(mobileNav).not.toHaveClass(/open/);
  });

  test('should have proper ARIA attributes on hamburger button', async ({ page }) => {
    const hamburger = page.locator('.nav-hamburger');
    await expect(hamburger).toHaveAttribute('aria-label', 'Toggle navigation menu');
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    await expect(hamburger).toHaveAttribute('aria-controls', 'navMobile');
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-to-content');
    await expect(skipLink).toBeFocused();
  });
});
