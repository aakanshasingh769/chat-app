import React, { useCallback } from 'react';
import { Button, Drawer, Icon, Alert } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import Dashboard from '.';
import { auth } from '../../misc/firebase';
import { isOfflineForDatabase } from '../../context/profile.context';
import { database } from '../../misc/firebase';

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediaQuery('(max-width : 992px)');

  const onSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        Alert.info('Signed out', 4000);
        close();
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  }, [close]);

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
