import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

type Props = {
  isLoggedIn: boolean;
};

const Auth: FC<Props> = ({ isLoggedIn, children }) => {
  return <React.Fragment>{isLoggedIn ? children : <Redirect to={'/login'} />}</React.Fragment>;
};

export default Auth;
