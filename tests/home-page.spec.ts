import { test, expect } from '@playwright/test';

test('should search for android', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DuckDuckGo/)
  await page.locator('#searchbox_input').fill('android')
  await page.locator('button[aria-label="Search"]').click()
  await page.waitForLoadState('networkidle')
  const titles = await page.getByTestId('result-title-a').locator('span').allInnerTexts()
  titles.forEach((title) => {
    expect(title).toContain('Android')
  })
})

test('should count all regions', async ({ page }) => {
  await page.goto('/');

  await page.locator('#searchbox_input').fill('android')
  await page.locator('button[aria-label="Search"]').click()
  await page.waitForLoadState('networkidle')

  await page.getByTestId('region-filter-label').click()
  expect(await page.locator('.fdosLIuRgrWo7SyeqSUb').count()).toBeGreaterThan(10)
})

test('Handling a JSON response', async ({ request }) => {
  const res = await request.get('https://api.duckduckgo.com/?q=the+simpsons&format=json')
  const data = await res.json()
  const relatedTopics = data.RelatedTopics
  relatedTopics.forEach(( topic ) => {
    if (topic.Icon.URL) console.log(topic.Icon.URL)
  })
  const results = data.Results
  results.forEach(( result ) => {
    if (result.Icon.URL) console.log(result.Icon.URL)
  })

})
