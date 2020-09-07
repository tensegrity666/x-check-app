import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import useRoutes from '../routes';
import 'antd/dist/antd.css';
import store from '../redux/store';

const App = () => {
  const isAuthenticated = true;
  const routes = useRoutes(isAuthenticated);

  return (
    <Router>
      <Provider store={store}>{routes}</Provider>
    </Router>
  );
};

export default App;
