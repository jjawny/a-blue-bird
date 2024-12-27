import { Breadcrumbs, Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import { ReactNode, useEffect } from "react";
import { PiBreadFill as BreadIcon } from "react-icons/pi";

export default function GlobalContainer(props: { isSideBarOpen: boolean; drawerWidth?: number; children?: ReactNode }) {
  const { isSideBarOpen, drawerWidth = 256, children } = props;
  const theme = useTheme();
  const toolbarHeight = theme.mixins.toolbar.minHeight;
  const zIndexToRemainAboveEverythingExceptTooltips = theme.zIndex.tooltip - 1; // avoid container clipping behind top/sidebars when user tries to drag (rubber bands back)
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
        zIndex: zIndexToRemainAboveEverythingExceptTooltips,
        ...adjustToSideBarStyles,
      }}
    >
      <GlobalBreadcrumbs />
      <Box
        sx={{
          flexGrow: 1,
          maxHeight: "100%",
          overflowY: "scroll",
          border: "1px solid",
          borderTop: "none",
          borderColor: "rgb(168 162 158)",
          borderRadius: "0px 11px 11px 11px",
          backgroundColor: "#f1f1f1",
          boxShadow: "inset 0 -6px 6px rgba(0, 0, 0, 0.1), inset 0 -2px 5px rgba(0, 0, 0, 0.2)", // Custom inset shadow
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

// TODO: memoise? or leave and test for React compiler (see dev tools if fixed)
const GlobalBreadcrumbs = () => {
  return (
    <div className="z-10 h-3 w-fit overflow-y-visible rounded-t-lg border-l border-t border-stone-400 bg-[#f1f1f1]">
      <Breadcrumbs
        aria-label="breadcrumbs"
        sx={{
          fontSize: "12px",
          background: "linear-gradient(to bottom, #f1f1f1 90%, transparent 100%)",
          paddingX: "10px",
          paddingBottom: "5px",
          borderRadius: "10px",
        }}
      >
        <BreadIcon opacity={0.3} />
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
