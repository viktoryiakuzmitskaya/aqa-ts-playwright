import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api-config";
import { IRequestOptions } from "types/api.types";
import { IUserCredentials, ILoginResponse } from "types/signIn.types";


export class SignInController {
  constructor(private request = new RequestApi()) { }

  async login(body: IUserCredentials) {
    const options: IRequestOptions = {
      url: apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN,
      method: "post",
      data: body,
      headers: {
        "content-type": "application/json",
      },
    };
    return await this.request.send<ILoginResponse>(options);
  }
}