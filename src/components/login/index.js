import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import Login from './login';

import githubAuth from '../../services/firebase';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

import UserApi from '../../services/rest-api/user-api';

const LoginContainer = () => {
  const api = new UserApi();

  const { dispatch } = store;
  const { getUserInfo, addUserRole } = bindActionCreators(actions, dispatch);

  const { isRoleSelected, roles } = useSelector(
    ({ loginReducer }) => loginReducer
  );

  const [userRole, setUserRole] = useState(null);
  const handleRoleAdd = (value) => {
    setUserRole(value);
    addUserRole(value);
  };

  const handleLogin = async () => {
    try {
      if (!isRoleSelected) {
        return;
      }
      const userInfo = await githubAuth();

      getUserInfo(userInfo);

      const newState = store.getState().loginReducer;
      const { uid, displayName, githubId, email, currentRole } = newState;

      api.createUser(uid, displayName, githubId, email, currentRole);

      localStorage.setItem('loggedInUser', JSON.stringify(newState));
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Login
      handleLogin={handleLogin}
      roles={roles}
      handleRoleAdd={handleRoleAdd}
      userRole={userRole}
    />
  );
};

export default LoginContainer;
