import { createLazyFileRoute } from "@tanstack/react-router";
import Hero from "~/features/hero/Hero";

export const Route = createLazyFileRoute("/")({
  component: Hero,
});
