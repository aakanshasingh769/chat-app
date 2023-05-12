import React, { createContext, useState, useContext, useEffect } from 'react';
import firebase from 'firebase/app';
import { auth, database, messaging } from '../misc/firebase';

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStatusRef;
    let tokenRefreshUnSub;

    const authUnSub = auth.onAuthStateChanged(async authObj => {
      if (authObj) {
        userStatusRef = database.ref(`/status/${authObj.uid} `);
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        userRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };

          setProfile(data);
          setIsLoading(false);
        });

        database.ref('.info/connected').on('value', snapshot => {
          // If we're not currently connected, don't do anything.
          if (!!snapshot.val() === false) {
            // !! added to convert it into a boolean completely
            return;
          }

          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusRef.set(isOnlineForDatabase);
            });
        });

        if (messaging) {
          try {
            const currentToken = await messaging.getToken();
            if (currentToken) {
              await database
                .ref(`/fcm_tokens/${currentToken}`)
                .set(authObj.uid);
            }
          } catch (err) {
            console.log('An error occurred while retrieving token. ', err);
          }

          tokenRefreshUnSub = messaging.onTokenRefresh(async () => {
            try {
              const currentToken = await messaging.getToken();
              if (currentToken) {
                await database
                  .ref(`/fcm_tokens/${currentToken}`)
                  .set(authObj.uid);
              }
            } catch (err) {
              console.log('An error occurred while retrieving token. ', err);
            }
          });
        }
      } else {
        if (userRef) {
          userRef.off();
        }

        if (userStatusRef) {
          userStatusRef.off();
        }

        if (tokenRefreshUnSub) {
          tokenRefreshUnSub();
        }

        database.ref('.info/connected').off();

        setProfile(null);
        setIsLoading(false);
      }
    });

    // Clean up function
    return () => {
      authUnSub();

      database.ref('.info/connected').off();

      if (userRef) {
        userRef.off();
      }

      if (tokenRefreshUnSub) {
        tokenRefreshUnSub();
      }

      if (userStatusRef) {
        userStatusRef.off();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
