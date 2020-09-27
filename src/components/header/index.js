import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Avatar } from 'antd';

import logo from './assets/logo-rsschool3.png';
import styles from './index.module.css';

const Header = () => {
  const { nav, avatar } = styles;
  const { photoURL } = useSelector(({ loginReducer }) => loginReducer);

  return (
    <nav className={nav}>
      <a
        href="https://app.rs.school/"
        target="_blank"
        rel="noopener noreferrer">
        <img src={logo} alt="Rolling scopes school logo" height="30" />
      </a>
      <Button
        size="large"
        icon={<Avatar className={avatar} src={photoURL} size={24} />}
        href="/profile"
        type="dashed">
        My Profile
      </Button>
    </nav>
  );
};

export default Header;
