import { LinearProgress, Skeleton, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { GoCheckCircleFill as SuccessIcon } from "react-icons/go";
import { HiInformationCircle as InfoIcon } from "react-icons/hi2";
import { MdOutlineError as ErrorIcon } from "react-icons/md";
import { getA11yAttributes } from "~/features/simple-form/helpers/a11y-helpers";
import { debounce } from "~/shared/helpers/no-lodash-helpers";
import HelperText from "./HelperText";
import UndoChangesButton from "./UndoChangesButton";

type GenericFormTextFieldProps<T extends FieldValues> = {
  label: string;
  fieldName: Path<T>;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  successMessage?: string; // only shown when there are no errors messages & onAsyncValidate has returned true
  initialUntouchedMessage?: string; // only shown when the field has not been touched yet
  isForcedDisabled?: boolean;
  isRequired?: boolean;
  onAsyncValidate?: (value: string) => Promise<boolean>; // triggered after synchronously validation was successful, please set errors within so they can appear
};

export default function GenericFormTextField<T extends FieldValues>(props: GenericFormTextFieldProps<T>) {
  const {
    label,
    fieldName,
    type,
    placeholder,
    successMessage,
    initialUntouchedMessage,
    isRequired = false,
    isForcedDisabled = false,
    onAsyncValidate,
  } = props;
  const [isAsyncValidating, setIsAsyncValidating] = useState<boolean>(false);
  const [isAsyncValidationSuccess, setIsAsyncValidationSuccess] = useState<boolean>(false);
  const {
    control,
    trigger,
    formState: { isLoading, dirtyFields, touchedFields, errors, disabled, isSubmitSuccessful, isSubmitting, isSubmitted },
  } = useFormContext<T>();

  const isDisabled = disabled || isForcedDisabled || isSubmitting || (isSubmitted && isSubmitSuccessful);
  const isDirty = !!dirtyFields[fieldName as keyof typeof dirtyFields];
  const isTouched = !!touchedFields[fieldName as keyof typeof touchedFields];
  const errorMessage = isTouched
    ? errors && (errors as Record<string, { message?: string }>)[fieldName as string]?.message // Must cast like this to access bc of 'T extends FieldValues' changes the type to be complex beyond my comprehension
    : undefined;

  // GOTCHA:
  //  - When using Yup x ReactHookForm, trigger(<field>) validates the entire schema instead of that individual field.
  //  - This is GOOD bc some fields should re-validate when others change, so just validate the entire form.
  //  - What about performance? Simplicity always wins & consumer devices will only get stronger, fb re-renders a f$*k ton (turn on render highlights...), 1st to market is everything
  //  - Why do we still pass an individual field into trigger? so we can get an isValid bool for that specific field back
  const debouncedValidate = useCallback(
    debounce(async () => await trigger(fieldName), 500),
    [trigger, fieldName],
  );

  const HelperTextFragment = useCallback((): JSX.Element => {
    if (!isTouched) return <HelperText icon={initialUntouchedMessage ? <InfoIcon /> : null} text={initialUntouchedMessage} />;
    if (isAsyncValidating) return <LinearProgress className="mb-4 rounded-sm" />;
    if (errorMessage) return <HelperText icon={<ErrorIcon />} text={errorMessage} />;
    if (isAsyncValidationSuccess && successMessage)
      return <HelperText icon={<SuccessIcon color="green" />} text={successMessage} />;
    return <HelperText />;
  }, [isTouched, errorMessage, successMessage, isAsyncValidating]);

  if (isLoading) return <Skeleton variant="text" sx={{ fontSize: "1.625rem", padding: "14px", marginTop: "4px" }} />;

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...getA11yAttributes(label, placeholder, !!errorMessage)}
          {...(placeholder && { placeholder: placeholder })}
          type={type}
          label={label}
          size="small"
          margin="dense"
          variant="outlined"
          required={isRequired}
          disabled={isDisabled}
          error={!!errorMessage}
          helperText={<HelperTextFragment />}
          onChange={(e) => {
            field.onChange(e);
            debouncedValidate().then(async (isValid) => {
              if (!!isValid && onAsyncValidate) {
                setIsAsyncValidating(true);
                setIsAsyncValidationSuccess(false);
                setIsAsyncValidationSuccess(await onAsyncValidate(e.target.value));
                setIsAsyncValidating(false);
              }
            });
          }}
          slotProps={{
            input: {
              style: {
                borderBottomStyle: "inset",
                borderBottomWidth: "2px",
                borderBottomColor: isDirty ? "#ffe2ae" : "lightgray", // TODO
                borderRadius: "5px",
              },
              endAdornment: !isDisabled && isDirty ? <UndoChangesButton<T> fieldName={fieldName} /> : null,
            },
            formHelperText: {
              style: { margin: 0 },
            },
          }}
        />
      )}
    />
  );
}
