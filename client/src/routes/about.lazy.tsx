import { createLazyFileRoute } from "@tanstack/react-router";
import Landings from "~/features/landings/Landings";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return <Landings />;
}
