import React, { FC, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
      marginBottom: theme.spacing(10),
    },
    addBtn: {
      marginTop: theme.spacing(4.5),
      marginLeft: theme.spacing(3),
    },
    menuForm: {
      textAlign: 'center',
    },
    formControl: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    menuSelectField: {
      verticalAlign: 'center',
    },
    menuTextField: {
      minWidth: 250,
    },
  })
);

type PartFormData = {
  name: string;
};

type MenuFormData = {
  name: string;
  partID: string;
};

type partData = {
  id: string;
  name: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
};

const New: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [parts, setParts] = useState<partData[]>([]);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(SnackbarSeverity.SUCCESS);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    apiClient.get('/parts').then((res) => {
      setParts(res.data);
      setIsLoading(false);
    });
  }, []);

  const classes = useStyles();

  // 分けて宣言しないと別フォームのバリデーションにならないので、一旦こうしている
  const { handleSubmit, register, errors, reset } = useForm<PartFormData>();
  const menuForm = useForm<MenuFormData>();

  const handleClickAddPartBtn = (data: PartFormData) => {
    apiClient
      .post('/parts', {
        part: {
          name: data.name,
        },
      })
      .then((res) => {
        reset({ name: '' });
        setParts([...parts, res.data.part]);
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

  const handleClickAddMenuBtn = (data: MenuFormData) => {
    const { partID, name } = data;
    apiClient
      .post(`/parts/${partID}/menus`, {
        menu: {
          name: name,
        },
      })
      .then((res) => {
        menuForm.reset({ name: '' });
        setIsOpenSnackbar(true);
        setSnackbarSeverity(SnackbarSeverity.SUCCESS);
        setSnackbarMessage(res.data.message);
      })
      .catch((error) => {
        setIsOpenSnackbar(true);
        setSnackbarSeverity(SnackbarSeverity.ERROR);
        setSnackbarMessage('メニューの作成に失敗しました');
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container component="main" maxWidth="xl" className={classes.root}>
      <CssBaseline />
      <Typography component="h2" variant="h4" align="center" className={classes.heading}>
        部位追加
      </Typography>
      <form
        className={classes.partForm}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleClickAddPartBtn)}
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
        <Button type="submit" variant="contained" color="primary" className={classes.addBtn}>
          追加
        </Button>
      </form>

      <Typography component="h2" variant="h4" align="center" className={classes.heading}>
        メニュー追加
      </Typography>
      <form
        className={classes.menuForm}
        noValidate
        autoComplete="off"
        onSubmit={menuForm.handleSubmit(handleClickAddMenuBtn)}
      >
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="menu-select-label">部位</InputLabel>
          <Controller
            as={
              <Select error={!!menuForm.errors.partID}>
                {parts.map((part) => {
                  return (
                    <MenuItem value={part.id} key={part.id}>
                      {part.name}
                    </MenuItem>
                  );
                })}
              </Select>
            }
            name="partID"
            defaultValue=""
            rules={{ required: '部位は必須です' }}
            control={menuForm.control}
          />
          <FormHelperText error={true}>
            {!!menuForm.errors.partID && menuForm.errors.partID.message}
          </FormHelperText>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          required
          name="name"
          label="メニュー名"
          type="text"
          id="name"
          className={classes.menuTextField}
          inputRef={menuForm.register({
            required: 'メニュー名は必ず入力してください',
            maxLength: {
              value: 50,
              message: 'メニュー名は50文字以内で入力してください',
            },
          })}
          error={!!menuForm.errors.name}
          helperText={!!menuForm.errors.name && menuForm.errors.name.message}
        />
        <Button type="submit" variant="contained" color="primary" className={classes.addBtn}>
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
