import { Divider, Slide, useScrollTrigger } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useMemo } from "react";
import { MdOutlineMenu as MenuIcon, MdMenuOpen as MenuOpenIcon } from "react-icons/md";
import { MemoisedTopBarButtons } from "~/features/global-layout/components/TopBarButtons";
import TopBarSearch from "~/features/global-layout/components/TopBarSearch";

export default function GlobalTopBar(props: { isSideBarOpen: boolean; onSideBarOpen: () => void; splashImageUrl?: string }) {
  const { isSideBarOpen, onSideBarOpen, splashImageUrl } = props;
  const theme = useTheme();
  const headerColor = "#ffffff";
  const appBackgroundColor = theme.palette.background.default;
  const chromeTabLikeTailWidth = 8.8;

  const ChromeTabLikeTail = useMemo(() => {
    return (
      <div className="relative h-[20px]" style={{ width: `${chromeTabLikeTailWidth}px` }}>
        <div className="absolute left-0 top-0 z-0 h-full w-full scale-x-[-1]" style={{ backgroundColor: headerColor }}></div>
        <div
          className="absolute left-0 top-0 z-50 h-full w-full rounded-tl-[20px] border-l border-t border-stone-300"
          style={{ backgroundColor: appBackgroundColor }}
        ></div>
      </div>
    );
  }, [chromeTabLikeTailWidth]);

  const splashImageStyle = useMemo((): {} => {
    if (!splashImageUrl) return {};

    // Quick-customise
    const widthPixels: number = 111;
    const isGrayscale: boolean = true;
    const opacity: number = 0.1;

    return {
      // Use pseudo element to allow adjusting background opacity w/o affecting <Toolbar> opacity
      "&::before": {
        content: '""',
        position: "absolute",
        width: `${widthPixels}px`,
        height: "100%",
        top: 0,
        right: 0,
        background: `
          linear-gradient(
            to right,
            rgba(256, 256, 256, 1) 0%,
            rgba(256, 256, 256, 0) 50%,
            rgba(256, 256, 256, 0) 100%
          ),
          url("${splashImageUrl}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        borderBottomRightRadius: 19,
        ...(isGrayscale ? { filter: "grayscale(1)" } : {}),
        opacity: opacity,
      },
    };
  }, [splashImageUrl]);

  return (
    <HideOnScroll {...props}>
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          ...splashImageStyle,
          // borderBottom: "solid 1px lightgray",
          borderRight: "solid 1px lightgray",
          zIndex: (theme) => theme.zIndex.drawer + 1, // ensure drawer bar stays above
          left: 0,
          width: `calc(100vw - ${chromeTabLikeTailWidth}px)`, // must match width
          borderBottomRightRadius: "20px",
          backgroundColor: headerColor,
        }}
      >
        <GlobalTopBarContent isSideBarOpen={isSideBarOpen} onSideBarOpen={onSideBarOpen} />
        <div className="absolute" style={{ right: `-${chromeTabLikeTailWidth}px` }}>
          {ChromeTabLikeTail}
        </div>
      </AppBar>
    </HideOnScroll>
  );
}

const GlobalTopBarContent = (props: { isSideBarOpen: boolean; onSideBarOpen: () => void }) => {
  const { isSideBarOpen, onSideBarOpen } = props;

  return (
    <Toolbar variant="dense">
      <IconButton
        edge="start"
        onClick={onSideBarOpen}
        aria-label="Open global portal menu"
        sx={{ "&:focus": { outline: "none" } }} // remove the focus outline (blue ring)
        size="small"
      >
        {isSideBarOpen ? <MenuOpenIcon className="text-black" /> : <MenuIcon className="text-black" />}
      </IconButton>
      <Divider orientation="vertical" variant="middle" flexItem className="bg-stone-50" sx={{ marginX: "10px" }} />
      <div className="flex w-full items-center justify-between gap-2">
        <MemoisedTopBarButtons />
        <TopBarSearch />
        <img src="./placeholder-avatar.webp" className="h-8 w-8 rounded-full shadow-sm shadow-stone-200" />
      </div>
    </Toolbar>
  );
};

const HideOnScroll = (props: { children?: React.ReactElement<unknown> }) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <></>}
    </Slide>
  );
};
