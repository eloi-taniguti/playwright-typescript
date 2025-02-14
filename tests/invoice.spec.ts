import { test, expect } from '@playwright/test'
import { InvoicePage } from '../pages/InvoicePage'
import { totalAmount } from '../utils/helpers'

const newCard = {
  cardNumber: '5555555555554444',
  expiry: '1225',
  cvc: '123',
}

const address = {
  name: 'QA Interviewer',
  country: 'US',
  street: '123 Test St',
  city: 'Test City',
  state: 'FL',
  postalCode: '12345',
}

test.beforeEach(async ({ page }) => {
  const invoice = new InvoicePage(page)
  await page.goto('https://qaplaywright.aiwyn-dev.app/client-portal/login')

  await expect(page.getByText('Log in to Your Account')).toBeVisible()
  invoice.login('qa+interviewer1@aiwyn.ai', 'Aiwyn123!')
  // wait for loading spinner to show and disappear
  await invoice.waitForLoading()
})

test('should add new credit card', async ({ page }) => { 
  const invoice = new InvoicePage(page)
  // verify number of options in Saved Cards: Select and Visa
  await invoice.paymentDropdown.click()
  expect(await invoice.paymentOptions.count()).toEqual(2)
  await invoice.paymentOptions.getByText('default').click()

  // Add new card
  await invoice.newCardButton.click()
  await invoice.fillNewCard(newCard.cardNumber, newCard.expiry, newCard.cvc)
  await invoice.fillAddress(address.name, address.country, address.street, address.city, address.state, address.postalCode)
  await invoice.selectLabel('Save payment method')
  await invoice.createPaymentButton.click()

  // verify number of options in Saved Cards: Select, Mastercard, and Visa
  await invoice.paymentDropdown.click()
  expect(await invoice.paymentOptions.count()).toEqual(3)
  await invoice.paymentOptions.getByText(newCard.cardNumber.slice(-4)).click()

  // go to Settings page to delete the new card
  await invoice.goToTab('settings')
  await invoice.deletePaymentMethod(newCard.cardNumber.slice(-4))
  await expect (invoice.getPaymentMethod(newCard.cardNumber.slice(-4))).toHaveCount(0)
})

test('should pay for an invoice', async ({ page }) => {
  const invoice = new InvoicePage(page)

  if (!await invoice.emptyPage.isVisible()) {
    // only run the test if there are invoices
    await expect(invoice.title).toBeVisible({ timeout: 60000 })
    // save number of invoices (including header)
    const numberOfRows = await invoice.getNumberofRows()
    // Deselect all and select only the first invoice
    await invoice.selectAll.uncheck()
    await invoice.selectInvoice.first().check()
    await expect(page.getByText(' 1 invoice selected ')).toBeVisible()

    const selectedInvoiceNumber =  await invoice.getInvoiceNumber(0)
    // get the invoice amount from table
    const amount =  await invoice.getInvoiceAmount(1)
    // Verify the Pay button have the total amount "invoice value + processing fee of 3.25%"
    await expect(invoice.payButton).toContainText(totalAmount(amount))
    // Pay the invoice
    await invoice.payButton.click()

    // Verify the payment modal is visible
    await expect(page.getByText('Thanks for paying!')).toBeVisible()
    await page.getByRole('button', { name: 'Close' }).click()

    // Verify table has one less row
    expect(await invoice.getNumberofRows()).toEqual(numberOfRows -1)
    // Verify invoice number does not exist anymore
    await invoice.allInvoiceNumbers.allInnerTexts().then((invoiceNumbers) => {
      expect(invoiceNumbers).not.toContain(selectedInvoiceNumber)
    })
  }
})
