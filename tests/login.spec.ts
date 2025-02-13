import { test, expect } from '@playwright/test'
import path from 'path'
const authFile = path.join(__dirname, '../user.json');

test.beforeEach(async ({ page }) => {
  await page.goto('https://qaplaywright.aiwyn-dev.app/client-portal/login')
})

test.skip('should login to aiwyn', async ({ page }) => {
  // Login to the application
  await expect(page.getByText('Log in to Your Account')).toBeVisible()
  await page.getByTestId('username').fill('qa+interviewer1@aiwyn.ai')
  await page.getByTestId('password').fill('Aiwyn123!')
  await page.getByTestId('user-login').click()

  // Wait for invoces page to loag
  await expect(page.getByRole('heading', { name: 'Invoices' })).toBeVisible({ timeout: 60000 })
  // Save browser context
  await page.context().storageState({ path: authFile });
})
