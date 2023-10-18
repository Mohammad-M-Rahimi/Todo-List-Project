import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#E25E3E', // Accent color
    },
    secondary: {
      main: '#FF9B50', // Secondary accent color
    },
    background: {
      default: '#ffff', // Background color
    },
    text: {
      primary: '#C63D2F', // Text and titles color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
