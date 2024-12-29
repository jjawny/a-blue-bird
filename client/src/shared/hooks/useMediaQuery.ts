import { useCallback, useSyncExternalStore } from "react";

// TODO: Support a param with defined standard Tailwind media queries
export function useMediaQuery(params: { maxWidth?: number; minWidth?: number }): boolean {
  const mediaQuery = [
    params.minWidth !== undefined ? `(min-width: ${params.minWidth}px)` : null,
    params.maxWidth !== undefined ? `(max-width: ${params.maxWidth}px)` : null,
  ]
    .filter(Boolean)
    .join(" and ");

  const subscribe = useCallback(
    (callback: (event: MediaQueryListEvent) => void): (() => void) => {
      const matchMedia = window.matchMedia(mediaQuery);
      matchMedia.addEventListener("change", callback);
      return () => matchMedia.removeEventListener("change", callback);
    },
    [mediaQuery],
  );

  const getSnapshot = (): boolean => {
    return window.matchMedia(mediaQuery).matches;
  };

  const getServerSnapshot = (): boolean => {
    throw new Error("useMediaQuery is a client-only hook");
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
