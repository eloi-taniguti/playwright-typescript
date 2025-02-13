import { type Locator, type Page } from '@playwright/test';

export class InvoicePage {
    readonly page: Page
    readonly title: Locator
    readonly selectAll: Locator
    readonly selectInvoice: Locator
    readonly payButton: Locator
    readonly allInvoiceNumbers: Locator

    constructor(page: Page) {
        this.page = page
        this.title = page.getByRole('heading', { name: 'Invoices' })
        this.selectAll = page.getByTestId('select-all-invoices')
        this.selectInvoice = page.getByTestId('select-invoice')
        this.payButton = page.getByTestId('pay-now')
        this.allInvoiceNumbers = page.getByTestId('invoice-number')
    }

    async login(username: string, password: string) {     
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.getByTestId('username').fill(username)
        await this.page.getByTestId('password').fill(password)
        await this.page.getByTestId('user-login').click()
    }

    async getNumberofRows() {   
        return this.page.getByRole('row').count()
    }

    async getInvoiceNumber(row: number) {
        return this.page.getByTestId('invoice-number').nth(row).innerText()
    }

    async getInvoiceAmount(row: number) {
        return this.page.getByRole('row').nth(row).getByRole('cell').nth(4).innerText()
    }
}