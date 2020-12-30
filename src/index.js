import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './AppContext';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-ip1x4wr7.eu.auth0.com'
      clientId='uimBAQwNVmsnUWbQ0LAR8sC2ynf4YOSE'
      redirectUri={'http://localhost:3000/welcome'}
    >
      <AppProvider>
        <App />
      </AppProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
