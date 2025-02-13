import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly inputField: Locator
    readonly searchButton: Locator

    constructor(page: Page) {
        super(page)
        this.inputField = page.locator('#searchbox_input')
        this.searchButton = page.locator('button[aria-label="Search"]')
    }

    async searchBy(value: string) {
        await this.inputField.fill(value)
        await this.searchButton.click()
        await this.page.waitForLoadState('networkidle')
    }
}