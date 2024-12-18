import { Button } from "@mui/material";
import { FieldValues, useFormContext } from "react-hook-form";
import { IoIosSave as SaveIcon } from "react-icons/io";
import { RxCross1 as DiscardIcon } from "react-icons/rx";

type GenericFormActionButtonsProps<T extends FieldValues> = {
  classNames?: string;
};

/**
 * Notes:
 *  - MUST be used inside <FormProvider>
 * @param {GenericFormActionButtonsProps} props
 * @returns JSX
 */
export default function GenericFormActionButtons<T extends FieldValues>(props: GenericFormActionButtonsProps<T>) {
  const {
    reset,
    formState: { isLoading, isDirty, disabled, isSubmitting, isSubmitted, isSubmitSuccessful, touchedFields },
  } = useFormContext<T>();
  const isTouched = Object.keys(touchedFields).length > 0;
  const isBothDisabled = isLoading || !isDirty || disabled || isSubmitting || (isSubmitted && isSubmitSuccessful);
  const isDiscardDisabled = !isTouched && isBothDisabled;
  const isSaveDisabled = isBothDisabled;

  return (
    <div className="mt-5 flex gap-1 self-end">
      <Button
        type="reset"
        variant="outlined"
        disableElevation
        color="primary"
        style={{ paddingTop: 0, paddingBottom: 0 }}
        disabled={isDiscardDisabled}
        startIcon={<DiscardIcon />}
        onClick={() => reset()}
      >
        Discard
      </Button>
      <Button
        type="submit"
        style={{ paddingTop: 0, paddingBottom: 0 }}
        variant="contained"
        disableElevation
        color="primary"
        size="small"
        disabled={isSaveDisabled}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </div>
  );
}
