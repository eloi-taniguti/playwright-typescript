import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { ResultsPage } from '../pages/ResultsPage'

const searchValue = 'android'
enum Tab {'All', 'Images', 'Videos', 'News', 'Maps'}

let home: HomePage
let results: ResultsPage

test.beforeEach(async ({ page }) => {
  home = new HomePage(page)
  results = new ResultsPage(page)

  await page.goto('/')
  await home.searchBy(searchValue)
})

test('should have more than 10 regions', { tag: ['@smoke'] }, async () => {
    await results.regionFilterButton.click()
    expect(await results.regionItems.count()).toBeGreaterThan(10)
})

test('should search from header', async () => {
    await results.searchInHeader('amazon')
    await expect(results.allTitles.first()).toContainText('Amazon.com')
})

test('should view Images', async () => {
    await results.selectTab(Tab.Images)
    await expect(results.allImgTitles.first()).toContainText('Android')
})

test('should view Videos', async () => {
    await results.selectTab(Tab.Videos)
    await expect(results.allVideoTitles.first()).toContainText('Android')
})
