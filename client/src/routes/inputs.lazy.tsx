import { createLazyFileRoute } from "@tanstack/react-router";
import Inputs from "~/features/inputs/Inputs";

export const Route = createLazyFileRoute("/inputs")({
  component: Inputs,
});
