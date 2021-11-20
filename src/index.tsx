import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Global } from '@emotion/react';
import { ThemeProvider as EPropsvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import global from './style/global';
import theme from './style/theme';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <EPropsvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Global styles={global} />
          <App />
        </ThemeProvider>
      </EPropsvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
