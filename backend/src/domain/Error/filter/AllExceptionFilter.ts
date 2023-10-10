import { Request, Response, NextFunction } from "express";
import { ErrorResponse, ErrorDetail } from "../ErrorResponse";
import DatabaseOperationException from "../exception/DatabaseOperationException";
import { StatusCodes } from "http-status-codes";
import RequiredFieldException from "../exception/RequiredFieldException";
import ValidationException from "../exception/ValidationException";

export const AllExceptionFilter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequiredFieldException) {
    const errorResponse = new ErrorResponse(
      StatusCodes.BAD_REQUEST,
      "RequiredFieldException",
      [new ErrorDetail(null, err.message)],
      req.path
    );
    res.status(errorResponse.getStatusCode).json(errorResponse);
    return;
  } else if (err instanceof ValidationException) {
    const errorDetails = err
      .getValidationErrors()
      .flatMap((error) =>
        Object.entries(error.constraints).map(
          ([type, message]) =>
            new ErrorDetail(
              `Validation failed on field ${error.property}: ${type}`,
              message
            )
        )
      );
    const errorResponse = new ErrorResponse(
      StatusCodes.BAD_REQUEST,
      "ValidationException",
      errorDetails,
      req.path
    );
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    return;
  } else if (err instanceof DatabaseOperationException) {
    const errorResponse = new ErrorResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "DatabaseOperationException",
      [new ErrorDetail(null, err.message)],
      req.path
    );
    res.status(errorResponse.getStatusCode).json(errorResponse);
    return;
  } else {
    const errorResponse = new ErrorResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      [new ErrorDetail(null, "Unexpected error occurred.")],
      req.path
    );
    res.status(500).send(errorResponse);
  }
};
