import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
class IsNumericStringConstraint implements ValidatorConstraintInterface {
  validate = (value: any): boolean =>
    typeof value === "string" && !isNaN(Number(value));
}

export const IsNumericString =
  (validationOptions?: ValidationOptions) =>
  (object: Object, propertyName: string): void => {
    registerDecorator({
      name: "isNumericString",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsNumericStringConstraint,
    });
  };
