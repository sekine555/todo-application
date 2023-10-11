import { validateOrReject, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import express from "express";
import ValidationException from "@/domain/Error/exception/ValidationException";

export const validate = <T extends object>(
  type: new (...args: any[]) => T,
  source: "body" | "params" = "body"
): express.RequestHandler => {
  return async (req, _, next) => {
    try {
      const inputSource = source === "body" ? req.body : req.params;
      const validatedInput = plainToClass(type, inputSource);
      await validateOrReject(validatedInput);

      if (source === "body") {
        req.body = validatedInput;
      } else if (source === "params") {
        req.params = validatedInput as any;
      }

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
