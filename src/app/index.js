import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import 'antd/dist/antd.css';
import useRoutes from '../routes';

const App = () => {
  const routes = useRoutes(true);

  return <Router>{routes}</Router>;
};

export default App;
