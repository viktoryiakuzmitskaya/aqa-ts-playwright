import { test, expect } from "fixtures/controllers.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { loginSchema } from "data/schemas/auth/login.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateSchema } from "utils/validations/schemaValidation";
import { validateResponse } from "utils/validations/responseValidation";


test.describe("[API] [User] [Login]", () => {
  test("Should allow user login with valid credentials", async ({ signInController }) => {

    const response = await signInController.login({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });

    validateResponse(response, STATUS_CODES.OK, true, null);   
    validateSchema(loginSchema, response.body);
  });
});