import { Skeleton, TextField } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { getA11yAttributes } from "~/shared/helpers/a11y-helpers";
import { debounce } from "~/shared/helpers/no-lodash-helpers";
// OWN COMPONENTS
import MemoizedGenericFormTextFieldHelperText from "~/shared/components/GenericFormTextFieldHelperText";
import GenericUndoChangesButton from "~/shared/components/GenericUndoChangesButton";

type GenericFormTextFieldProps<T extends FieldValues> = {
  label: string;
  fieldName: Path<T>;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  successMessage?: string;
  defaultMessage?: string;
  isForcedDisabled?: boolean;
  isRequired?: boolean;
  onAsyncValidate?: (value: string) => Promise<boolean>;
};

/**
 * Notes:
 *  - MUST be used inside <FormProvider>
 *  - onAsyncValidate() should set errors for the same field within <FormProvider> so they appear as helper text
 *
 * Benefts:
 *  - Undo changes for field-only (revert back to initial value)
 *  - Handles all useful states, when form is [dirty, saving, ...]
 *  - Debounced validation (for Yup schema and optional async fn)
 *  - Dynamic helper text based on state
 * @param {GenericFormTextFieldProps} props
 * @returns JSX
 */
export default function GenericFormTextField<T extends FieldValues>(props: GenericFormTextFieldProps<T>) {
  const {
    label,
    fieldName,
    type,
    placeholder,
    successMessage,
    defaultMessage,
    isRequired = false,
    isForcedDisabled = false,
    onAsyncValidate,
  } = props;
  const [isAsyncValidating, setIsAsyncValidating] = useState<boolean>(false);
  const [isAsyncValidationSuccessful, setIsAsyncValidationSuccessful] = useState<boolean>(false);
  const {
    control,
    trigger,
    watch,
    formState: { isLoading, dirtyFields, touchedFields, errors, disabled, isSubmitSuccessful, isSubmitting, isSubmitted },
  } = useFormContext<T>();

  // GOTCHA:
  //  - When using Yup x ReactHookForm, trigger(<field>) validates the entire schema instead of that individual field.
  //  - This is GOOD bc some fields should re-validate when others change, so just validate the entire form.
  //  - What about performance? Simplicity always wins & consumer devices will only get stronger, fb re-renders a f$*k ton (turn on render highlights...), 1st to market is everything
  //  - Why do we still pass an individual field into trigger? so we can get an isValid bool for that specific field back
  const debouncedValidate = useCallback(
    debounce(async () => await trigger(fieldName), 500),
    [trigger, fieldName],
  );

  const watchedField = watch(fieldName);
  const watchedFieldRef = useRef(watchedField);
  const isDisabled = disabled || isForcedDisabled || isSubmitting || (isSubmitted && isSubmitSuccessful);
  const isDirty = !!dirtyFields[fieldName as keyof typeof dirtyFields];
  const isTouched = !!touchedFields[fieldName as keyof typeof touchedFields];
  const hasErrors = isTouched && !!errors[fieldName];

  useEffect(
    function captureLatestWatchFieldValue() {
      // GOTCHA:
      //  - Issue: Bc useEffect runs AFTER the render, useEffect will capture and use the previous (stale) watchedField value...
      //    causing validation to be 1-step behind, i.e., a valid email is not checked until 2 keypresses
      //  - Solution: Store and use the latest watchField value in a REF to persist between renders
      watchedFieldRef.current = watchedField;
    },
    [watchedField],
  );

  useEffect(
    function startAsyncValidator() {
      const begin = debounce(async (value: string) => {
        if (!onAsyncValidate) return;
        setIsAsyncValidating(true);
        // TODO: see if we can pass an optional cancellation token and cancel when we cancel the debounce as well
        setIsAsyncValidationSuccessful(await onAsyncValidate(value));
        setIsAsyncValidating(false);
      }, 2000);

      setIsAsyncValidationSuccessful(false);
      if (isTouched && !hasErrors) {
        begin(watchedFieldRef.current);
      }

      return () => {
        begin.cancel();
      };
    },
    [watchedField, fieldName, isTouched, hasErrors, onAsyncValidate, setIsAsyncValidating, setIsAsyncValidationSuccessful],
  );

  if (isLoading) return <Skeleton variant="text" sx={{ fontSize: "1.625rem", padding: "14px", marginTop: "4px" }} />;

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...getA11yAttributes(label, placeholder, hasErrors)}
          {...(placeholder && { placeholder: placeholder })}
          {...(!isDisabled && { required: isRequired })}
          type={type}
          label={label}
          disabled={isDisabled}
          error={hasErrors}
          onChange={(e) => {
            field.onChange(e);
            debouncedValidate();
          }}
          helperText={
            <MemoizedGenericFormTextFieldHelperText
              fieldName={fieldName}
              successMessage={successMessage}
              defaultMessage={defaultMessage}
              isAsyncValidating={isAsyncValidating}
              isAsyncValidationSuccessful={isAsyncValidationSuccessful}
            />
          }
          slotProps={{
            formHelperText: { style: { margin: 0 } },
            input: {
              style: { ...(isDirty && { borderBottomColor: "#ffe3be" }) },
              endAdornment: !isDisabled && isDirty ? <GenericUndoChangesButton<T> fieldName={fieldName} /> : null,
            },
          }}
        />
      )}
    />
  );
}
