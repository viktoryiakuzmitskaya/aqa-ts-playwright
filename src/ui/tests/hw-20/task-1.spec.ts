import { test, expect } from '@playwright/test';
import { negativeTestCases } from './task-1-test-data.js';

test.describe('[UI] [Registration] Negative Test Cases', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://anatoly-karpovich.github.io/demo-login-form/');
        await page.locator('#registerOnLogin').click();
    });

    for (const { testCaseName, username, password, errorMessage } of negativeTestCases) {
        test(testCaseName, async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(username);
            await page.locator('#passwordOnRegister').fill(password);
            await page.locator('#register').click();
            await expect(page.locator("#errorMessageOnRegister")).toHaveText(errorMessage);
        });
    }
});