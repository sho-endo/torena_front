import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { apiClient } from '../lib/axios';
import { SnackbarSeverity } from '../constants';
import Snackbar from '../components/Snackbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(5),
    },
    heading: {
      marginBottom: theme.spacing(3),
    },
    partForm: {},
    addPartBtn: {
      marginTop: theme.spacing(4.5),
      marginLeft: theme.spacing(3),
    },
  })
);

type PartFormData = {
  name: string;
};

const New: FC = () => {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(SnackbarSeverity.SUCCESS);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const classes = useStyles();

  const { handleSubmit, register, errors, reset } = useForm<PartFormData>();

  const handleClickSubmitBtn = (data: PartFormData) => {
    apiClient
      .post('/parts', {
        part: {
          name: data.name,
        },
      })
      .then((res) => {
        reset({ name: '' });
        // res.data.partで追加した部位の情報取れる
        setIsOpenSnackbar(true);
        setSnackbarSeverity(SnackbarSeverity.SUCCESS);
        setSnackbarMessage('部位を作成しました');
      })
      .catch((error) => {
        setIsOpenSnackbar(true);
        setSnackbarSeverity(SnackbarSeverity.ERROR);
        setSnackbarMessage('部位の作成に失敗しました');
      });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <Typography component="h2" variant="h4" align="center" className={classes.heading}>
        部位追加
        <form
          className=""
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleClickSubmitBtn)}
        >
          <TextField
            className={classes.partForm}
            variant="outlined"
            margin="normal"
            required
            name="name"
            label="部位名"
            type="text"
            id="name"
            inputRef={register({
              required: '部位名は必ず入力してください',
              maxLength: {
                value: 30,
                message: '部位名は30文字以内で入力してください',
              },
            })}
            error={!!errors.name}
            helperText={!!errors.name && errors.name.message}
          />
          <Button type="submit" variant="contained" color="primary" className={classes.addPartBtn}>
            追加
          </Button>
        </form>
      </Typography>
      <Snackbar
        isOpenSnackbar={isOpenSnackbar}
        setIsOpenSnackbar={setIsOpenSnackbar}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
    </Container>
  );
};

export default New;
