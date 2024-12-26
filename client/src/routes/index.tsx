import { createFileRoute } from "@tanstack/react-router";
import Hero from "~/features/hero/Hero";

export const Route = createFileRoute("/")({
  component: Hero,
});
