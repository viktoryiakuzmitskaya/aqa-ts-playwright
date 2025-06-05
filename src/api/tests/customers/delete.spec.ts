import { test, expect } from "fixtures/controllers.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { STATUS_CODES } from "data/statusCodes";

test.describe("[API] [Customers] [Delete]", () => {
  test("Should delete customer", async ({ signInController, customersController }) => {
    const loginResponse = await signInController.login({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });

    const token = (loginResponse.headers as Record<string, string>)["authorization"];

    const customerData = generateCustomerData();
    const customerResponse = await customersController.create(customerData, token);
    const id = customerResponse.body.Customer._id;

    const deleteResponse = await customersController.delete(id, token);
    expect.soft(deleteResponse.status).toBe(STATUS_CODES.DELETED);
  });
});