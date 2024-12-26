import { Autocomplete, TextField } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { ClassValue } from "clsx";
import { memo, useRef, useState } from "react";
import { TbHandClick as ClickIcon } from "react-icons/tb";
import { routes } from "~/shared/constants/routes";
import { cn } from "~/shared/helpers/classname-helpers";
import { useFocusOnKeyPress } from "~/shared/hooks/useFocusOnKeyPress";

const WIDTH_TRANSITION_MS = 100;

export default function TopBarSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useFocusOnKeyPress(inputRef, "/", "Escape");

  // TLDR:
  //  - To render correctly, we must clear the search value AFTER navigation re-render has completed
  //  - By default, setValue goes into the MICROtask queue, use setTimeout to defer to MACROtask queue (queued after navigation re-render)
  const handleSuggestionClick = () => setTimeout(() => setSearchValue(""), 0);
  const handleChange = (_: React.SyntheticEvent<Element, Event>, newValue: string | null) => setSearchValue(newValue ?? "");

  // TLDR:
  //  - Wait for <TextField> width to finish transforming so <Suggestions> popper renders with a matching width
  const handleOpen = () => setTimeout(() => setIsSuggestionsOpen(true), WIDTH_TRANSITION_MS + 10);
  const handleClose = () => setIsSuggestionsOpen(false);

  return (
    <Autocomplete
      size="small"
      disablePortal
      blurOnSelect
      options={routes}
      value={searchValue}
      open={isSuggestionsOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      popupIcon={null}
      clearIcon={null}
      onChange={handleChange}
      renderOption={(props, option) => (
        <Suggestion key={props.key} htmlProps={props} option={option} onClick={handleSuggestionClick} />
      )}
      renderInput={(params) => {
        const isFocused = document.activeElement === inputRef.current;

        return (
          <div className="relative flex items-center">
            {!isFocused && <SearchHint className="absolute left-2" />}
            <TextField
              {...params}
              inputRef={inputRef}
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{
                margin: 0,
                width: isFocused ? 200 : 123,
                transition: `width ${WIDTH_TRANSITION_MS}ms ease-out`,
                "& .MuiInputBase-root": {
                  padding: "0 !important",
                  border: "none",
                },
              }}
            />
          </div>
        );
      }}
    />
  );
}

const Suggestion = memo((props: { htmlProps: React.HTMLProps<HTMLLIElement>; option: string; onClick: () => void }) => {
  const { htmlProps, option, onClick } = props;
  const { key, ...htmlPropsWithoutKey } = htmlProps;
  return (
    <Link to={option} onClick={onClick}>
      <li {...htmlPropsWithoutKey}>{option}</li>
    </Link>
  );
});

const SearchHint = (props: { className?: ClassValue }) => {
  const { className } = props;
  return (
    <div className={cn("flex items-center gap-1 text-xs text-stone-500", className)}>
      <div>Search by</div>
      <ClickIcon />
      <div>or</div>
      <div className="rounded-md border border-stone-400 px-1 py-0.5 text-xs leading-3">
        <kbd>/</kbd>
      </div>
    </div>
  );
};
