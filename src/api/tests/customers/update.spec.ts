import { test, expect } from "fixtures/controllers.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validations/responseValidation";

test.describe("[API] [Customers] [Update]", () => {
  let id = "";
  let token = "";

  test("Should update customer", async ({ signInController, customersController }) => {
    const loginResponse = await signInController.login({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    token = (loginResponse.headers as Record<string, string>)["authorization"];
    const customerData = generateCustomerData();
    const customerResponse = await customersController.create(customerData, token);
    id = customerResponse.body.Customer._id;
    const updateCustomerData = generateCustomerData();
    const updateCustomerResponse = await customersController.update(id, updateCustomerData, token);
    validateResponse(updateCustomerResponse, STATUS_CODES.OK, true, null);
    expect.soft(updateCustomerResponse.body.Customer).toMatchObject({ ...updateCustomerData });
  });

  test.afterEach(async ({ customersController }) => {
    if (!id) return;
    const response = await customersController.delete(id, token);
    expect.soft(response.status).toBe(STATUS_CODES.DELETED);
  });
});