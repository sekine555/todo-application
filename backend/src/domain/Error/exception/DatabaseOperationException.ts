import { StatusCodes } from "http-status-codes";
import BaseError from "./BaseError";

class DatabaseOperationException extends BaseError {
  constructor(message?: string) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export default DatabaseOperationException;
