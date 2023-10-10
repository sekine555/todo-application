import { StatusCodes } from "http-status-codes";
import BaseError from "./BaseError";

class RequiredFieldException extends BaseError {
  constructor(fieldName?: string) {
    super(`${fieldName} is required.`);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default RequiredFieldException;
