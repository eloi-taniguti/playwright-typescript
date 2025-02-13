import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ResultsPage extends BasePage{
    readonly allTitles: Locator
    readonly allImgTitles: Locator
    readonly allVideoTitles: Locator
    readonly regionFilterButton: Locator
    readonly regionItems: Locator

    constructor(page: Page) {
        super(page)
        this.allTitles = page.getByTestId('result-title-a').locator('span')
        this.allImgTitles = page.locator('.tile--img__title')
        this.allVideoTitles = page.locator('.tile__title')
        this.regionFilterButton = page.getByTestId('region-filter-label')
        this.regionItems = page.locator('.fdosLIuRgrWo7SyeqSUb')
    }

    async selectTab(tabName: number) {
        await this.page.getByTestId('duckbar').locator('a').nth(tabName).click()
    }
}