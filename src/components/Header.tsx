import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

type HeaderProps = {
  isLoggedIn: null | boolean;
  handleClickLogout: () => void;
};

const Header: FC<HeaderProps> = ({ isLoggedIn, handleClickLogout }) => {
  const classes = useStyles();

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
                <Link to="/" className={classes.text}>
                  メニュー出力
                </Link>
              </Button>
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
