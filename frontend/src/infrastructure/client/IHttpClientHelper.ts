import FailedToCallApiError from "@/types/domain/errors/FailedToCallApiError";
import { Failure, Result } from "@/types/domain/errors/Result";

export default interface IHttpClientHelper {
  handleExceptNormal(
    res: Response,
  ): Promise<Result<string, FailedToCallApiError | Error>>;
  handleError(
    error: unknown,
  ): Promise<Failure<string, FailedToCallApiError | Error>>;
}
