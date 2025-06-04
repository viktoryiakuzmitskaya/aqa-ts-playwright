import { SALES_PORTAL_URL, USER_LOGIN, USER_PASSWORD } from "config/environment";
import { test as base, expect } from "./pages.fixture";
import { ICustomer } from "types/customer.types";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import _ from "lodash";
import { NOTIFICATIONS } from "data/notifications.data";

interface IBusinessSteps {
    loginAsLocalUser(): Promise<void>;
    createCustomer(params?: Partial<ICustomer>): Promise<ICustomer>;
}

export const test = base.extend<IBusinessSteps>({
    loginAsLocalUser: async ({ page, homePage }, use) => {
        await use(async () => {
            await page.goto(SALES_PORTAL_URL);
            await page.locator("#emailinput").fill(USER_LOGIN);
            await page.locator("#passwordinput").fill(USER_PASSWORD);
            await page.getByRole("button", { name: "Login" }).click();
            await homePage.waitForOpened();
        });
    },

    createCustomer: async ({ homePage, addNewCustomerPage, customersPage }, use) => {
        await use(async (params?: Partial<ICustomer>) => {
            await homePage.clickModuleButton('Customers');
            await customersPage.waitForOpened();
            await customersPage.clickAddNewCustomer();
            await addNewCustomerPage.waitForOpened();
            const customerData = generateCustomerData(params);
            await addNewCustomerPage.fillInputs(customerData);
            await addNewCustomerPage.clickSaveNewCustomer();
            await customersPage.waitForOpened();
            await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
            await expect(customersPage.tableRowByEmail(customerData.email)).toBeVisible();
            const actualCustomerData = await customersPage.getCustomerData(customerData.email);
            expect(actualCustomerData).toEqual(_.pick(customerData, ["email", "name", "country"]));
            return customerData;
        });
    }
});

export { expect } from "@playwright/test";