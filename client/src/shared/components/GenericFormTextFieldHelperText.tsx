import { LinearProgress } from "@mui/material";
import { memo, ReactNode } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { GoCheckCircleFill as SuccessIcon } from "react-icons/go";
import { HiInformationCircle as InfoIcon } from "react-icons/hi2";
import { MdOutlineError as ErrorIcon } from "react-icons/md";

type GenericGenericFormTextFieldHelperTextProps<T extends FieldValues> = {
  fieldName: Path<T>;
  successMessage?: string;
  defaultMessage?: string;
  isAsyncValidating?: boolean;
  isAsyncValidationSuccessful?: boolean;
};

/**
 * Notes:
 *  - MUST be used inside <FormProvider>
 *
 * Priority (opinionated):
 *  1. Don't show any when the form is saving/saved and the user cannot interact
 *  2. If performing async validation, show loading bar
 *  3. If the field has errors, show error messages
 *  4. If the field has no errors and async validation was successful, show success message
 *  5. If the field hasn't been touched yet, show default message
 *  6. Show nothing
 * @param {GenericGenericFormTextFieldHelperTextProps} props
 * @returns JSX
 */
const GenericFormTextFieldHelperText = <T extends FieldValues>(props: GenericGenericFormTextFieldHelperTextProps<T>) => {
  const { fieldName, successMessage, defaultMessage, isAsyncValidating = false, isAsyncValidationSuccessful = false } = props;
  const {
    formState: { touchedFields, errors, isSubmitSuccessful, isSubmitting, isSubmitted },
  } = useFormContext<T>();

  const isTouched = !!touchedFields[fieldName as keyof typeof touchedFields];
  const isHideHelperText = isSubmitting || (isSubmitted && isSubmitSuccessful);
  const errorMessage = isTouched
    ? errors && (errors as Record<string, { message?: string }>)[fieldName as string]?.message // Must cast like this to access bc of 'T extends FieldValues' changes the type to be complex beyond my comprehension
    : undefined;

  // RENDER
  if (isHideHelperText) return <HelperText />;
  if (isAsyncValidating)
    return (
      <LinearProgress className="mb-4 h-[6px] -translate-y-[4px] rounded-sm rounded-bl-lg rounded-br-lg rounded-tl-none rounded-tr-none" />
    );
  if (errorMessage) return <HelperText icon={<ErrorIcon />} text={errorMessage} />;
  if (isAsyncValidationSuccessful && successMessage)
    return <HelperText icon={<SuccessIcon color="green" />} text={successMessage} />;
  if (!isTouched && defaultMessage) return <HelperText icon={<InfoIcon />} text={defaultMessage} />;
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

export const MemoizedGenericFormTextFieldHelperText = memo(GenericFormTextFieldHelperText);
export default MemoizedGenericFormTextFieldHelperText;
