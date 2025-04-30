import { test, expect } from '@playwright/test';

test.describe('[UI] [SMOKE] [REGISTER] smoke tests', () => {
  const testData = {
    firstName: 'Dorothy',
    lastName: 'Jones',
    address: '01 Imaginary St, apt 1',
    email: 'test@mail.com',
    phone: '+00000000000',
    country: 'Canada',
    gender: 'female',
    hobbies: ['Travelling', 'Sports'],
    language: 'English',
    skills: 'JavaScript',
    dateOfBirth: {
      year: '1993',
      month: 'April',
      day: '1',
    },
    password: 'verystrongpass',
    maskedPassword: '**************',
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('https://anatoly-karpovich.github.io/demo-registration-form/');
  });

  test('Register with valid data in all required fields', async ({ page }) => {
    const {
      firstName,
      lastName,
      address,
      email,
      phone,
      country,
      gender,
      hobbies,
      language,
      skills,
      dateOfBirth: { year, month, day },
      password,
      maskedPassword,
    } = testData;
    
    await page.locator('#firstName').fill(firstName);
    await page.locator('#lastName').fill(lastName);
    await page.locator('#address').fill(address);
    await page.locator('#email').fill(email);
    await page.locator('#phone').fill(phone);
    await page.locator('#country').selectOption(country);
    await page.locator(`//input[@value='${gender}']`).click();
    for (const hobby of hobbies) {
      await page.locator(`//input[@value='${hobby}']`).click();
    }
    await page.locator('#language').fill(language);
    await page.locator('#skills').selectOption(skills);
    await page.locator('#year').selectOption(year);
    await page.locator('#month').selectOption(month);
    await page.locator('#day').selectOption(day);
    await page.locator('#password').fill(password);
    await page.locator('#password-confirm').fill(password);
    await page.locator('button[type="Submit"]').click();    
    await expect(page.getByRole('heading')).toHaveText('Registration Details');
    await expect(page.locator('#fullName')).toHaveText(`${firstName} ${lastName}`);
    await expect(page.locator('#address')).toHaveText(address);
    await expect(page.locator('#email')).toHaveText(email);
    await expect(page.locator('#phone')).toHaveText(phone);
    await expect(page.locator('#country')).toHaveText(country);
    await expect(page.locator('#gender')).toHaveText(gender);
    await expect(page.locator('#skills')).toHaveText(skills);
    await expect(page.locator('#hobbies')).toHaveText(hobbies.join(', '));
    await expect(page.locator('#dateOfBirth')).toHaveText(`${day} ${month} ${year}`);
    await expect(page.locator('#password')).toHaveText(maskedPassword);
    await expect(page.getByRole('button', { name: 'Back to Form' })).toBeVisible();
  });
});