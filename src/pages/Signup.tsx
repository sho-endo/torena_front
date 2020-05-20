import React, { FC } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { apiClient } from '../lib/axios';

import { SnackbarSeverity } from '../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    linkText: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  })
);

type SignupProps = {
  isLoggedIn: null | boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<null | boolean>>;
  setIsOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackbarSeverity: React.Dispatch<React.SetStateAction<SnackbarSeverity>>;
};

type SignupFormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const Signup: FC<SignupProps> = ({
  isLoggedIn,
  setIsLoggedIn,
  setIsOpenSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();

  const history = useHistory();

  const { handleSubmit, register, errors } = useForm<SignupFormData>();

  const handleOnSubmit = (data: SignupFormData) => {
    const { email, password, passwordConfirmation } = data;

    apiClient
      .post('users', {
        user: {
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
      })
      .then((res) => {
        console.log('signup success', res);
        setIsLoggedIn(true);
        history.push('/');
        setIsOpenSnackbar(true);
        setSnackbarSeverity(SnackbarSeverity.SUCCESS);
        setSnackbarMessage('ユーザーを登録しました');
      })
      .catch((error) => {
        console.log('signup error', error);
        setIsOpenSnackbar(true);
        setSnackbarSeverity(SnackbarSeverity.ERROR);
        // TODO: サーバーから受け取ったエラーメッセージを表示する
        setSnackbarMessage('ユーザーの作成に失敗しました');
      });
  };

  if (isLoggedIn) {
    history.push('/');
    setIsOpenSnackbar(true);
    setSnackbarSeverity(SnackbarSeverity.WARNING);
    setSnackbarMessage('すでにログイン済みです');
  }

  return (
    <React.Fragment>
      {isLoggedIn ? (
        <Redirect to={'/'} />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              新規登録
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit(handleOnSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    inputRef={register({
                      required: 'メールアドレスは必ず入力してください',
                      pattern: {
                        value: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/,
                        message: 'メールアドレスは正しい形式で入力してください',
                      },
                    })}
                    error={!!errors.email}
                    helperText={!!errors.email ? errors.email.message : ' '}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    inputRef={register({
                      required: 'パスワードは必ず入力してください',
                      minLength: {
                        value: 8,
                        message: 'パスワードは8文字以上で入力してください',
                      },
                    })}
                    error={!!errors.password}
                    helperText={
                      !!errors.password
                        ? errors.password.message
                        : 'パスワードは8文字以上で入力してください'
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="passwordConfirmation"
                    label="Password Confirmation"
                    type="password"
                    id="passwordConfirmation"
                    autoComplete="current-password"
                    inputRef={register({
                      required: 'パスワード（確認）は必ず入力してください',
                      minLength: {
                        value: 8,
                        message: 'パスワード（確認）は8文字以上で入力してください',
                      },
                    })}
                    error={!!errors.passwordConfirmation}
                    helperText={
                      !!errors.passwordConfirmation
                        ? errors.passwordConfirmation.message
                        : 'パスワード（確認）は8文字以上で入力してください'
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                新規登録
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Link to="/login" className={classes.linkText}>
                    {'ログインはこちら'}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      )}
    </React.Fragment>
  );
};

export default Signup;
