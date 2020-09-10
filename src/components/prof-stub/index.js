import React from 'react';
import { useSelector } from 'react-redux';

const ProfStub = () => {
  const {
    githubId,
    isAuthenticated,
    currentRole,
    isRoleSelected,
    email,
    displayName,
    photoURL,
    uid,
    screenName,
  } = useSelector(({ loginReducer }) => loginReducer);

  return (
    <ul>
      <li>{uid}</li>
      <li>{githubId}</li>
      <li>{isAuthenticated}</li>
      <li>{currentRole}</li>
      <li>{isRoleSelected}</li>
      <li>{email}</li>
      <li>{displayName}</li>
      <img src={photoURL} alt={displayName} />
      <li>{screenName}</li>
    </ul>
  );
};

export default ProfStub;
