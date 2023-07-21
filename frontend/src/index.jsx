import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        audience={process.env.REACT_APP_API_IDENTIFIER}
        scope="read:current_user"
        cacheLocation="localstorage"
        // useRefreshTokens={true}
      >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
