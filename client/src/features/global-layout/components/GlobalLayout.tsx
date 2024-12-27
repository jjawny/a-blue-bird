import Box from "@mui/material/Box";
import { ReactNode, useCallback, useState } from "react";
import GlobalContainer from "~/features/global-layout/components/GlobalContainer";
import GlobalSideBar from "~/features/global-layout/components/GlobalSideBar";
import GlobalTopBar from "~/features/global-layout/components/GlobalTopBar";

/**
 * Use in router's root
 * @param props pass <Outlet> as children
 * @returns the global wrapping layout
 */
export default function GlobalLayout(props: { children?: ReactNode }) {
  const { children } = props;
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const menuWidth = 240;
  const handleSideBarOpen = useCallback(() => setIsSideBarOpen((prev) => !prev), []);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <GlobalTopBar isSideBarOpen={isSideBarOpen} onSideBarOpen={handleSideBarOpen} splashImageUrl="/whats-happening.jpg" />
      <GlobalSideBar isOpen={isSideBarOpen} width={menuWidth} />
      <GlobalContainer isSideBarOpen={isSideBarOpen} drawerWidth={menuWidth}>
        {children}
      </GlobalContainer>
    </Box>
  );
}
