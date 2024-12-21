import { Autocomplete, Slide, TextField, useScrollTrigger } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import { useMemo, useRef, useState } from "react";
import { MdOutlineMenu as MenuIcon, MdMenuOpen as MenuOpenIcon } from "react-icons/md";
import { routes } from "~/shared/constants/routes";

type GlobalHeaderProps = {
  isMenuOpen: boolean;
  onMenuOpen: () => void;
};

export default function GlobalHeader(props: GlobalHeaderProps) {
  const { isMenuOpen, onMenuOpen } = props;

  const theme = useTheme();
  const headerColor = "rgba(240, 240, 240, 1)";

  const ChromeTabLikeTail = useMemo(() => {
    return (
      <div className="relative h-[20px] w-[123px]">
        <div
          className="absolute left-0 top-0 z-0 h-full w-full scale-x-[-1]"
          style={{
            // MUST MATCH BG COLR BELOW (extract to param)
            backgroundColor: headerColor,
          }}
        ></div>
        {/* grab bg-white from current theme background */}
        <div className="absolute left-0 top-0 z-50 h-full w-full rounded-tl-[20px] bg-white"></div>
      </div>
    );
  }, []);

  const [value, setValue] = useState(""); // State for the input value

  const inputRef = useRef<HTMLInputElement | null>(null); // Ref for the TextField input

  const handleOptionClick = () => {
    console.log("here");
    // Clear value after current event lifecycle (allow navigation + re-render to occur first)
    // by default setvalue goes into the MICROtask queue
    // Add setValue() to the MACROtask queue (setTimeout), lower priority than microtasks (re-renders etc) so occurs after navigation/re-render
    setTimeout(() => {
      setValue(""); // Clear the input field with a slight delay
      if (inputRef.current) inputRef.current.blur();
    }, 0);
  };

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

            width: "250px", // Fixed width for the background
            height: "100%",
            background: `
        linear-gradient(to right, rgba(240, 240, 240, 0), rgba(240, 240, 240, 1)),
        url("/whats-happening.jpg")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.5,
          },
          borderBottom: "solid 1px lightgray",
          zIndex: (theme) => theme.zIndex.drawer + 1, // ensure drawer bar stays above
          left: 0,
          width: "calc(100vw - 123px)", // must match width
          borderBottomRightRadius: "20px",
          backgroundColor: headerColor,
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
        <Toolbar variant="dense">
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
          <div className="flex w-full items-center justify-between gap-2">
            <p>BlueBird</p>
            <Autocomplete
              size="small"
              disablePortal
              options={routes}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue ?? ""); // Update the input value when typing
              }}
              renderOption={(props, option) => {
                const { key, ...restProps } = props; // Destructure key from props
                return (
                  <Link key={key} to={option} style={{ textDecoration: "none" }} onClick={handleOptionClick}>
                    <li {...restProps}> {option}</li>
                  </Link>
                );
              }}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  inputRef={inputRef}
                  {...params}
                  variant="standard"
                  placeholder="Search"
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "10px",
                      backgroundColor: "#ffffff",
                    },
                  }}
                />
              )}
            />
            <img src="./placeholder-avatar.webp" className="h-5 w-5" />
          </div>
        </Toolbar>
        <div className="absolute -right-[123px]">{ChromeTabLikeTail}</div>
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
