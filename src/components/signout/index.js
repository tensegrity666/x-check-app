import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

import { signOut } from '../../services/firebase';

const Signout = () => {
  const history = useHistory();

  const onSignOut = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('savedTaskInProcess');
    signOut();
    history.push('/');
    document.location.reload();
  };

  return (
    <Button
      style={{ position: 'absolute', bottom: '20px' }}
      danger
      onClick={onSignOut}
      icon={<PoweroffOutlined />}>
      Sign out
    </Button>
  );
};

export default Signout;
