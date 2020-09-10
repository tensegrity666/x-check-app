import { actionTypes } from '../constants';

const initialUser = {
  githubId: null,
  isAuthenticated: false,
  roles: [],
  currentRole: null,
  isRoleSelected: false,
  email: null,
  displayName: null,
  photoURL: null,
  uid: null,
  screenName: null,
};

const loginReducer = (state = initialUser, { type, payload }) => {
  const { LOGIN, LOGOUT } = actionTypes;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        githubId: payload.githubId,
        isAuthenticated: true,
        roles: [],
        currentRole: payload.currentRole,
        email: payload.email,
        displayName: payload.displayName,
        photoURL: payload.photoURL,
        uid: payload.uid,
        screenName: payload.screenName,
      };

    case LOGOUT:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default loginReducer;
