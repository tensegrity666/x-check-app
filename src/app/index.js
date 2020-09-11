import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import useRoutes from '../routes';

import store from '../redux/store';
import * as actions from '../redux/actions';

import 'antd/dist/antd.css';

const App = () => {
  const { dispatch } = store;
  const { loadFromLocalStorage } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('loggedInUser'));
    loadFromLocalStorage(savedState);
  });

  const isAuthenticated = useSelector(
    ({ loginReducer }) => loginReducer.isAuthenticated
  );

  const routes = useRoutes(isAuthenticated);

  return <Router>{routes}</Router>;
};

export default App;
