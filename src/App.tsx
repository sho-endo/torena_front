import React, { FC, useState, useEffect } from 'react';
import { Switch, Route, Redirect, Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import Home from './Home';
import About from './About';
import Login from './Login';
import SignUp from './Signup';
import Auth from './Auth';
import Snackbar from './Snackbar';

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

  const handleLogoutClick = () => {
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
      {/* TODO: ヘッダーは別コンポーネントに切り出す */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <button onClick={handleLogoutClick}>ログアウト</button>
          </li>
          <li>{isLoggedIn ? 'ログイン中です' : 'ログインしてません'}</li>
        </ul>
      </nav>

      {
        isLoggedIn === null
          ? '読み込み中' // TODO: ローディング用のコンポーネントに差し替え
          :
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
                  <Route path="/about" component={About} exact/>
                  <Route path="/" component={Home} exact/>
                </Switch>
              </Auth>
              <Redirect to="/"/>
            </Switch>
            <Snackbar
              isOpenSnackbar={isOpenSnackbar}
              setIsOpenSnackbar={setIsOpenSnackbar}
              snackbarSeverity={snackbarSeverity}
              snackbarMessage={snackbarMessage}
            />
          </React.Fragment>
      }
    </React.Fragment>
  );
};

export default App;
