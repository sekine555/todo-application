import { validateOrReject, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import express from "express";
import ValidationException from "@/domain/Error/exception/ValidationException";

export const validate = <T extends object>(
  type: new (...args: any[]) => T
): express.RequestHandler => {
  return async (req, _, next) => {
    try {
      const input = plainToClass(type, req.body);
      await validateOrReject(input);
      req.body = input;
      next();
    } catch (errors) {
      if (errors instanceof Array && errors[0] instanceof ValidationError) {
        next(new ValidationException(errors));
      } else {
        next(errors);
      }
    }
  };
};
