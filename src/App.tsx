import React, { FC, useState, useEffect } from 'react';
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

import { SnackbarSeverity } from './constants';

const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(SnackbarSeverity.ERROR);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const history = useHistory();

  useEffect(() => {
    apiClient.get('/logged_in').then((res) => {
      setIsLoggedIn(res.data.logged_in);
    });
  }, []);

  const handleClickLogout = () => {
    apiClient
      .delete('/logout')
      .then((res) => {
        console.log('Logout success!');
        setIsLoggedIn(false);
        history.push('/login');
        setIsOpenSnackbar(true);
        setSnackbarMessage('ログアウトしました');
        setSnackbarSeverity(SnackbarSeverity.SUCCESS);
      })
      .catch((err) => {
        console.log('Logout failed', err);
      });
  };

  // TODO: isLoadingみたいなstateの方がわかりやすそう
  if (isLoggedIn === null) {
    return <Loading />;
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleClickLogout={handleClickLogout} />
      <Switch>
        <Route
          exact
          path="/login"
          render={() => (
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setIsOpenSnackbar={setIsOpenSnackbar}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarSeverity={setSnackbarSeverity}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={() => (
            <SignUp
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setIsOpenSnackbar={setIsOpenSnackbar}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarSeverity={setSnackbarSeverity}
            />
          )}
        />
        <Auth
          isLoggedIn={isLoggedIn}
          setIsOpenSnackbar={setIsOpenSnackbar}
          setSnackbarSeverity={setSnackbarSeverity}
          setSnackbarMessage={setSnackbarMessage}
        >
          <Route path="/" component={Output} exact />
          <Route path="/new" component={New} exact />
        </Auth>
        <Redirect to="/" />
      </Switch>
      <Snackbar
        isOpenSnackbar={isOpenSnackbar}
        setIsOpenSnackbar={setIsOpenSnackbar}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
};

export default App;
