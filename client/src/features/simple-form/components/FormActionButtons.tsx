import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { IoIosSave as SaveIcon } from "react-icons/io";
import { RxCross1 as DiscardIcon } from "react-icons/rx";
import { NewUserDto } from "~/features/simple-form/models/NewUserDto";

export default function FormActionButtons() {
  const {
    reset,
    formState: { isLoading, isDirty, disabled, isSubmitting, isSubmitted, isSubmitSuccessful, touchedFields },
  } = useFormContext<NewUserDto>();
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
