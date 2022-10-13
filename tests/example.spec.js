// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Example test', () => {

  test.beforeEach(async ({ page }) => {
    await page.route(/listusers/g, route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{"username":"mockthis","score":123}]),
    }));
  });

  test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/leaderboard');

    await expect(page.locator('#showData')).toHaveScreenshot({ maxDiffPixels: 100 });

  });

});