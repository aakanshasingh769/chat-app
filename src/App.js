import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';
import Home from './pages/Home/Index';
// import SignIn from './pages/SignIn';

import './styles/main.scss';

const SignIn = lazy(() => import('./pages/SignIn'));

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <Suspense fallback={<div>Loading...</div>}>
            <SignIn />
          </Suspense>
        </PublicRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
