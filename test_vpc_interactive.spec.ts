import { test, expect } from '@playwright/test';

test('VPC Sim Test', async ({ page }) => {
  await page.goto('http://localhost:4321/en/modules/01-networking-and-hybrid-connectivity');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'vpc_sim_playwright.png', fullPage: true });
});
