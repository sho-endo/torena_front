import React, { useGlobal } from 'reactn';
import { Redirect } from 'react-router-dom';
import { SnackbarSeverity } from '../constants';

const Auth: React.FC = ({ children }) => {
  const isLoggedIn = useGlobal('isLoggedIn')[0];
  const setIsOpenSnackbar = useGlobal('isOpenSnackbar')[1];
  const setSnackbarSeverity = useGlobal('snackbarSeverity')[1];
  const setSnackbarMessage = useGlobal('snackbarMessage')[1];

  if (isLoggedIn === false) {
    setIsOpenSnackbar(true);
    setSnackbarSeverity(SnackbarSeverity.INFO);
    setSnackbarMessage('ログインしてください');
  }
  return <React.Fragment>{isLoggedIn ? children : <Redirect to={'/login'} />}</React.Fragment>;
};

export default Auth;
