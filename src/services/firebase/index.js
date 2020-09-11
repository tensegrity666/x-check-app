/* eslint-disable no-console */
import { firebase } from '@firebase/app';
import '@firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.default.initializeApp(firebaseConfig);
const provider = new firebase.auth.GithubAuthProvider();

const githubAuth = () => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => result.user)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(errorCode, errorMessage);
    });
};

const signOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => console.log('You signed out'))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(errorCode, errorMessage);
    });
};

export { signOut, githubAuth };
