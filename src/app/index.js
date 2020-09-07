import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import useRoutes from '../routes';
import SideMenu from '../components/sideMenu';
import 'antd/dist/antd.css';
import store from '../redux/store';
import styles from './index.module.css';

const App = () => {
  const isAuthenticated = true;
  const routes = useRoutes(isAuthenticated);

  return (
    <Router>
      <Provider store={store}>
        <main className={styles.mainContainer}>
          {isAuthenticated ? <SideMenu /> : null}
          <section className={styles.componentWrapper}>{routes}</section>
        </main>
      </Provider>
    </Router>
  );
};

export default App;
