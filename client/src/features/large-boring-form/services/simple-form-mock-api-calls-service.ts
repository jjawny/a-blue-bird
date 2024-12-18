import { isValidEmailFormat } from "~/shared/helpers/email-helpers";

// TODO: turn into non-mock address fetcher?
export const mockIsEmailTakenApiCall = async (email: string): Promise<boolean> => {
  console.debug("'mockIsEmailTakenApiCall' called, checking:", email);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // mock latency
  const takenEmail = "bro@bro.com";
  const isTaken = isValidEmailFormat(email) && email.toLocaleLowerCase() === takenEmail;
  return isTaken;
};
