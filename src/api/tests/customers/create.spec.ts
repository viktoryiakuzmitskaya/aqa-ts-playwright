import { test, expect } from "fixtures/controllers.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { customerSchema } from "data/schemas/customers/customer.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateSchema } from "utils/validations/schemaValidation";
import { validateResponse } from "utils/validations/responseValidation";

test.describe("[API] [Customers] [Create]", () => {
  let id = "";
  let token = "";

  test("Should create customer", async ({ signInController, customersController }) => {
     const loginResponse = await signInController.login({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    token = (loginResponse.headers as Record<string, string>)["authorization"];
    const customerData = generateCustomerData();
    const customerResponse = await customersController.create(customerData, token);
    id = customerResponse.body.Customer._id;
    validateSchema(customerSchema, customerResponse.body);
    validateResponse(customerResponse, STATUS_CODES.CREATED, true, null);
    expect.soft(customerResponse.body.Customer).toMatchObject({ ...customerData });
  });

  test.afterEach(async ({ customersController }) => {
    if (!id) return;
    const response = await customersController.delete(id, token);
    expect.soft(response.status).toBe(STATUS_CODES.DELETED);
  });
});