import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Global } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import global from './style/global';
import theme from './style/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
