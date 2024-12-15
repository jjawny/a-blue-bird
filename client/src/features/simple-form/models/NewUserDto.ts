import * as Yup from "yup";
import { isValidEmailFormat } from "../helpers/email-helpers";

export type NewUserDto = Yup.InferType<typeof NewUserDtoSchema>;
export const getDefaultNewUserDto = (): NewUserDto => NewUserDtoSchema.cast({});
export const NewUserDtoSchema = Yup.object().shape({
  isHideMyEmail: Yup.bool().default(false), // rename to sign up w/o email or something
  username: Yup.string().required("Required").min(3, "Must be 3+ characters").default("hey"),
  email: Yup.string()
    .when("isHideMyEmail", {
      is: false,
      then: (schema) =>
        schema.required("Required").test("isValidEmailFormat", "Not an email", (email) => isValidEmailFormat(email)),
    })
    .default(""),
});

/**
 * FOOT NOTES:
 *  - Prefer separating async validations (like API calls) to prevent DDoSing/users hitting rate limit too quickly
 *  - Prefer API layer & DTO schemas evolve independently (don't tightly coupling)
 *  - Do async validations in JSX-land to easily show UI for time-outs, bad requests, etc...
 */

export const mockIsEmailTakenApiCall = async (email: string): Promise<boolean> => {
  console.debug("'mockIsEmailTakenApiCall' called");
  await new Promise((resolve) => setTimeout(resolve, 500)); // mock latency
  const takenEmail = "bro@bro.com";
  const isTaken = isValidEmailFormat(email) && email.toLocaleLowerCase() === takenEmail;
  return isTaken;
};

// Yup utils?
export const validateYupSchema = async <T extends Yup.Maybe<Yup.AnyObject>>(
  schema: Yup.ObjectSchema<T>,
  values: T,
): Promise<Record<string, string>> => {
  try {
    await schema.validate(values, { abortEarly: false });
    return {}; // No validation errors
  } catch (error) {
    const validationErrors: Record<string, string> = {};
    if (error instanceof Yup.ValidationError) {
      error.inner.forEach((err) => {
        if (err.path) {
          validationErrors[err.path] = err.message;
        }
      });
    }
    return validationErrors;
  }
};

// No lodash utils?
export const debounce = <T extends (...args: any[]) => Promise<any>>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    return new Promise((resolve, reject) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args)
          .then(resolve)
          .catch(reject);
      }, wait);
    });
  };
};

const debounceIsEmailTakenApiCall = debounce(mockIsEmailTakenApiCall, 1000);
