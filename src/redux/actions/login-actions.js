import { actionTypes } from '../constants';

const { LOGIN, ADD_ROLE, LOAD_FROM_LOCAL_STORAGE, SIGN_OUT } = actionTypes;

const getUserInfo = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

const addUserRole = (payload) => {
  return {
    type: ADD_ROLE,
    payload,
  };
};

const loadFromLocalStorage = (payload) => {
  return {
    type: LOAD_FROM_LOCAL_STORAGE,
    payload,
  };
};

const signOutAndClearLocalStorage = () => {
  return {
    type: SIGN_OUT,
  };
};

export {
  getUserInfo,
  addUserRole,
  loadFromLocalStorage,
  signOutAndClearLocalStorage,
};
