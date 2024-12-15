import { Skeleton, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { getA11yAttributes } from "~/features/simple-form/helpers/a11y-helpers";
import { debounce } from "~/shared/helpers/no-lodash-helpers";
import MemoizedPrioritisedHelperText from "./PrioritisedHelperText";
import UndoChangesButton from "./UndoChangesButton";

type GenericFormTextFieldProps<T extends FieldValues> = {
  label: string;
  fieldName: Path<T>;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  successMessage?: string; // only shown when there are no error messages & onAsyncValidate() has returned true
  defaultMessage?: string; // only shown when not not saving/saved, and no errors/success messages
  isForcedDisabled?: boolean;
  isRequired?: boolean;
  onAsyncValidate?: (value: string) => Promise<boolean>; // triggered after synchronous validation was successful, please set any errors within so they can appear
};

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
  // TODO: when field changes (set by another, or reset) this should set back to false, maybe the debounced validation should run in a useeffect every time it changes instead?
  // we need a use to trigger this back to false anyway
  const [isAsyncValidationSuccessful, setIsAsyncValidationSuccessful] = useState<boolean>(false);
  const {
    control,
    trigger,
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

  // const isHideMyEmail = watch("isHideMyEmail");

  // useEffect(() => {
  // TODO: see todo above
  // }, [])

  const isDisabled = disabled || isForcedDisabled || isSubmitting || (isSubmitted && isSubmitSuccessful);
  const isDirty = !!dirtyFields[fieldName as keyof typeof dirtyFields];
  const isTouched = !!touchedFields[fieldName as keyof typeof touchedFields];
  const hasErrors = isTouched && !!errors[fieldName];

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
          type={type}
          label={label}
          size="small"
          margin="dense"
          variant="outlined"
          required={isRequired}
          disabled={isDisabled}
          error={hasErrors}
          helperText={
            <MemoizedPrioritisedHelperText
              fieldName={fieldName}
              successMessage={successMessage}
              defaultMessage={defaultMessage}
              isAsyncValidating={isAsyncValidating}
              isAsyncValidationSuccessful={isAsyncValidationSuccessful}
            />
          }
          onChange={(e) => {
            field.onChange(e);
            debouncedValidate().then(async (isValid) => {
              if (!!isValid && onAsyncValidate) {
                setIsAsyncValidating(true);
                setIsAsyncValidationSuccessful(false);
                setIsAsyncValidationSuccessful(await onAsyncValidate(e.target.value));
                setIsAsyncValidating(false);
              }
            });
          }}
          slotProps={{
            input: {
              style: {
                borderBottomStyle: "inset",
                borderBottomWidth: "2px",
                borderBottomColor: isDirty ? "#ffe2ae" : "lightgray", // TODO: fix color?
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

/**
 * Benefts:
 * - undo changes for individual field (not clear, just back to default values)
 * - conditional helper text - although 1x in priority order is opinionated, better UX to only have 1, see component footnotes for more
 */
