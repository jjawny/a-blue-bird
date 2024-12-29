import { Autocomplete, AutocompleteChangeReason, AutocompleteRenderInputParams, TextField } from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { ClassValue } from "clsx";
import { forwardRef, memo, useRef, useState } from "react";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { TbHandClick as ClickIcon, TbDirections as RouteIcon } from "react-icons/tb";
import { routes } from "~/shared/constants/routes";
import { cn } from "~/shared/helpers/classname-helpers";
import { useFocusOnKeyPress } from "~/shared/hooks/useFocusOnKeyPress";

const WIDTH_TRANSITION_MS = 80;

export default function TopBarSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  useFocusOnKeyPress(inputRef, "/", "Escape");

  // TLDR:
  //  - To render correctly, we must clear the search value AFTER navigation re-render has completed
  //  - By default, setValue goes into the MICROtask queue, use setTimeout to defer to MACROtask queue (queued after navigation re-render)
  const handleSuggestionClick = () => setTimeout(() => setSearchValue(""), 0);

  // TLDR:
  //  - TLDR: Wait for <TextField> width to finish transforming so <Suggestions> popper renders with a matching width
  const handleOpen = () => setTimeout(() => setIsSuggestionsOpen(true), WIDTH_TRANSITION_MS + 10);
  const handleClose = () => setIsSuggestionsOpen(false);
  const handleChange = (_: React.SyntheticEvent<Element, Event>, value: string | null, reason: AutocompleteChangeReason) => {
    if (reason === "selectOption" && value) {
      navigate({ to: value });
      handleSuggestionClick;
      return;
    }
    setSearchValue(value ?? "");
  };

  return (
    <Autocomplete
      size="small"
      blurOnSelect
      disablePortal
      popupIcon={null}
      clearIcon={null}
      options={routes}
      value={searchValue}
      open={isSuggestionsOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      onChange={handleChange}
      renderInput={(params) => <SearchInput params={params} ref={inputRef} />}
      renderOption={(htmlProps, option) => (
        <Suggestion key={htmlProps.key} htmlProps={htmlProps} option={option} onClick={handleSuggestionClick} />
      )}
    />
  );
}

const Suggestion = memo((props: { htmlProps: React.HTMLProps<HTMLLIElement>; option: string; onClick: () => void }) => {
  const { htmlProps, option, onClick } = props;
  const { key, className: htmlClassName, ...otherHtmlProps } = htmlProps;
  return (
    <Link to={option} onClick={onClick}>
      <li {...otherHtmlProps} className={cn(htmlClassName, "!text-sm")}>
        <RouteIcon className="mr-2" />
        {option}
      </li>
    </Link>
  );
});

const SearchHint = (props: { className?: ClassValue }) => {
  const { className } = props;
  return (
    <div
      className={cn(
        "pointer-events-none z-50 flex cursor-text select-none items-center gap-1 text-xs text-stone-500",
        className,
      )}
    >
      <div>Search by</div>
      <ClickIcon />
      <div>or</div>
      <div className="rounded-md border border-stone-400 px-1 py-0.5 text-xs leading-3">
        <kbd>/</kbd>
      </div>
    </div>
  );
};

const SearchInput = forwardRef<HTMLInputElement, { params: AutocompleteRenderInputParams }>((props, ref) => {
  const { params } = props;
  const inputRef = ref as React.MutableRefObject<HTMLInputElement | null>;
  const isFocused = document.activeElement === inputRef.current;

  return (
    <div className="relative flex items-center">
      {!isFocused && <SearchHint className="absolute left-8" />}
      <SearchIcon className="mr-2 cursor-pointer text-black" />
      <TextField
        {...params}
        inputRef={ref}
        variant="outlined"
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{
          margin: 0,
          width: isFocused ? 256 : 125,
          transition: `width ${WIDTH_TRANSITION_MS}ms ease-out`,
          "& .MuiInputBase-root": {
            padding: "0 !important",
            border: "none",
            background: "#ffffff8f",
            borderRadius: "4px",
          },
        }}
      />
    </div>
  );
});
