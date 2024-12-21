import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import { Link } from "@tanstack/react-router";
import { RiHome2Fill as HomeIcon } from "react-icons/ri";
import { TbClipboardText as ClipboardIcon } from "react-icons/tb";

type GlobalMenuProps = {
  isMenuOpen: boolean;
  width?: number;
};

export default function GlobalMenu(props: GlobalMenuProps) {
  const { isMenuOpen, width = 256 } = props;
  const theme = useTheme();
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
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"/about"}>
          <ListItem key={"/about"} disablePadding>
            <ListItemButton
              sx={{
                marginX: "10px",
                borderRadius: "10px",
              }}
            >
              <ListItemIcon>
                <ClipboardIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
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
                <ClipboardIcon />
              </ListItemIcon>
              <ListItemText primary="Boring Form" />
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
