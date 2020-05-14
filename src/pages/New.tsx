import React, { FC, useState, useEffect } from 'react';
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
import Loading from '../components/Loading';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(5),
    },
    heading: {
      marginBottom: theme.spacing(3),
    },
    partForm: {
      textAlign: 'center',
    },
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
  const [isLoading, setIsLoading] = useState(true);
  const [parts, setParts] = useState([]);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(SnackbarSeverity.SUCCESS);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    apiClient.get('/parts').then((res) => {
      debugger;
      setParts(res.data);
      setIsLoading(false);
    });
  }, []);

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
        setIsOpenSnackbar(true);
        setSnackbarSeverity(SnackbarSeverity.SUCCESS);
        setSnackbarMessage(res.data.message);
      })
      .catch((error) => {
        setIsOpenSnackbar(true);
        setSnackbarSeverity(SnackbarSeverity.ERROR);
        setSnackbarMessage('部位の作成に失敗しました');
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <Typography component="h2" variant="h4" align="center" className={classes.heading}>
        部位追加
      </Typography>
      <form
        className={classes.partForm}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleClickSubmitBtn)}
      >
        <TextField
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
