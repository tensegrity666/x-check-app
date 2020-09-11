import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

import { signOut } from '../../services/firebase';

const Signout = () => {
  const history = useHistory();

  const onSignOut = () => {
    localStorage.removeItem('loggedInUser');
    signOut();
    history.push('/');
    document.location.reload();
  };

  return (
    <Button danger onClick={onSignOut}>
      Sign out
    </Button>
  );
};

export default Signout;
