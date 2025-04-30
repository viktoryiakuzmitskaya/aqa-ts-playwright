// Разработать тест со следующими шагами:

//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

import { test, expect } from '@playwright/test';

test.describe('[UI] [Heroku] Dynamic Controls', () => {
    test('', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.getByRole('link', { name: 'Dynamic Controls' }).click();
        await page.getByRole('button', { name: 'Remove' }).waitFor({ state: 'visible' });
        await expect(page.locator('h4').nth(0)).toHaveText('Dynamic Controls');
        await expect(page.locator('h4.subheader').nth(0)).toHaveText('Remove/add');
        await expect(page.locator('h4.subheader').nth(1)).toHaveText('Enable/disable');
        await page.getByRole('checkbox').check();
        await page.getByRole('button', { name: 'Remove' }).click();
        await page.getByRole('checkbox').waitFor({ state: 'hidden' });
        await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
        await expect(page.locator('#message')).toHaveText("It's gone!");
        await page.getByRole('button', { name: 'Add' }).click();
        await page.getByRole('checkbox').waitFor({ state: 'visible' });
        await expect(page.locator('#message')).toHaveText("It's back!");
    });
});
