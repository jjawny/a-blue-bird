import { LinearProgress } from "@mui/material";
import { memo, ReactNode } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { GoCheckCircleFill as SuccessIcon } from "react-icons/go";
import { HiInformationCircle as InfoIcon } from "react-icons/hi2";
import { MdOutlineError as ErrorIcon } from "react-icons/md";

type PrioritisedHelperTextProps<T extends FieldValues> = {
  fieldName: Path<T>;
  successMessage?: string;
  defaultMessage?: string;
  isAsyncValidating?: boolean;
  isAsyncValidationSuccessful?: boolean;
};

/**
 * Priority order (opinionated):
 *  1. Don't show when the form is saving/saved as user can't interact, the helper text is useless
 *  2. If currently performing async validated, show loading bar
 *  3. If there are errors, show
 *  4. If there are no errors and async validation was successful, show success message
 *  5. If there is a default message, show
 *  6. Show nothing
 * @param {PrioritisedHelperTextProps} props
 * @returns JSX
 */
const PrioritisedHelperText = <T extends FieldValues>(props: PrioritisedHelperTextProps<T>) => {
  const { fieldName, successMessage, defaultMessage, isAsyncValidating = false, isAsyncValidationSuccessful = false } = props;
  const {
    formState: { touchedFields, errors, isSubmitSuccessful, isSubmitting, isSubmitted },
  } = useFormContext<T>();

  const isTouched = !!touchedFields[fieldName as keyof typeof touchedFields];
  const isHideHelperText = isSubmitting || (isSubmitted && isSubmitSuccessful);
  const errorMessage = isTouched
    ? errors && (errors as Record<string, { message?: string }>)[fieldName as string]?.message // Must cast like this to access bc of 'T extends FieldValues' changes the type to be complex beyond my comprehension
    : undefined;

  if (isHideHelperText) return <HelperText />;
  if (isAsyncValidating) return <LinearProgress className="mb-4 rounded-sm" />;
  if (errorMessage) return <HelperText icon={<ErrorIcon />} text={errorMessage} />;
  if (isAsyncValidationSuccessful && successMessage)
    return <HelperText icon={<SuccessIcon color="green" />} text={successMessage} />;
  if (defaultMessage) return <HelperText icon={<InfoIcon />} text={defaultMessage} />;
  return <HelperText />;
};

type HelperTextProps = {
  icon?: ReactNode;
  text?: string;
};

const HelperText = (props: HelperTextProps) => {
  const { icon, text } = props;
  return (
    <span className="flex h-5 items-center gap-1">
      {icon && <span className="mb-[2px]">{icon}</span>}
      {text && text.trim() !== "" && <span className="truncate">{text}</span>}
    </span>
  );
};

export const MemoizedPrioritisedHelperText = memo(PrioritisedHelperText);
export default MemoizedPrioritisedHelperText;
