import { IconButton, InputAdornment, LinearProgress, Skeleton, TextField } from "@mui/material";
import React, { ReactNode, useCallback, useState } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { GoCheckCircleFill as SuccessIcon } from "react-icons/go";
import { IoArrowUndo as UndoIcon } from "react-icons/io5";
import { MdOutlineError as ErrorIcon } from "react-icons/md";
import { getA11yAttributes } from "~/features/simple-form/helpers/a11y-helpers";
import { debounce } from "~/features/simple-form/models/NewUserDto";

type GenericFormTextFieldProps<T extends FieldValues> = {
  label: string;
  fieldName: Path<T>;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  successMessage?: string; // only shown when there are no errors
  isForcedDisabled?: boolean;
  isRequired?: boolean;
  onAsyncValidate?: (value: string) => Promise<void>; // triggered if synchronously valid, please set errors within
};

export default function GenericFormTextField<T extends FieldValues>(props: GenericFormTextFieldProps<T>) {
  const {
    label,
    fieldName,
    type,
    placeholder,
    successMessage,
    isRequired = false,
    isForcedDisabled = false,
    onAsyncValidate,
  } = props;
  const [isAsyncValidating, setIsAsyncValidating] = useState<boolean>(false);
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
    if (!isTouched) return <HelperText />;
    if (isAsyncValidating) return <LinearProgress className="mb-4 rounded-sm" />;
    if (errorMessage) return <HelperText icon={<ErrorIcon />} text={errorMessage} />;
    if (successMessage) return <HelperText icon={<SuccessIcon color="green" />} text={successMessage} />;
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
                await onAsyncValidate(e.target.value);
                setIsAsyncValidating(false);
              }
            });
          }}
          slotProps={{
            input: {
              style: {
                borderBottomStyle: "inset",
                borderBottomWidth: "2px",
                borderBottomColor: "lightgray",
                borderRadius: "5px",
              },
              endAdornment: isDirty ? <UndoChangesButton<T> fieldName={fieldName} /> : null,
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

type HelperTextProps = {
  icon?: ReactNode;
  text?: string;
};

const HelperText = (props: HelperTextProps) => {
  const { icon, text } = props;
  return (
    <span className="flex h-5 items-center gap-1">
      {icon && <span className="mb-[2px]">{icon}</span>}
      {text && text.trim() !== "" && text}
    </span>
  );
};

type UndoChangesButtonProps<T extends FieldValues> = {
  fieldName: Path<T>;
};

const UndoChangesButton = <T extends FieldValues>(props: UndoChangesButtonProps<T>) => {
  const { fieldName } = props;
  const { resetField } = useFormContext<T>();

  return (
    <InputAdornment position="end">
      <IconButton
        edge="end"
        size="small"
        onClick={() => resetField(fieldName)}
        aria-label="Undo changes, reverting to what you originally had"
      >
        <UndoIcon />
      </IconButton>
    </InputAdornment>
  );
};
