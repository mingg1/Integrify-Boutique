import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from 'components/App';
import { store } from 'redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './styles/reset.css';
import './styles/style.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="318880873351-hspbv9md0483c5hbdurubc3he99brglr.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
