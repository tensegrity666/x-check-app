/* eslint-disable no-console */
import { firebase } from '@firebase/app';
import '@firebase/auth';
import firebaseConfig from './firebase-config';

firebase.default.initializeApp(firebaseConfig);
const provider = new firebase.auth.GithubAuthProvider();

const githubAuth = async () => {
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    return result.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(errorCode, errorMessage);
  }
};

const signOut = async () => {
  try {
    await firebase.auth().signOut();
    return console.log('You signed out');
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(errorCode, errorMessage);
  }
};

export { signOut, githubAuth };
