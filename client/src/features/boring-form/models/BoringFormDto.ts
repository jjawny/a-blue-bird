import * as Yup from "yup";
import { isValidEmailFormat } from "~/shared/helpers/email-helpers";

export type BoringFormDto = Yup.InferType<typeof BoringFormDtoSchema>;
export const getDefaultBoringFormDto = (): BoringFormDto => BoringFormDtoSchema.cast({});
export const BoringFormDtoSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .test("isValidEmailFormat", "Not an email", (email) => isValidEmailFormat(email))
    .default(""),
});

/**
 * FOOT NOTES:
 *  - Prefer separating async validations (like API calls) to prevent accidental DDoSing/users hitting rate limit too quickly
 *  - Prefer API layer & DTO schemas evolve independently (don't tightly coupling)
 *  - Do async validations in JSX-land to easily show UI for time-outs, bad requests, etc...
 */
