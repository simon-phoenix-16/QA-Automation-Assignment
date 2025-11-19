
import { test, expect } from '@playwright/test';

test('Get Login Error Message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  // Login with a username and password:
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  // Expect error message to include: "user has been locked out":
  await expect(page.Locator('[data-test="error"]')).toContainText('user has been locked out');
});