import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyBIP5mMroIje0Buv3CcnOSoglzAUZHahkk',
  authDomain: 'chat-web-app-d8d84.firebaseapp.com',
  databaseURL: 'https://chat-web-app-d8d84-default-rtdb.firebaseio.com',
  projectId: 'chat-web-app-d8d84',
  storageBucket: 'chat-web-app-d8d84.appspot.com',
  messagingSenderId: '192246585943',
  appId: '1:192246585943:web:a12dbfe729ce50ffe6e112',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
