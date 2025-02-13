import { test, expect } from '@playwright/test'
import { InvoicePage } from '../pages/InvoicePage'
import { totalAmount } from '../utils/helpers'

test.beforeEach(async ({ page }) => {
  const invoice = new InvoicePage(page)
  await page.goto('https://qaplaywright.aiwyn-dev.app/client-portal/login')

  await expect(page.getByText('Log in to Your Account')).toBeVisible()
  invoice.login('qa+interviewer1@aiwyn.ai', 'Aiwyn123!')
})

test('should search for android', { tag: ['@smoke'] }, async ({ page }) => {
  const invoice = new InvoicePage(page)

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
})
