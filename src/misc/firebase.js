import firebase from 'firebase/app;';

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
