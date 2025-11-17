
import { test, expect } from '@playwright/test';

test('Checkout problematic user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  // Login with a username and password:
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  
  // Verifying cart has 0 products: 
  await expect('[data-test="cart-quantity-label"]').toHaveValue('0');
  
  // Adding items to the cart:
  await page.locator('[data-test="continue-shopping"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
 
  // Performing checkout flow:
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Mozes');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('e');
  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('5465312');
  await page.locator('[data-test="continue"]').click();
  
  // Checking if the test fails:
  await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required');
  
  // Taking a screenshot:
  await expect(page.locator('[data-test="checkout-info-container"]')).toMatchAriaSnapshot(`
    - textbox "First Name"
    - textbox "Last Name"
    - textbox "Zip/Postal Code"
    - 'heading "Error: Last Name is required" [level=3]':
      - button
    - button "Go back Cancel":
      - img "Go back"
    - button "Continue"
    `);
});