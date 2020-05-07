import React, { FC, useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Header from './components/Header';
import Auth from './components/Auth';
import Snackbar from './components/Snackbar';
import Loading from './components/Loading';

export enum SnackbarSeverity {
  ERROR = 'error',
  WARINNG = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(SnackbarSeverity.ERROR);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/logged_in`, { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(res.data.logged_in);
      });
  }, []);

  const handleClickLogout = () => {
    axios
      .delete(`${process.env.REACT_APP_API_HOST}/logout`, { withCredentials: true })
      .then((res) => {
        console.log('Logout success!');
        setIsLoggedIn(false);
        history.push('/login');
        setIsOpenSnackbar(true);
        setSnackbarMessage('ログアウトしました');
        setSnackbarSeverity(SnackbarSeverity.SUCCESS);
      })
      .catch((err) => {
        console.log('Logout falied', err);
      });
  };

  return (
    <React.Fragment>
      <Header isLoggedIn={isLoggedIn} handleClickLogout={handleClickLogout} />

      {isLoggedIn === null ? (
        <Loading />
      ) : (
        <React.Fragment>
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
              <Switch>
                <Route path="/about" component={About} exact />
                <Route path="/" component={Home} exact />
              </Switch>
            </Auth>
            <Redirect to="/" />
          </Switch>
          <Snackbar
            isOpenSnackbar={isOpenSnackbar}
            setIsOpenSnackbar={setIsOpenSnackbar}
            snackbarSeverity={snackbarSeverity}
            snackbarMessage={snackbarMessage}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default App;
