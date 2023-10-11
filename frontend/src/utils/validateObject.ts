import { validate } from "class-validator";

export const validateObject = async <T extends object>(
  object: T,
): Promise<T> => {
  const errors = await validate(object);
  if (errors.length > 0) {
    errors.forEach((err) => {
      const errorMessage = `- name of the object's class being validated: ${JSON.stringify(
        err.target,
      )}
- the value that is being validated: ${JSON.stringify(err.value)}
- name of the object's property being validated: ${JSON.stringify(err.property)}
        `;
      console.error(errorMessage);
    });
    throw new Error("Validation failed");
  } else {
    return object;
  }
};
