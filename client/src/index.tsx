import { CssBaseline, ThemeProvider } from "@mui/material";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "~/index.css";
import { routeTree } from "~/routeTree.gen";
import { theme } from "~/shared/constants/theme.ts";

//#region 🤘🏻 tanstack router setup
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
//#endregion

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
