import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { CiUndo as UndoIcon } from "react-icons/ci";

type GenericUndoChangesButtonProps<T extends FieldValues> = {
  fieldName: Path<T>;
};

/**
 * Notes:
 *  - MUST be used inside <FormProvider>
 *  - For UX, the tooltip is delayed to prevent constant flashing all over the screen (as many fields = many undo buttons)
 *  - For UX, use this button alone inside the <TextField> (there should be other UI feedback for pending changes, errors, etc)
 *  - What about a button to clear the field? Don't be lazy: Ctrl+A & DELETE
 * @param {GenericUndoChangesButtonProps} props
 * @returns JSX
 */
export default function GenericUndoChangesButton<T extends FieldValues>(props: GenericUndoChangesButtonProps<T>) {
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
