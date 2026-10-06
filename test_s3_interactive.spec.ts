import { test, expect } from '@playwright/test';

test('S3 Sim Test', async ({ page }) => {
  await page.goto('http://localhost:4321/en/modules/03-storage-and-data-lifecycle');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 's3_sim_playwright.png', fullPage: true });
});
