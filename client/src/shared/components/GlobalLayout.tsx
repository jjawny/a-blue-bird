import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { ReactNode, useCallback, useState } from "react";
// OWN COMPONENTS
import GlobalHeader from "~/shared/components/GlobalHeader";
import GlobalMenu from "~/shared/components/GlobalMenu";

type GlobalLayoutProps = {
  children?: ReactNode;
};

export default function GlobalLayout(props: GlobalLayoutProps) {
  const { children } = props;
  const menuWidth = 240;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuOpen = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <Box sx={{ display: "flex" }}>
      <GlobalHeader isMenuOpen={isMenuOpen} onMenuOpen={handleMenuOpen} />
      <GlobalMenu isMenuOpen={isMenuOpen} width={menuWidth} />
      <PageContent isMenuOpen={isMenuOpen} menuWidth={menuWidth}>
        {children}
      </PageContent>
    </Box>
  );
}

type PageContentProps = {
  isMenuOpen: boolean;
  menuWidth?: number;
  children?: ReactNode;
};

const PageContent = (props: PageContentProps) => {
  const { isMenuOpen, menuWidth = 256, children } = props;
  const theme = useTheme();
  const globalHeaderStylesToAdjustSpacing = theme.mixins.toolbar;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${menuWidth}px`,
        ...(isMenuOpen && {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        }),
      }}
    >
      <Box sx={{ ...globalHeaderStylesToAdjustSpacing }} />
      {children}
    </Box>
  );
};
