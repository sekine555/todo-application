import { ChangePasswordRequest } from "@/types/API/user/ChangePasswordRequest";
import { ChangePasswordResponseSuccessResponse } from "@/types/API/user/ChangePasswordResponse";

interface IUserClient {
  changePassword(
    request: ChangePasswordRequest,
  ): Promise<ChangePasswordResponseSuccessResponse>;
}

export default IUserClient;
