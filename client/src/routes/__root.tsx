import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import GlobalLayout from "~/shared/components/GlobalLayout";

export const Route = createRootRoute({
  component: () => (
    <>
      <GlobalLayout>
        <Outlet />
      </GlobalLayout>
      <TanStackRouterDevtools />
    </>
  ),
});
