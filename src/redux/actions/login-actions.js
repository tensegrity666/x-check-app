import { actionTypes } from '../constants';

const { LOGIN, ADD_ROLE, LOAD_FROM_LOCAL_STORAGE, SIGN_OUT } = actionTypes;

export const getUserInfo = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const addUserRole = (payload) => {
  return {
    type: ADD_ROLE,
    payload,
  };
};

export const loadFromLocalStorage = (payload) => {
  return {
    type: LOAD_FROM_LOCAL_STORAGE,
    payload,
  };
};

export const signOutAndClearLocalStorage = () => {
  return {
    type: SIGN_OUT,
  };
};
