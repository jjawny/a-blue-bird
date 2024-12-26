import { createLazyFileRoute } from "@tanstack/react-router";
import App from "~/App";

export const Route = createLazyFileRoute("/boring-form")({
  component: App,
});
