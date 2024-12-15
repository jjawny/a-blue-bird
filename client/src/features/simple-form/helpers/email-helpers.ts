export const isValidEmailFormat = (email?: string): boolean => {
  if (!email?.trim()) return false;
  // See https://ui.dev/validate-email-address-javascript
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
