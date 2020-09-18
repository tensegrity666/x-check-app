import { bindActionCreators } from 'redux';
import store from '../store';
import * as actions from '../actions';

const stubUser = {
  uid: 1,
  githubId: 1,
  roles: ['author', 'student', 'supervisor'],
  currentRole: 'dffggg',
  isRoleSelected: true,
  email: '456',
  displayName: 'dfdffgds',
  photoURL: 'nughfghfgll',
};

describe('login reducer testing', () => {
  const { dispatch } = store;
  const {
    getUserInfo,
    addUserRole,
    signOutAndClearLocalStorage,
  } = bindActionCreators(actions, dispatch);
  const prevState = store.getState().loginReducer;
  let nextState;

  it('should change state after request', () => {
    getUserInfo(stubUser);

    afterEach(() => {
      nextState = store.getState().loginReducer;
      expect(nextState).not.toBe(prevState);
    });
  });

  it('should change user role', () => {
    addUserRole(1);
    nextState = store.getState().loginReducer;

    afterEach(() => {
      expect(nextState.roles.join('')).toBe('student');
    });
  });

  it('should reset state', () => {
    signOutAndClearLocalStorage();

    afterEach(() => {
      nextState = store.getState().loginReducer;
      expect(nextState.githubId).toBe(null);
      expect(nextState.displayName).toBe(null);
      expect(nextState.photoURL).toBe(null);
    });
  });
});
