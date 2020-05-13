import React, { useGlobal } from 'reactn';
import { Redirect } from 'react-router-dom';
import { SnackbarSeverity } from '../constants';

type AuthProps = {
  isLoggedIn: boolean;
};

const Auth: React.FC<AuthProps> = ({ isLoggedIn, children }) => {
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
