import React, { FC } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import Home from './Home';
import About from './About';

const App: FC = () => {
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
        </ul>
      </nav>
      <Switch>
        <Route path='/about' component={About} />
        <Route path='/' component={Home} />
        <Redirect to='/' />
      </Switch>
    </React.Fragment>
  )
}

export default App;
