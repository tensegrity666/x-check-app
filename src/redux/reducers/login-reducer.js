import { actionTypes } from '../constants';

const initialUser = {
  isAuthenticated: false,
  uid: null,
  githubId: null,
  screenName: null,
  roles: [],
  currentRole: null,
  isRoleSelected: false,
  email: null,
  displayName: null,
  photoURL: null,
};

const loginReducer = (state = initialUser, { type, payload }) => {
  const { LOGIN, ADD_ROLE, LOAD_FROM_LOCAL_STORAGE, SIGN_OUT } = actionTypes;
  const { roles } = state;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        uid: payload.uid,
        githubId: payload.email.substr(0, payload.email.indexOf('@')),
        email: payload.email,
        displayName: payload.displayName,
        screenName: payload.email.substr(0, payload.email.indexOf('@')),
        photoURL: payload.photoURL,
      };

    case ADD_ROLE:
      return {
        ...state,
        currentRole: roles[payload],
        isRoleSelected: true,
      };

    case LOAD_FROM_LOCAL_STORAGE:
      return {
        ...state,
        ...payload,
      };

    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        uid: null,
        githubId: null,
        currentRole: null,
        isRoleSelected: false,
        email: null,
        displayName: null,
        photoURL: null,
      };

    default:
      return state;
  }
};

export default loginReducer;
