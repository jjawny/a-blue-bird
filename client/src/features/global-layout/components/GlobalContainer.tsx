import { Breadcrumbs, Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import { ReactNode, useEffect } from "react";
import { PiBreadFill as BreadIcon } from "react-icons/pi";

export default function GlobalContainer(props: { isSideBarOpen: boolean; drawerWidth?: number; children?: ReactNode }) {
  const { isSideBarOpen, drawerWidth = 256, children } = props;
  const theme = useTheme();
  const backgroundColor = theme.palette.globalContainer?.background;
  const toolbarHeight = theme.mixins.toolbar.minHeight;
  const adjustToSideBarStyles: SxProps<Theme> = {
    transition: theme.transitions.create("margin", {
      easing: isSideBarOpen ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
      duration: isSideBarOpen ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
    }),
    marginLeft: isSideBarOpen ? 0 : `-${drawerWidth}px`,
  };

  useEffect(
    function overrideToolbarHeightAdjustmentCss() {
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
      <GlobalBreadcrumbs />
      <Box
        sx={{
          flexGrow: 1,
          paddingX: "5px",
          paddingTop: "20px", // start content beneath breadcrumbs
          paddingBottom: "5px",
          maxHeight: "100%",
          overflowY: "scroll",
          border: "1px solid",
          borderColor: "rgb(168 162 158)",
          borderRadius: "0px 11px 11px 11px",
          backgroundColor: backgroundColor,
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

// TODO: memoise? or leave and test for React compiler (see dev tools if fixed)
const GlobalBreadcrumbs = () => {
  const theme = useTheme();
  const backgroundColor = theme.palette.globalContainer?.background;

  return (
    <div className="z-10 h-3 w-fit overflow-y-visible text-nowrap rounded-t-lg border-x border-t border-stone-400 bg-[#f1f1f1]">
      <Breadcrumbs
        aria-label="breadcrumbs"
        sx={{
          fontSize: "12px",
          background: `linear-gradient(to bottom, ${backgroundColor} 90%, transparent 100%)`,
          paddingX: "10px",
          paddingBottom: "5px",
          borderRadius: "10px",
        }}
      >
        <BreadIcon opacity={0.3} />
        <Link underline="hover" color="#0391ca" href="/" zIndex="19">
          Forms
        </Link>
        <Link underline="hover" color="#0391ca" href="/" zIndex="19">
          Forms
        </Link>
        <Link underline="hover" color="#0391ca" href="/" zIndex="19">
          Forms
        </Link>
        <Link underline="hover" color="#0391ca" href="/" zIndex="19">
          Forms
        </Link>
        <Link underline="hover" color="#0391ca" href="/" zIndex="19">
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
