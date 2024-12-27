import { useEffect } from "react";

export function useFocusOnKeyPress(ref: React.RefObject<HTMLElement>, focusKey?: string, unFocusKey?: string) {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      // GOTCHA: Do not pre-compute isFocused as out-of-date, use within ifs instead
      // const isFocused = ref.current === document.activeElement;
      if (focusKey && event.key === focusKey && ref.current !== document.activeElement) {
        event.preventDefault();
        ref.current?.focus();
      }

      if (unFocusKey && event.key === unFocusKey && ref.current === document.activeElement) {
        event.preventDefault();
        ref.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, [ref, focusKey, unFocusKey]);
}
