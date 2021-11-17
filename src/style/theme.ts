import { createTheme } from '@mui/material/styles';

const primary = {
  main: '#738047',
  light: '#DFE4CE',
  dark: '#474F2C',
};

const theme = createTheme({
  palette: {
    primary,
    warning: {
      main: '#DE994A',
      light: '#FAF0E5',
      dark: '#C67A24',
    },
    error: {
      main: '#E75578',
      light: '#F7D4DD',
      dark: '#BC3253',
    },
    secondary: {
      main: '#9A9A9A',
      dark: '#767676',
    },
  },
  typography: {
    fontFamily: 'Noto Sans TC',
    h1: {
      color: primary.dark,
      fontSize: '2.448rem',
      fontWeight: '700',
    },
    h2: {
      color: primary.dark,
      fontSize: '2.074rem',
      fontWeight: '700',
    },
    h3: {
      color: primary.dark,
      fontSize: '1.728rem',
      fontWeight: '700',
    },
    h4: {
      color: primary.dark,
      fontSize: '1.44rem',
      fontWeight: '700',
    },
    h5: {
      color: primary.dark,
      fontSize: '1.2rem',
      fontWeight: '700',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: '400',
    },
    button: {
      fontSize: '0.833rem',
    },
    caption: {
      fontSize: '0.694rem',
      fontWeight: '400',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: primary.main,
          boxShadow: 'none',
        },
        contained: {
          backgroundColor: '#ffffff',
          border: '1px solid #A4B375',
          borderRadius: '8px',

          '&:hover': {
            boxShadow: 'none',
            backgroundColor: primary.light,
          },
        },
      },
    },
  },
});

export default theme;
