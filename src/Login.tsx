import React, { FC } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Torena '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type LoginProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

type LoginFormData = {
  email: string;
  password: string;
};

const Login: FC<LoginProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const classes = useStyles();

  const history = useHistory();

  const { handleSubmit, register, errors } = useForm<LoginFormData>();

  const handleOnSubmit = (data: LoginFormData) => {
    const { email, password } = data;
    debugger;

    axios
      .post(
        `${process.env.REACT_APP_API_HOST}/login`,
        {
          session: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log('login success', res);
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch((error) => {
        console.log('login error', error);
      });
  };

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
              LOGIN
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit(handleOnSubmit)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={register({
                  required: 'メールアドレスは必ず入力してください',
                  pattern: {
                    value: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/,
                    message: 'メールアドレスは正しい形式で入力してください',
                  },
                })}
                error={!!errors.email}
                helperText={!!errors.email && errors.email.message}
              />
              <TextField
                variant="outlined"
                margin="normal"
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
                helperText={!!errors.password && errors.password.message}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                ログイン
              </Button>
              <Grid container justify="center">
                {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
                <Grid item>
                  <Link href="#" variant="body2">
                    {'アカウントをお持ちでない方はこちら'}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )}
    </React.Fragment>
  );
};

export default Login;
