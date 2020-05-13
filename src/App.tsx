import React, { useState, useEffect, useGlobal } from 'reactn';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { apiClient } from './lib/axios';

import New from './pages/New';
import Output from './pages/Output';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Header from './components/Header';
import Auth from './components/Auth';
import Snackbar from './components/Snackbar';
import Loading from './components/Loading';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useGlobal('isLoading');
  const setIsLoggedIn = useGlobal('isLoggedIn')[1];

  useEffect(() => {
    apiClient.get('/logged_in').then((res) => {
      setIsLoggedIn(res.data.logged_in);
      setIsLoading(false);
    });
  }, []);

  if (isLoading === true) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/signup" render={() => <SignUp />} />
        <Auth>
          <Route path="/" component={Output} exact />
          <Route path="/new" component={New} exact />
        </Auth>
        <Redirect to="/" />
      </Switch>
      <Snackbar />
    </>
  );
};

export default App;
