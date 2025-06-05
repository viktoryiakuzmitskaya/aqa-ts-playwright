import { test, expect } from "fixtures/controllers.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validations/responseValidation";

test.describe("[API] [Customers] [Get By Id]", () => {
  let id = "";
  let token = "";

  test("Should get created customer by id", async ({ signInController, customersController }) => {
    const loginResponse = await signInController.login({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    token = (loginResponse.headers as Record<string, string>)["authorization"];
    const customerData = generateCustomerData();
    const customerResponse = await customersController.create(customerData, token);
    id = customerResponse.body.Customer._id;
    const getResponse = await customersController.getById(id, token);
    validateResponse(getResponse, STATUS_CODES.OK, true, null);
    expect.soft(getResponse.body.Customer).toMatchObject({ ...customerData });
  });

  test.afterEach(async ({ customersController }) => {
    if (!id) return;
    const response = await customersController.delete(id, token);
    expect.soft(response.status).toBe(STATUS_CODES.DELETED);
  });
});