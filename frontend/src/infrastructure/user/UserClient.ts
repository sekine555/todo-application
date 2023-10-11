import { TYPES } from "@/config/types";
import IUserClient from "./IUserClient";
import type IHttpClient from "@/infrastructure/client/IHttpClient";
import { validateObject } from "@/utils/validateObject";
import { ChangePasswordRequest } from "@/types/API/user/ChangePasswordRequest";
import {
  ChangePasswordResponseSuccessResponse,
  GetChangePasswordSuccessResponse,
} from "@/types/API/user/ChangePasswordResponse";
import { getDefaultRequestInit } from "../helpers/requestInit";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
class UserClient implements IUserClient {
  private client: IHttpClient;

  constructor(
    @inject(TYPES.IHttpClient)
    client: IHttpClient,
  ) {
    this.client = client;
  }

  public async changePassword(
    request: ChangePasswordRequest,
  ): Promise<ChangePasswordResponseSuccessResponse> {
    return await this.client
      .put<GetChangePasswordSuccessResponse>(
        "/api/v1/user/me/password",
        request,
        getDefaultRequestInit(),
      )
      .then((res) => {
        const getChangePasswordSuccessResponse =
          new GetChangePasswordSuccessResponse(res.data);
        return validateObject(getChangePasswordSuccessResponse);
      });
  }
}

export default UserClient;
