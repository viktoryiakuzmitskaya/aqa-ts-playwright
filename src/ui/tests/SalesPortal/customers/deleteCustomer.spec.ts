import { test, expect } from "fixtures/businessSteps.fixture";
import { NOTIFICATIONS } from "data/notifications.data";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should check customer deletion from the table", async ({ loginAsLocalUser, createCustomer, customersPage }) => {
    await loginAsLocalUser();
    const customerData = await createCustomer();
    await customersPage.clickDeleteCustomer(customerData.email);
    await customersPage.deleteModal.clickDelete();
    await customersPage.deleteModal.waitForClosed();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
    const actualTableData = await customersPage.getTableData();
    expect(
      actualTableData.some((row) => row.email === customerData.email),
      `Expect table to contain customer with email ${customerData.email}`
    ).toBe(false);
  });
});