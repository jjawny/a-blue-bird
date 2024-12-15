import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { IoIosSave as SaveIcon } from "react-icons/io";
import { RxCross1 as DiscardIcon } from "react-icons/rx";
import { NewUserDto } from "~/features/simple-form/models/NewUserDto";

export default function FormButtons() {
  const {
    reset,
    formState: { isLoading, isDirty, disabled, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useFormContext<NewUserDto>();
  const isDisabled = isLoading || !isDirty || disabled || isSubmitting || (isSubmitted && isSubmitSuccessful);

  return (
    <div className="mb-5 flex gap-1">
      <Button
        type="submit"
        style={{ paddingTop: 0, paddingBottom: 0 }}
        variant="contained"
        disableElevation
        color="primary"
        size="small"
        disabled={isDisabled}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      <Button
        type="reset"
        variant="outlined"
        disableElevation
        color="primary"
        style={{ paddingTop: 0, paddingBottom: 0 }}
        disabled={isDisabled}
        startIcon={<DiscardIcon />}
        onClick={() => reset()}
      >
        Discard
      </Button>
    </div>
  );
}
