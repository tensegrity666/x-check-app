import React from 'react';
import { bindActionCreators } from 'redux';
import Login from './login';

import githubAuth from '../../services/firebase';

import store from '../../redux/store';
import * as actions from '../../redux/actions';

const LoginContainer = () => {
  const { dispatch } = store;
  const { getUserInfo } = bindActionCreators(actions, dispatch);

  const handleLogin = async () => {
    try {
      const userInfo = await githubAuth();
      getUserInfo(userInfo);
    } catch (error) {
      throw new Error(error);
    }
  };

  return <Login handleLogin={handleLogin} />;
};

export default LoginContainer;
