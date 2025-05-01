import { test, expect } from '@playwright/test';

test.describe('[UI] [SMOKE] [REGISTER] smoke tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://anatoly-karpovich.github.io/demo-login-form/');
    await page.locator('#registerOnLogin').click();
  });

  test('"Registration" form is displaed correctly', async ({ page }) => {
    await expect(page.locator('#userNameOnRegister'), 'Username input is visible').toBeVisible();
    await expect(page.locator('#passwordOnRegister'), 'Password input is visible').toBeVisible();
    await expect(page.locator('#register'), '"Register" button is visible').toBeVisible();
    await expect(page.locator('#register')).toContainText("Register");
  });

  test('Register with valid username and password at their minimum length', async ({ page }) => {
    await page.locator('#userNameOnRegister').fill('Ab1');
    await page.locator('#passwordOnRegister').fill('Abcdef12');
    await page.locator('#register').click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText('Successfully registered! Please, click Back to return on login page');
  });

  test('Register with valid username and password at their maximum length', async ({ page }) => {
    await page.locator('#userNameOnRegister').fill('Ab def1');
    await page.locator('#passwordOnRegister').fill('Abcdefg ijklmnop12');
    await page.locator('#register').click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText('Successfully registered! Please, click Back to return on login page');
  });
});