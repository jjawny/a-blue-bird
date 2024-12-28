import { Divider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { TbLayoutSidebarLeftCollapse as SidebarCloseIcon, TbLayoutSidebar as SidebarIcon } from "react-icons/tb";
import { MemoisedTopBarButtons } from "~/features/global-layout/components/TopBarButtons";
import TopBarSearch from "~/features/global-layout/components/TopBarSearch";

export default function GlobalTopBar(props: { isSideBarOpen: boolean; onSideBarOpen: () => void; splashImageUrl?: string }) {
  const { isSideBarOpen, onSideBarOpen, splashImageUrl } = props;
  const theme = useTheme();

  // TODO: move to other demo (div with splash)
  // const splashImageStyle = useMemo((): {} => {
  //   if (!splashImageUrl) return {};

  //   // Quick-customise
  //   const widthPixels: number = 111;
  //   const isGrayscale: boolean = true;
  //   const opacity: number = 0.2;

  //   return {
  //     // Use pseudo element to allow adjusting background opacity w/o affecting <Toolbar> opacity
  //     "&::before": {
  //       content: '""',
  //       position: "absolute",
  //       width: `${widthPixels}px`,
  //       height: "100%",
  //       top: 0,
  //       right: 0,
  //       background: `
  //         linear-gradient(
  //           to right,
  //           rgba(256, 256, 256, 1) 0%,
  //           rgba(256, 256, 256, 0) 50%,
  //           rgba(256, 256, 256, 0) 100%
  //         ),
  //         url("${splashImageUrl}")`,
  //       backgroundSize: "cover",
  //       backgroundRepeat: "no-repeat",
  //       backgroundPosition: "center",
  //       borderBottomRightRadius: 22,
  //       ...(isGrayscale ? { filter: "grayscale(1)" } : {}),
  //       opacity: opacity,
  //     },
  //   };
  // }, [splashImageUrl]);

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        backgroundColor: theme.palette.background.default,
        zIndex: (theme) => theme.zIndex.drawer + 1, // ensure drawer bar stays above
        borderBottomRightRadius: 22,
      }}
    >
      <GlobalTopBarContent isSideBarOpen={isSideBarOpen} onSideBarOpen={onSideBarOpen} />
    </AppBar>
  );
}

const GlobalTopBarContent = (props: { isSideBarOpen: boolean; onSideBarOpen: () => void }) => {
  const { isSideBarOpen, onSideBarOpen } = props;

  return (
    <Toolbar variant="dense" sx={{ paddingY: "10px" }}>
      <IconButton
        edge="start"
        size="small"
        onClick={onSideBarOpen}
        aria-label="Open global portal menu"
        sx={{ borderRadius: "5px", "&:focus": { outline: "none" } }} // remove the focus outline (blue ring)
      >
        {isSideBarOpen ? <SidebarCloseIcon className="text-black" /> : <SidebarIcon className="text-black" />}
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
