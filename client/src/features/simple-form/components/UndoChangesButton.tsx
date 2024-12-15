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
      <Tooltip title="Undo changes" placement="right" arrow>
        <IconButton
          edge="end"
          size="small"
          onClick={() => resetField(fieldName)}
          aria-label="Undo changes, reverting to what you originally had"
        >
          <UndoIcon />
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
}
