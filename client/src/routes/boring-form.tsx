import { createFileRoute } from "@tanstack/react-router";
import App from "~/App";

export const Route = createFileRoute("/boring-form")({
  component: RouteComponent,
});

function RouteComponent() {
  return <App />;
}
