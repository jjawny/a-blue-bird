import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { IoArrowUndo as UndoIcon } from "react-icons/io5";

type UndoChangesButtonProps<T extends FieldValues> = {
  fieldName: Path<T>;
};

export default function UndoChangesButton<T extends FieldValues>(props: UndoChangesButtonProps<T>) {
  const { fieldName } = props;
  const { resetField } = useFormContext<T>();

  return (
    <InputAdornment position="end">
      <Tooltip title="Undo changes" placement="right" enterDelay={700}>
        <IconButton
          edge="end"
          size="small"
          aria-label="Undo changes, reverting to what you originally had"
          onClick={() => resetField(fieldName)}
        >
          <UndoIcon />
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
}

/**
 * 🦶🏻 FOOTNOTES:
 *  - Uses RHF context ∴ must be inside <FormProvider>
 *  - For UX, delay showing the tooltip to prevent constant flashing all over the screen (as many fields = many undo buttons)
 *  - The user will quickly learn what this does as its effect is immediate
 *  - For UX, use this button alone inside the <TextField> (there should be other UI feedback for pending changes, errors, etc)
 *  - What about a button to clear the field? Don't be lazy: Ctrl+A & DELETE
 */
