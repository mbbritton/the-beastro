import { test, expect } from '@playwright/test';

test.describe('Pet Questionnaire Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#questionnaire');
  });

  test('should display the form', async ({ page }) => {
    await expect(page.locator('#qForm')).toBeVisible();
    await expect(page.locator('h2')).toContainText('Tell Us About Your Pet');
  });

  test('should have all required form fields', async ({ page }) => {
    await expect(page.locator('#ownerName')).toBeVisible();
    await expect(page.locator('#petName')).toBeVisible();
    await expect(page.locator('#species')).toBeVisible();
    await expect(page.locator('#personality')).toBeVisible();
    await expect(page.locator('#quirks')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // HTML5 validation should prevent submission
    const ownerName = page.locator('#ownerName');
    await expect(ownerName).toHaveAttribute('required');
  });

  test('should successfully submit form with valid data', async ({ page }) => {
    await page.fill('#ownerName', 'John Doe');
    await page.fill('#petName', 'Fluffy');
    await page.selectOption('#species', 'Cat');
    await page.fill('#personality', 'playful energetic cuddly');
    await page.fill('#quirks', 'Loves to chase laser pointers and nap in sunny spots');
    await page.fill('#story', 'Adopted from a shelter and has been the best companion ever since.');

    await page.click('button[type="submit"]');

    // Wait for success message
    const successMessage = page.locator('#qSuccess');
    await expect(successMessage).toBeVisible({ timeout: 2000 });
    await expect(successMessage.locator('h3')).toContainText('The chef has received your submission');
    
    // Form should be hidden
    await expect(page.locator('#qForm')).toBeHidden();
  });

  test('should reset form and return to form view', async ({ page }) => {
    // Fill and submit form
    await page.fill('#ownerName', 'Jane Smith');
    await page.fill('#petName', 'Max');
    await page.selectOption('#species', 'Dog');
    await page.fill('#personality', 'loyal friendly active');
    await page.fill('#quirks', 'Loves to play fetch');

    await page.click('button[type="submit"]');
    await expect(page.locator('#qSuccess')).toBeVisible({ timeout: 2000 });

    // Click reset button
    await page.click('#qSuccess button');

    // Form should be visible and reset
    await expect(page.locator('#qForm')).toBeVisible();
    await expect(page.locator('#qSuccess')).toBeHidden();
    await expect(page.locator('#ownerName')).toHaveValue('');
  });

  test('should enforce max length on inputs', async ({ page }) => {
    const ownerName = page.locator('#ownerName');
    await expect(ownerName).toHaveAttribute('maxlength', '100');
    
    const petName = page.locator('#petName');
    await expect(petName).toHaveAttribute('maxlength', '100');
    
    const quirks = page.locator('#quirks');
    await expect(quirks).toHaveAttribute('maxlength', '1000');
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    await expect(page.locator('#ownerName')).toHaveAttribute('aria-required', 'true');
    await expect(page.locator('#petName')).toHaveAttribute('aria-required', 'true');
    await expect(page.locator('#personality')).toHaveAttribute('aria-required', 'true');
    await expect(page.locator('#quirks')).toHaveAttribute('aria-required', 'true');
  });

  test('should focus on success heading after submission', async ({ page }) => {
    await page.fill('#ownerName', 'Test User');
    await page.fill('#petName', 'Test Pet');
    await page.selectOption('#species', 'Cat');
    await page.fill('#personality', 'test test test');
    await page.fill('#quirks', 'test quirk');

    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(1500);
    
    const successHeading = page.locator('#qSuccess h3');
    await expect(successHeading).toHaveAttribute('tabindex', '-1');
  });
});
