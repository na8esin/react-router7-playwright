import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/sign-in/);
});

test('sign in', async ({ page }) => {
  await page.goto('/');

  // Fill in the form
  await page.getByLabel('email').fill('a@example.com');
  await page.getByLabel('password').fill('aaa');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Expect the URL to be /home
  await expect(page).toHaveURL(/home/);

  // Expect the page to contain "hello"
  await expect(page.getByText('hello')).toBeVisible();
});

test('network error', async ({ page }) => {
  // Block api requests
  await page.route(/_root\.data/, route => route.abort('internetdisconnected'));

  await page.goto('/');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.getByText('Oops!')).toBeVisible();
});