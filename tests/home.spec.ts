import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { ResultsPage } from '../pages/ResultsPage'
import { capitalizeFirstLetter } from '../utils/helpers'

const searchValue = 'android'

let home: HomePage
let results: ResultsPage

test.beforeEach(async ({ page }) => {
  home = new HomePage(page)
  results = new ResultsPage(page)

  await page.goto('/')
})

test('should search for android', { tag: ['@smoke'] }, async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DuckDuckGo/)
  await home.searchBy(searchValue)
  const titles = await results.allTitles.allInnerTexts()
  titles.forEach((title) => {
    expect(title).toContain(capitalizeFirstLetter(searchValue))
  })
})
