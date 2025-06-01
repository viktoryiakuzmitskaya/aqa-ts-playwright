import { Locator } from "@playwright/test";
import { SalesPortalPage } from "../salesPortal.page";

export class CustomersPage extends SalesPortalPage {
  addNewCustomerButton = this.page.getByRole("button", { name: "Add Customer" });
  private readonly customersTable = this.page.locator("#table-customers");
  tableRow = this.customersTable.locator('tr');

  uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async getNewestCustomerRow() {
    return this.tableRow.nth(1);
  }

  async getCustomerEmailFromRow(rowLocator: Locator) {
    return await rowLocator.locator('td').nth(0).textContent();
  }

  async getCustomerNameFromRow(rowLocator: Locator) {
    return await rowLocator.locator('td').nth(1).textContent();
  }

  async getCustomerCountryFromRow(rowLocator: Locator) {
    return await rowLocator.locator('td').nth(2).textContent();
  }
}