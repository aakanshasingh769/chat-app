import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

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

export const messaging = firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.usePublicVapidKey(
    'BErQQf7N3wa9FkBfhFjgY0zPZu0AcBM8ggXujUWNC8Uoj633unkgDY1Jmsw4zsfHpN5qF7aTE0Iew-6P8a87t4U'
  );

  messaging.onMessage(data => {
    console.log(data);
  });
}
