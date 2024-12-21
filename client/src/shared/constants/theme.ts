import { createTheme } from "@mui/material/styles";

/**
 * GOTCHA:
 *  - When applying theme <ThemeProvider>, import from @mui/material and NOT @emotion/react otherwise defaultProps will be ignored
 *  - See https://github.com/mui/material-ui/issues/42892#issuecomment-2220244399
 */
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2291cb",
    },
    secondary: {
      main: "#24607F",
      dark: "#1F516F",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
        margin: "dense",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderBottomStyle: "inset",
            borderBottomWidth: "2px",
            borderBottomColor: "gray",
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
  },
});
