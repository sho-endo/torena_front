import React, { FC, useState, useEffect } from 'react';
import { Switch, Route, Redirect, Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import Home from './Home';
import About from './About';
import Login from './Login';
import SignUp from './Signup';
import Auth from './Auth';

const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);

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
      })
      .catch((err) => {
        console.log('Logout falied', err);
      });
  };

  return (
    <React.Fragment>
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

      <Switch>
        <Route
          exact
          path="/login"
          render={() => <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          exact
          path="/signup"
          render={() => <SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Auth isLoggedIn={isLoggedIn}>
          <Route path="/about" component={About} exact />
          <Route path="/" component={Home} />
        </Auth>
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
  );
};

export default App;
