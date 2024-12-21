import { Slide, TextField, useScrollTrigger } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useMemo } from "react";
import { MdOutlineMenu as MenuIcon, MdMenuOpen as MenuOpenIcon } from "react-icons/md";

type GlobalHeaderProps = {
  isMenuOpen: boolean;
  onMenuOpen: () => void;
};

export default function GlobalHeader(props: GlobalHeaderProps) {
  const { isMenuOpen, onMenuOpen } = props;

  const theme = useTheme();

  const ChromeTabLikeTail = useMemo(() => {
    return (
      <div className="relative h-[10px] w-[10px]">
        <div
          className="absolute left-0 top-0 z-0 h-full w-full scale-x-[-1]"
          style={{
            // MUST MATCH BG COLR BELOW (extract to param)
            backgroundColor: "lightblue",
          }}
        ></div>
        <div className="absolute left-0 top-0 z-50 h-full w-full rounded-tl-[25px] bg-white"></div>
      </div>
    );
  }, []);

  return (
    <HideOnScroll {...props}>
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          // Adjust background opacity w/o affecting <Toolbar>
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: 'url("/whats-happening.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            // filter: "grayscale(100%)",
            opacity: 0.1,
            zIndex: -1,
            borderBottomRightRadius: "25px",
          },
          zIndex: (theme) => theme.zIndex.drawer + 1, // ensure drawer bar stays above
          left: 0,
          width: "calc(100% - 10px)", // must match width
          borderBottomRightRadius: "25px",
          backgroundColor: "lightblue",
          paddinrRight: "10px",
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(isMenuOpen && {
            // marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="Open global portal menu"
            onClick={onMenuOpen}
            edge="start"
            sx={{
              "&:focus": {
                outline: "none", // Remove the focus outline (blue ring)
              },
            }}
          >
            {isMenuOpen ? <MenuOpenIcon color="white" /> : <MenuIcon color="white" />}
          </IconButton>
          <div className="ml-auto flex gap-2">
            <TextField size="small" label="gloabl search goes here" />
            <p>pfp</p>
          </div>
        </Toolbar>
        <div className="absolute -right-[10px]">{ChromeTabLikeTail}</div>
      </AppBar>
    </HideOnScroll>
  );
}

type HideOnScrollProps = {
  children?: React.ReactElement<unknown>;
};

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <></>}
    </Slide>
  );
}
