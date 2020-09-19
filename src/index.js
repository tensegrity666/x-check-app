import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
// import App from './app';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import './index.css';
import ShowRestApi from './show-rest-api';

render(
  <Provider store={store}>
    <ShowRestApi>{/* <App /> */}</ShowRestApi>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
