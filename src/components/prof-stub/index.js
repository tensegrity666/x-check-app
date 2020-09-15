import React from 'react';
import { useSelector } from 'react-redux';

import Signout from '../signout';

const ProfStub = () => {
  const {
    uid,
    githubId,
    currentRole,
    displayName,
    email,
    photoURL,
  } = useSelector(({ loginReducer }) => loginReducer);

  return (
    <>
      <ul>
        <li>{uid}</li>
        <li>{githubId}</li>
        <li>{currentRole}</li>
        <li>{displayName}</li>
        <li>{email}</li>
        <img src={photoURL} alt={displayName} />
      </ul>

      <Signout />
    </>
  );
};

export default ProfStub;
