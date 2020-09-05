import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import useRoutes from '../routes';
import SideMenu from '../components/sideMenu';
import 'antd/dist/antd.css';
import styles from './index.module.css';

const App = () => {
  const isAuthenticated = true;
  const routes = useRoutes(isAuthenticated);

  return (
    <Router>
      <main className={styles.mainContainer}>
        {isAuthenticated ? <SideMenu /> : null}
        <section className={styles.componentWrapper}>{routes}</section>
      </main>
    </Router>
  );
};

export default App;
