import { actionTypes } from '../constants';

const initialUser = {
  isAuthenticated: false,
  uid: null,
  githubId: null,
  screenName: null,
  roles: [],
  isRoleSelected: false,
  email: null,
  displayName: null,
  photoURL: null,
};

const loginReducer = (state = initialUser, { type, payload }) => {
  const { LOGIN, ADD_ROLE, LOAD_FROM_LOCAL_STORAGE, SIGN_OUT } = actionTypes;
  const rolesArr = ['author', 'student', 'supervisor'];

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
        roles: [rolesArr[payload]],
        isRoleSelected: true,
      };

    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        uid: null,
        githubId: null,
        isRoleSelected: false,
        email: null,
        displayName: null,
        photoURL: null,
        roles: [],
      };

    default:
      return state;
  }
};

export default loginReducer;
