import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import './index.css';

// ! keeps json-server awake
import keepAwake from './services/keep-awake';

keepAwake();
// !

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
