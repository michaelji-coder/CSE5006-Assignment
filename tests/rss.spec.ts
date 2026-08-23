import { test, expect } from '@playwright/test';

test.describe('Assessment 3 - RSS Server & Client E2E Tests', () => {

  // ----------------------------------------------------
  // TEST 1: Server Use Case (CRUD / Post Creation)
  // ----------------------------------------------------
  test('Server Use Case: Create a new blog/feed entry via form', async ({ page }) => {
    // 1. Navigate to Create Blog Page
    await page.goto('/createblog');
    await expect(page.locator('h2')).toContainText('Create New Blog Post');

    // 2. Fill out form fields
    const testTitle = `Automation Test Post ${Date.now()}`;
    await page.locator('input[placeholder="Author *"]').fill('Playwright Tester');
    await page.locator('input[placeholder="Title *"]').fill(testTitle);
    await page.locator('textarea[placeholder="Description *"]').fill('Automated end-to-end test description.');
    await page.locator('input[placeholder="Image URL (Optional)"]').fill('https://via.placeholder.com/150');

    // 3. Submit Form
    await page.locator('button:has-text("Add Data")').click();

    // 4. Assert Success Banner
    const alert = page.locator('.alert-success');
    await expect(alert).toBeVisible({ timeout: 10000 });
    await expect(alert).toContainText('Blog post saved to database successfully!');

    // 5. Verify post appears on main feed
    await page.goto('/');
    await expect(page.locator('body')).toContainText(testTitle);
  });

  // ----------------------------------------------------
  // TEST 2: Client Use Case (Feed Viewing & Dashboard)
  // ----------------------------------------------------
  test('Client Use Case: Retrieve RSS feeds and inspect observability metrics', async ({ page }) => {
    // 1. Load Main Feed Page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 2. Load Observability Dashboard
    await page.goto('/dashboard');
    await expect(page.locator('h2')).toContainText('RSS System Observability & Reporting Dashboard');

    // 3. Assert Health Check Banner
    const healthCard = page.locator('.card:has-text("System Health Check")');
    await expect(healthCard).toBeVisible();
    await expect(healthCard).toContainText('200 OK');

    // 4. Assert Metric Cards
    await expect(page.locator('h6:has-text("Total Requests")')).toBeVisible();
    await expect(page.locator('h6:has-text("Total RSS Feeds")')).toBeVisible();
    await expect(page.locator('h6:has-text("Unique Clients")')).toBeVisible();
  });

});