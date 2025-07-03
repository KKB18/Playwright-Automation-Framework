import { test, expect } from '@playwright/test';

test('homepage layout should be visually consistent', async ({ page }) => {
  await page.goto('https://letcode.in/');
  await expect(page).toHaveScreenshot('homepage_baseline.png', { fullPage: true });
});

test('header section should be visually consistent', async ({ page }) => {
  await page.goto('https://letcode.in/');
  const header = page.locator(`//nav[@aria-label="main navigation"]`);
  await expect(header).toHaveScreenshot('header_baseline.png');
});