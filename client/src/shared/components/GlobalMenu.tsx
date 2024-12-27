import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "@tanstack/react-router";
import { GoHome as HomeIcon } from "react-icons/go";
import { HiOutlineClipboardDocument as FormIcon } from "react-icons/hi2";
import { LuTextCursorInput as InputIcon, LuHandMetal as MetalHandIcon } from "react-icons/lu";
import { PiEyesFill as EyeIcon, PiAirplaneLanding as LandingIcon } from "react-icons/pi";
import { VscAzure as AzureIcon } from "react-icons/vsc";

type GlobalMenuProps = {
  isMenuOpen: boolean;
  width?: number;
};

export default function GlobalMenu(props: GlobalMenuProps) {
  const { isMenuOpen, width = 256 } = props;
  const theme = useTheme();
  const url = useLocation();
  const globalHeaderStylesToAdjustSpacing = theme.mixins.toolbar;

  const InnerContent = () => {
    return (
      <List>
        <Link to={"/"}>
          <ListItem key={"/"} disablePadding>
            <ListItemButton
              sx={{
                marginX: "10px",
                borderRadius: "10px",
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                sx={{
                  color: "black",
                  "& .MuiTypography-root": {
                    // fontWeight: "bold",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"/landings"}>
          <ListItem key={"/landings"} disablePadding>
            <ListItemButton
              sx={{
                marginX: "10px",
                borderRadius: "10px",
              }}
            >
              <ListItemIcon>
                <LandingIcon />
              </ListItemIcon>
              <ListItemText
                primary="Landings"
                sx={{
                  color: "black",
                  "& .MuiTypography-root": {
                    // fontWeight: "bold",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"/boring-form"}>
          <ListItem key={"/boring-form"} disablePadding>
            <ListItemButton
              sx={{
                marginX: "10px",
                borderRadius: "10px",
              }}
            >
              <ListItemIcon>
                <FormIcon />
              </ListItemIcon>
              <ListItemText
                primary="Forms"
                sx={{
                  color: "black",
                  "& .MuiTypography-root": {
                    // fontWeight: "bold",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"/inputs"}>
          <ListItem key={"/inputs"} disablePadding>
            <ListItemButton
              sx={{
                marginX: "10px",
                borderRadius: "10px",
                backgroundColor: location.pathname.startsWith("/about") ? "lightgray" : "", // Apply lightgray for the default state
                "&:hover": {
                  backgroundColor: location.pathname.startsWith("/about") ? "lightgray" : "", // Keep the same background color on hover
                  color: "inherit", // Prevent color change on hover
                },
              }}
            >
              <ListItemIcon>
                <InputIcon />
              </ListItemIcon>
              <ListItemText
                primary="Inputs"
                sx={{
                  color: "black",
                  "& .MuiTypography-root": {
                    // fontWeight: "bold",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"/landings"}>
          <ListItem key={"/landings"} disablePadding>
            <ListItemButton
              sx={{
                marginX: "10px",
                borderRadius: "10px",
                backgroundColor: location.pathname.startsWith("/about") ? "lightgray" : "", // Apply lightgray for the default state
                "&:hover": {
                  backgroundColor: location.pathname.startsWith("/about") ? "lightgray" : "", // Keep the same background color on hover
                  color: "inherit", // Prevent color change on hover
                },
              }}
            >
              <ListItemIcon>
                <EyeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Visuals"
                sx={{
                  color: "black",
                  "& .MuiTypography-root": {
                    // fontWeight: "bold",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"/landings"}>
          <ListItem key={"/landings"} disablePadding>
            <ListItemButton
              sx={{
                marginX: "10px",
                borderRadius: "10px",
                backgroundColor: location.pathname.startsWith("/about") ? "lightgray" : "", // Apply lightgray for the default state
                "&:hover": {
                  backgroundColor: location.pathname.startsWith("/about") ? "lightgray" : "", // Keep the same background color on hover
                  color: "inherit", // Prevent color change on hover
                },
              }}
            >
              <ListItemIcon>
                <AzureIcon />
              </ListItemIcon>
              <ListItemText
                primary="Azure"
                sx={{
                  color: "black",
                  "& .MuiTypography-root": {
                    // fontWeight: "bold",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"/landings"}>
          <ListItem key={"/landings"} disablePadding>
            <ListItemButton
              sx={{
                marginX: "10px",
                borderRadius: "10px",
                backgroundColor: location.pathname.startsWith("/about") ? "lightgray" : "", // Apply lightgray for the default state
                "&:hover": {
                  backgroundColor: location.pathname.startsWith("/about") ? "lightgray" : "", // Keep the same background color on hover
                  color: "inherit", // Prevent color change on hover
                },
              }}
            >
              <ListItemIcon>
                <MetalHandIcon />
              </ListItemIcon>
              <ListItemText
                primary="About"
                sx={{
                  color: "black",
                  "& .MuiTypography-root": {
                    // fontWeight: "bold",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    );
  };
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isMenuOpen}
      PaperProps={{
        elevation: 1, // Set the elevation of the Paper
      }}
      sx={{
        width: width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: width,
          boxSizing: "border-box",
          border: "none",
        },
      }}
    >
      <Box sx={{ ...globalHeaderStylesToAdjustSpacing }} />
      <InnerContent />
    </Drawer>
  );
}
