import { Breadcrumbs, Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import { ReactNode, useEffect } from "react";
import { PiBreadFill as BreadIcon } from "react-icons/pi";

export default function GlobalContainer(props: { isSideBarOpen: boolean; drawerWidth?: number; children?: ReactNode }) {
  const { isSideBarOpen, drawerWidth = 256, children } = props;
  const theme = useTheme();
  const toolbarHeight = theme.mixins.toolbar.minHeight;
  const adjustToSideBarStyles: SxProps<Theme> = {
    transition: theme.transitions.create("margin", {
      easing: isSideBarOpen ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
      duration: isSideBarOpen ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
    }),
    marginLeft: isSideBarOpen ? 0 : `-${drawerWidth}px`,
  };

  useEffect(
    function overrideToolbarHeightAdjustment() {
      const root = document.getElementById("root");
      if (root) root.style.setProperty("--toolbar-height", `${toolbarHeight}px`);
    },
    [toolbarHeight],
  );

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        ...adjustToSideBarStyles,
      }}
    >
      <RootBreadcrumbs />
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          position: "relative",
          backgroundColor: "#f1f1f1",
          borderRadius: "0px 10px 10px 10px",
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

// TODO: memoise? or leave and test for React compiler (see dev tools if fixed)
const RootBreadcrumbs = () => {
  return (
    <div className="z-10 h-3 w-fit overflow-y-visible rounded-t-lg bg-[#f1f1f1] px-4">
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "12px" }}>
        <BreadIcon opacity={0.3} />
        <Link underline="hover" color="#0391ca" href="/">
          Forms
        </Link>
        <Link underline="hover" color="#0391ca" href="/material-ui/getting-started/installation/">
          Super Form
        </Link>
        <Typography color="inherit">Breadcrumbs </Typography>
      </Breadcrumbs>
    </div>
  );
};
