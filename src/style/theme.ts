import { createTheme } from '@mui/material/styles';

const primary = {
  main: '#738047',
  '100': '#DFE4CE',
};

const theme = createTheme({
  palette: {
    primary,
    warning: {
      main: '#DE994A',
    },
    error: {
      main: '#E75578',
    },
    secondary: {
      main: '#9A9A9A',
    },
  },
  typography: {
    fontFamily: 'Noto Sans TC',
    h1: {
      fontSize: '2.448rem',
      fontWeight: '700',
    },
    h2: {
      fontSize: '2.074rem',
      fontWeight: '600',
    },
    h3: {
      fontSize: '1.728rem',
      fontWeight: '500',
    },
    h4: {
      fontSize: '1.44rem',
      fontWeight: '400',
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: '300',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: '300',
    },
    button: {
      fontSize: '0.833rem',
    },
    caption: {
      fontSize: '0.694rem',
      fontWeight: '300',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: primary.main,
          boxShadow: 'none',
          backgroundColor: '#ffffff',
          border: '1px solid #A4B375',
          borderRadius: '8px',

          '&:hover': {
            boxShadow: 'none',
            backgroundColor: primary[100],
          },
        },
      },
    },
  },
});

export default theme;
