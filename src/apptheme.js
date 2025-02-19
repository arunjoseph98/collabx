import { createTheme } from "@mui/material";

export const apptheme = createTheme({
    palette: {
        type: 'light',
        primary: {
          main: '#185abd',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
          default: '#e2e2e2',
          paper: '#f9f9f9',
        },
      },
      props: {
        MuiButtonBase: {
          disableRipple: true,
        },
      },
  })