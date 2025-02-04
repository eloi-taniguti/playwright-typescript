import { type Locator, type Page } from '@playwright/test';

export class ResultsPage {
    readonly page: Page
    readonly allTitles: Locator
    readonly regionFilterButton: Locator
    readonly regionItems: Locator

    constructor(page: Page) {
        this.page = page
        this.allTitles = page.getByTestId('result-title-a').locator('span')
        this.regionFilterButton = page.getByTestId('region-filter-label')
        this.regionItems = page.locator('.fdosLIuRgrWo7SyeqSUb')
    }
}