import { StatusCodes } from "http-status-codes";
import { ValidationError } from "class-validator";
import BaseError from "./BaseError";

class ValidationException extends BaseError {
  private validationErrors: ValidationError[];

  constructor(validationErrors: ValidationError[]) {
    const message = validationErrors
      .map((error) => Object.values(error.constraints))
      .join(", ");

    super(message);

    this.validationErrors = validationErrors;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }

  getValidationErrors() {
    return this.validationErrors;
  }
}

export default ValidationException;
