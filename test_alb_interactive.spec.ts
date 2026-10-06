import { test, expect } from '@playwright/test';

test('ALB Sim Test', async ({ page }) => {
  const messages: string[] = [];
  page.on('console', msg => messages.push(msg.text()));
  page.on('pageerror', error => messages.push(error.message));

  await page.goto('http://localhost:4321/en/modules/02-compute-scaling-and-load-balancing');

  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'alb_sim_playwright.png', fullPage: true });

  console.log('CONSOLE LOGS:');
  console.log(messages.join('\n'));
});
