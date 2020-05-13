import React, { useGlobal } from 'reactn';
import { Link, useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { apiClient } from '../lib/axios';

import { SnackbarSeverity } from '../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    titleWrapper: {
      flexGrow: 1,
    },
    text: {
      color: '#fff',
      textDecoration: 'none',
    },
  })
);

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useGlobal('isLoggedIn');
  const setIsOpenSnackbar = useGlobal('isOpenSnackbar')[1];
  const setSnackbarSeverity = useGlobal('snackbarSeverity')[1];
  const setSnackbarMessage = useGlobal('snackbarMessage')[1];

  const classes = useStyles();
  const history = useHistory();

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.titleWrapper}>
            <Link to="/" className={classes.text}>
              Torena
            </Link>
          </Typography>
          {isLoggedIn ? (
            <>
              <Button color="inherit">
                <Link to="/new" className={classes.text}>
                  メニュー追加
                </Link>
              </Button>
              <Button color="inherit" onClick={handleClickLogout}>
                ログアウト
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link to="/signup" className={classes.text}>
                  新規登録
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/login" className={classes.text}>
                  ログイン
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
