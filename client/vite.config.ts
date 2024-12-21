import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    /* 🤘🏻 tanstack router setup */
    TanStackRouterVite(), //
  ],
  resolve: {
    /* 🤘🏻 path alias */
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
