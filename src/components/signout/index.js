import React from 'react';
import { Button } from 'antd';

import { signOut } from '../../services/firebase';

const Signout = () => {
  const onSignOut = () => {
    localStorage.removeItem('loggedInUser');
    signOut();
    document.location.reload();
  };

  return (
    <Button danger onClick={onSignOut}>
      Sign out
    </Button>
  );
};

export default Signout;
