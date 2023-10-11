import { ErrorResponse } from "@/types/domain/errors/ErrorResponse";
import FailedToCallApiError, {
  FailedToCallApiErrorParams,
} from "@/types/domain/errors/FailedToCallApiError";
import { Failure, Result, Success } from "@/types/domain/errors/Result";
import { injectable } from "inversify";
import "reflect-metadata";
import IHttpClientHelper from "./IHttpClientHelper";

@injectable()
class HttpClientHelper implements IHttpClientHelper {
  private isErrorResponse(res: any): res is ErrorResponse {
    return res.errorReason !== "undefined";
  }

  private convertApiErrorParams(
    res: ErrorResponse,
  ): FailedToCallApiErrorParams {
    return [
      "api error",
      res.statusCode,
      (res.errorReason === "CUSTOM_ERROR" && res.statusCode === 400) ||
        res.statusCode === 401,
      res.errorReason,
      res.path,
    ];
  }

  public async handleExceptNormal(
    res: Response,
  ): Promise<Result<string, FailedToCallApiError>> {
    if (!res.ok) {
      const errorResponse = await res.json();
      if (this.isErrorResponse(res)) {
        const newError = new FailedToCallApiError(
          ...this.convertApiErrorParams(errorResponse),
        );
        return new Failure(newError);
      }
      return new Failure(Error("Unexpected error"));
    }
    return new Success("Status code is 2xx");
  }

  public async handleError(
    error: unknown,
  ): Promise<Failure<string, FailedToCallApiError>> {
    if (error instanceof FailedToCallApiError) {
      return new Failure(error);
    }
    if (this.isErrorResponse(error)) {
      const newError = new FailedToCallApiError(
        ...this.convertApiErrorParams(error),
      );
      return new Failure(newError);
    }
    return new Failure(new Error("Unexpected error"));
  }
}

export default HttpClientHelper;
