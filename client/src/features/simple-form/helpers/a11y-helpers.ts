import { AriaAttributes } from "react";

export const getA11yAttributes = (label?: string, placeholder?: string, hasErrors?: boolean): Partial<AriaAttributes> => {
  const a11y: Partial<AriaAttributes> = {};

  if (label) a11y["aria-label"] = `A form field called ${label}`;
  if (placeholder) a11y["aria-placeholder"] = placeholder;
  if (hasErrors !== undefined) a11y["aria-invalid"] = hasErrors;

  return a11y;
};
