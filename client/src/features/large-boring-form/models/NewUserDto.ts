import * as Yup from "yup";
import { isValidEmailFormat } from "../../../shared/helpers/email-helpers";

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
