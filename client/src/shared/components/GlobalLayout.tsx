import { Breadcrumbs, Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { ReactNode, useCallback, useState } from "react";
import { PiBreadFill as BreadIcon } from "react-icons/pi";
// OWN COMPONENTS
import GlobalTopBar from "~/features/global-layout/components/GlobalTopBar";
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
      <GlobalTopBar isMenuOpen={isMenuOpen} onMenuOpen={handleMenuOpen} splashImageUrl="/whats-happening.jpg" />
      <GlobalMenu isMenuOpen={isMenuOpen} width={menuWidth} />
      <PageContent isMenuOpen={isMenuOpen} menuWidth={menuWidth}>
        <>{children}</>
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
      <Box
        sx={{
          position: "absolute",
          top: `calc(${globalHeaderStylesToAdjustSpacing.minHeight}px)`,
          left: isMenuOpen ? `${menuWidth}px` : 0,
          transition: theme.transitions.create("left", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          paddingLeft: theme.spacing(2),
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <BreadIcon />
          <Link underline="hover" color="#0391ca" href="/">
            Forms
          </Link>
          <Link underline="hover" color="#0391ca" href="/material-ui/getting-started/installation/">
            Super Form
          </Link>
          <Typography color="inherit">Breadcrumbs </Typography>
        </Breadcrumbs>
      </Box>
      {children}
    </Box>
  );
};
