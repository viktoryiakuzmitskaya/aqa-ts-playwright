import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { loginSchema } from "data/schemas/auth/login.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateSchema } from "utils/validations/schemaValidation";


test.describe("[API] [User] [Login]", () => {
  test("Should allow user login with valid credentials", async ({ request }) => {
    const response = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
      data: { username: USER_LOGIN, password: USER_PASSWORD },
      headers: {
        "content-type": "application/json",
      },
    });

    const status = response.status();
    expect.soft(status).toBe(STATUS_CODES.OK);

    const headers = response.headers();
    const token = headers['authorization'];
    expect.soft(token).toBeTruthy();    

    const responseBody = await response.json();    
    validateSchema(loginSchema, responseBody);
  });
});