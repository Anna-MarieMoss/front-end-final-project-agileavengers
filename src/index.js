import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './AppContext';
import { Auth0Provider } from '@auth0/auth0-react';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './Theme.js';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-ip1x4wr7.eu.auth0.com'
      clientId='uimBAQwNVmsnUWbQ0LAR8sC2ynf4YOSE'
      redirectUri={'http://localhost:3000/profile'}
      audience='https://dev-ip1x4wr7.eu.auth0.com/api/v2/'
      scope='read:current_user update:current_user_metadata create:current_user_metadata'
      useRefreshTokens={true}
    >
    <ThemeProvider theme={theme}>
      <AppProvider>
        <App />
      </AppProvider>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
