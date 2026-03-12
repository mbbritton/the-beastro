import { test, expect } from '@playwright/test';

test.describe('Pet Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll gallery into view so IntersectionObserver fires and cards render
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.locator('.pet-card').first().waitFor({ state: 'attached' });
  });

  test('should display pet cards', async ({ page }) => {
    const petGrid = page.locator('#petGrid');
    await expect(petGrid).toBeAttached();

    const petCards = page.locator('.pet-card');
    const count = await petCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display pet information', async ({ page }) => {
    const firstCard = page.locator('.pet-card').first();

    await expect(firstCard.locator('.pet-name')).toBeAttached();
    await expect(firstCard.locator('.pet-owner')).toBeAttached();
    await expect(firstCard.locator('.pet-bio')).toBeAttached();
    await expect(firstCard.locator('.chef-creation')).toBeAttached();
  });

  test('should display trait tags', async ({ page }) => {
    const firstCard = page.locator('.pet-card').first();
    const traitTags = firstCard.locator('.trait-tag');

    const count = await traitTags.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display chef creation details', async ({ page }) => {
    const firstCard = page.locator('.pet-card').first();

    await expect(firstCard.locator('.chef-name')).toBeAttached();
    await expect(firstCard.locator('.chef-desc')).toBeAttached();
  });

  test('should have lazy loading on images', async ({ page }) => {
    const images = page.locator('.pet-card-img img');
    const firstImage = images.first();

    await expect(firstImage).toHaveAttribute('loading', 'lazy');
  });

  test('should handle image errors with placeholder', async ({ page }) => {
    // Wait for images to load or show placeholders
    await page.waitForTimeout(1000);
    
    // Check if any placeholders are displayed (for missing images)
    const placeholders = page.locator('.pet-placeholder');
    if (await placeholders.count() > 0) {
      const firstPlaceholder = placeholders.first();
      await expect(firstPlaceholder).toBeVisible();
      await expect(firstPlaceholder).toContainText('Photo coming soon');
    }
  });

  test('should have proper alt text on images', async ({ page }) => {
    const images = page.locator('.pet-card-img img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const altText = await img.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText.length).toBeGreaterThan(0);
    }
  });
});
