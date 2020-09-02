import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import 'antd/dist/antd.css';
import useRoutes from '../routes';

const App = () => {
  const routes = useRoutes(false);

  return (
    <Router>
      <div>{routes}</div>
    </Router>
  );
};

export default App;
