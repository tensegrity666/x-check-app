import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import Login from './login';

import { githubAuth } from '../../services/firebase';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

import UserApi from '../../services/rest-api/user-api';

const LoginContainer = () => {
  const api = new UserApi();

  const { dispatch } = store;
  const { getUserInfo, addUserRole } = bindActionCreators(actions, dispatch);

  const [userRole, setUserRole] = useState(null);
  const handleRoleAdd = (value) => {
    setUserRole(value);
    addUserRole(value);
  };

  const { isRoleSelected, roles } = useSelector(
    ({ loginReducer }) => loginReducer
  );

  const handleLogin = async () => {
    try {
      if (!isRoleSelected) {
        return;
      }
      const userInfo = await githubAuth();
      getUserInfo(userInfo);

      const newState = store.getState().loginReducer;
      const { uid, displayName, email, screenName } = newState;

      api.createUser(uid, displayName, screenName, email, roles);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Login
      handleLogin={handleLogin}
      handleRoleAdd={handleRoleAdd}
      userRole={userRole}
    />
  );
};

export default LoginContainer;
