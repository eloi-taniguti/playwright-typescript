import { type Locator, type Page, expect } from '@playwright/test';

export class InvoicePage {
    readonly page: Page
    readonly title: Locator
    readonly emptyPage: Locator
    readonly selectAll: Locator
    readonly selectInvoice: Locator
    readonly allInvoiceNumbers: Locator
    readonly newCardButton: Locator
    readonly createPaymentButton: Locator
    readonly paymentDropdown: Locator
    readonly paymentOptions: Locator
    readonly payButton: Locator
    readonly getPaymentMethod: (cardNumber: string) => Locator

    constructor(page: Page) {
        this.page = page
        this.title = page.getByRole('heading', { name: 'Invoices' })
        this.emptyPage = page.locator('app-empty-page')
        this.selectAll = page.getByTestId('select-all-invoices')
        this.selectInvoice = page.getByTestId('select-invoice')
        this.allInvoiceNumbers = page.getByTestId('invoice-number')
        // payments sidebar
        this.paymentDropdown = page.locator('mat-select-trigger')
        this.paymentOptions = page.locator('mat-option')
        this.newCardButton = page.getByTestId('new-payment-method-type-option-card')
        this.createPaymentButton = page.getByTestId('create-payment-method-button')
        this.payButton = page.getByTestId('pay-now')
        // TODO - move this to the Settings page
        this.getPaymentMethod = (cardNumber: string) => page.locator('app-saved-payment-methods').locator('.grid-row', { hasText: cardNumber })
    }

    async login(username: string, password: string) {
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.getByTestId('username').fill(username)
        await this.page.getByTestId('password').fill(password)
        await this.page.getByTestId('user-login').click()
    }

    async waitForLoading(){
        await expect(this.page.locator('.loading-text')).toBeVisible({timeout: 60000})
        await expect(this.page.locator('.loading-text')).toHaveCount(0, {timeout: 60000})      
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

    async fillNewCard(cardNumber: string, expiry: string, cvc: string) {
        const newCard = this.page.locator('app-stripe-payment-element iframe').first().contentFrame()
        await newCard.locator('#Field-numberInput').fill(cardNumber)
        await newCard.locator('#Field-expiryInput').fill(expiry)
        await newCard.locator('#Field-cvcInput').fill(cvc)      
    }

    async fillAddress(name: string, country: string, address: string, city: string, state: string, postalCode: string) {
        const addressFields = this.page.locator('app-stripe-address-element iframe').first().contentFrame()
        await addressFields.locator('#Field-nameInput').fill(name)
        await addressFields.locator('#Field-countryInput').selectOption(country)
        await addressFields.locator('#Field-addressLine1Input').fill(address)
        await addressFields.locator('#Field-localityInput').fill(city)
        await addressFields.locator('#Field-administrativeAreaInput').selectOption(state)
        await addressFields.locator('#Field-postalCodeInput').fill(postalCode)      
    }

    async selectLabel(label: string) {   
        await this.page.locator('label').filter({ hasText: label }).click()
    }

    // TODO - move this to a Header component
    async goToTab(tab: 'invoices' | 'payments' | 'settings') {
        await this.page.getByTestId(`${tab}-tab`).click()
    }

    // TODO - move this to the Settings page
    async deletePaymentMethod(cardNumber: string) {      
        await this.page.locator('app-saved-payment-methods').locator('.grid-row', { hasText: cardNumber }).first().getByTestId('remove-payment-method').click()
        await expect(this.page.getByText('Please confirm that you want to delete this payment method.')).toBeVisible()
        await this.page.getByRole('button', { name: 'Delete' }).click()
    }
}