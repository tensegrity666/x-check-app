import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import routes from './constants';
import styles from './index.module.css';

const { Sider } = Layout;

const SideMenu = () => {
  const activeRoute = window.location.pathname.split('/')[1] || 'profile';

  return (
    <Sider theme="light" className={styles.sideMenu}>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[activeRoute]}
        className={styles.menuList}>
        {routes.map((route) => {
          return (
            <Menu.Item key={route}>
              <NavLink to={`/${route}`} className={styles.menuLabel}>
                {route}
              </NavLink>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default SideMenu;
