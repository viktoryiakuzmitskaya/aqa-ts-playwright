import { test, expect } from "fixtures/controllers.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validations/responseValidation";


test.describe("[API] [User] [Login]", () => {
  test("Should allow user login with valid credentials", async ({ signInController }) => {

    const loginResponse = await signInController.login({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });    
    validateResponse(loginResponse, STATUS_CODES.OK, true, null);
    const token = (loginResponse.headers as Record<string, string>)["authorization"];
    expect.soft(token).toBeTruthy();
    const expectedUser = {
      _id: "680756fcd006ba3d475fc5a3",
      username: "kuz",
      firstName: "Viktoryia",
      lastName: "Kuzmitskaya",
      roles: ["USER"],
      createdOn: "2025/04/22 08:44:44",
    };
    expect.soft(loginResponse.body.User).toMatchObject(expectedUser);
  });
});