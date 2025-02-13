import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page
    readonly inputField: Locator
    readonly searchButton: Locator

    constructor(page: Page) {
        this.page = page
        this.inputField = page.locator('#searchbox_input')
        this.searchButton = page.locator('button[aria-label="Search"]')
    }

    async searchBy(value: string) {
        await this.inputField.fill(value)
        await this.searchButton.click()
        await this.page.waitForLoadState('networkidle')
    }
}