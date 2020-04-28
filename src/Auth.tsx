import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { SnackbarSeverity } from './App';

type Props = {
  isLoggedIn: null | boolean;
  setIsOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackbarSeverity: React.Dispatch<React.SetStateAction<SnackbarSeverity>>;
};

const Auth: FC<Props> = ({
  isLoggedIn,
  children,
  setIsOpenSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  if (isLoggedIn === false) {
    setIsOpenSnackbar(true);
    setSnackbarSeverity(SnackbarSeverity.INFO);
    setSnackbarMessage('ログインしてください');
  }
  return <React.Fragment>{isLoggedIn ? children : <Redirect to={'/login'} />}</React.Fragment>;
};

export default Auth;
