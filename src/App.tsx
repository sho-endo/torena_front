import React, { FC, useState, useEffect } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import Home from './Home';
import About from './About';
import Login from './Login';
import SignUp from './Signup';

const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/logged_in`, { withCredentials: true })
      .then(res => {
        setIsLoggedIn(res.data.logged_in);
      });
  }, []);

  return (
    <React.Fragment>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            { isLoggedIn ? 'ログイン中です' : 'ログインしてません' }
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path='/about' component={About} exact />
        <Route
          exact
          path='/login'
          render={() => (
            <Login setIsLoggedIn={setIsLoggedIn}/>
          )}
        />
        <Route
          exact
          path='/signup'
          render={() => (
            <SignUp setIsLoggedIn={setIsLoggedIn}/>
          )}
        />
        <Route path='/' component={Home} />
        <Redirect to='/' />
      </Switch>
    </React.Fragment>
  )
}

export default App;
