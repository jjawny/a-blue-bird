import { isValidEmailFormat } from "../helpers/email-helpers";

export const mockIsEmailTakenApiCall = async (email: string): Promise<boolean> => {
  console.debug("'mockIsEmailTakenApiCall' called");
  await new Promise((resolve) => setTimeout(resolve, 500)); // mock latency
  const takenEmail = "bro@bro.com";
  const isTaken = isValidEmailFormat(email) && email.toLocaleLowerCase() === takenEmail;
  return isTaken;
};
