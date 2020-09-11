import { actionTypes } from '../constants';

const initialUser = {
  isAuthenticated: false,
  uid: null,
  githubId: null,
  roles: ['author', 'student', 'supervisor'],
  currentRole: null,
  isRoleSelected: false,
  email: null,
  displayName: null,
  photoURL: null,
};

const loginReducer = (state = initialUser, { type, payload }) => {
  const { LOGIN, LOGOUT, ADD_ROLE } = actionTypes;
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
        photoURL: payload.photoURL,
      };

    case ADD_ROLE:
      return {
        ...state,
        currentRole: roles[payload],
        isRoleSelected: true,
      };

    case LOGOUT:
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
