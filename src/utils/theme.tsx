import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { green, purple, red, grey } from '@mui/material/colors';

let theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: green[600],
    },
    text: {
      primary: '#000',
    },
  },
});

theme = responsiveFontSizes(theme);

export { theme };
