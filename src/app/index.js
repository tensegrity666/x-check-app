import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import useRoutes from '../routes';
import 'antd/dist/antd.css';

const App = () => {
  const isAuthenticated = useSelector(
    ({ loginReducer }) => loginReducer.isAuthenticated
  );

  const routes = useRoutes(isAuthenticated);

  return <Router>{routes}</Router>;
};

export default App;
