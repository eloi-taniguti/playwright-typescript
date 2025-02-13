import { type Locator, type Page } from '@playwright/test';

export class BasePage {
    readonly page: Page
    readonly inputFormField: Locator
    readonly clearButton: Locator
    readonly headerSearchButton: Locator

    constructor(page: Page) {
        this.page = page
        this.inputFormField = page.locator('#search_form_input')
        this.clearButton = page.locator('#search_form_input_clear')
        this.headerSearchButton = page.locator('#search_button')
    }

    async searchInHeader(value: string) {
        await this.inputFormField.clear()
        await this.inputFormField.fill(value)
        await this.headerSearchButton.click()
        await this.page.waitForLoadState('networkidle')
    }
}