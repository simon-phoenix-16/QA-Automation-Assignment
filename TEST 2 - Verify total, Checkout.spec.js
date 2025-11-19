	
import { test, expect } from '@playwright/test';

test('Verify total', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  // Login with a username and password:
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  // Adding items to the cart:
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  
  // Performing the checkout process:
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Simon');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('Phoenix');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('7845811');
  await page.locator('[data-test="continue"]').click();
  
  // Expect total price to be $95.01:
  const totalLabel = page.locator('data-test="total-label"');
  
  await expect(totalLabel).toHaveText('$95.01');  // class="summary_total_label"  .summary_total_label  data-test="total-label"
  
  await page.locator('[data-test="finish"]').click();
  
  // Expect the title to be "Thank you for your order!":
  await expect('https://www.saucedemo.com/checkout-complete.html').toHaveTitle(/Thank you for your order!/);
  await page.locator('[data-test="complete-header"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="reset-sidebar-link"]').click();
});


// Global checkout flow

const { firefox } = require('@playwright/test');

module.exports = async (config) => {
  console.log('Global setup running...');
  
  
  const browser = await firefox.launch();
  const page = await browser.newPage();
  
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Simon');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('Phoenix');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('7845811');
  await page.locator('[data-test="continue"]').click();
  
  // Expect the title to be "Thank you for your order!"
  await expect('https://www.saucedemo.com/checkout-complete.html').toHaveTitle(/Thank you for your order!/);
  
  console.log('Global setup complete');
};