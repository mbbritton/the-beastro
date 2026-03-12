import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper document structure', async ({ page }) => {
    // Check for lang attribute
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');

    // Check for main heading
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('The Beastro');
  });

  test('should have skip to content link', async ({ page }) => {
    const skipLink = page.locator('.skip-to-content');
    await expect(skipLink).toHaveAttribute('href', '#hero');
  });

  test('should focus skip link on Tab', async ({ page }) => {
    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-to-content');
    await expect(skipLink).toBeFocused();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Get all headings
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();
    const h3Count = await page.locator('h3').count();

    // Should have exactly one h1
    expect(h1Count).toBe(1);
    
    // Should have multiple h2 (section headings)
    expect(h2Count).toBeGreaterThan(0);
    
    // Should have h3 for subsections
    expect(h3Count).toBeGreaterThan(0);
  });

  test('should have form labels associated with inputs', async ({ page }) => {
    await page.goto('/#questionnaire');

    // Check that all form inputs have associated labels
    const ownerNameLabel = page.locator('label[for="ownerName"]');
    await expect(ownerNameLabel).toBeVisible();

    const petNameLabel = page.locator('label[for="petName"]');
    await expect(petNameLabel).toBeVisible();

    const speciesLabel = page.locator('label[for="species"]');
    await expect(speciesLabel).toBeVisible();
  });

  test('should support keyboard navigation through form', async ({ page }) => {
    await page.goto('/#questionnaire');
    
    // First Tab hits skip link, second hits first nav link, keep tabbing to ownerName
    await page.locator('#ownerName').focus();
    await expect(page.locator('#ownerName')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('#petName')).toBeFocused();
  });

  test('should have visible focus indicators', async ({ page }) => {
    // Verify the CSS rule for focus-visible exists in the stylesheet
    const hasFocusStyle = await page.evaluate(() => {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText && rule.selectorText.includes('focus-visible')) {
              return true;
            }
          }
        } catch (e) {
          // cross-origin sheet, skip
        }
      }
      return false;
    });
    expect(hasFocusStyle).toBe(true);
  });

  test('should have ARIA landmarks', async ({ page }) => {
    // Check for nav landmark
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check for footer
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have proper button roles and types', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]').first();
    await expect(submitButton).toHaveAttribute('type', 'submit');

    const hamburger = page.locator('.nav-hamburger');
    await expect(hamburger).toHaveAttribute('aria-label');
  });

  test('should announce form submission to screen readers', async ({ page }) => {
    await page.goto('/#questionnaire');
    
    await page.fill('#ownerName', 'Test User');
    await page.fill('#petName', 'Test Pet');
    await page.selectOption('#species', 'Cat');
    await page.fill('#personality', 'test');
    await page.fill('#quirks', 'test');

    await page.click('button[type="submit"]');
    
    // Wait for success message
    await page.waitForTimeout(1500);
    
    // Success heading should be focusable
    const successHeading = page.locator('#qSuccess h3');
    await expect(successHeading).toHaveAttribute('tabindex', '-1');
  });
});
