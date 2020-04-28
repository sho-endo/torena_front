import React, { FC, SyntheticEvent } from 'react';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { SnackbarSeverity } from './App';

type alertProps = {
  severity: string;
  onClose: (event: SyntheticEvent<any, Event>, reason: any) => void;
  children: React.ReactNode;
};

type snackbarProps = {
  isOpenSnackbar: boolean;
  setIsOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  snackbarSeverity: SnackbarSeverity;
  snackbarMessage: string;
};

function Alert<alertProps>(props: alertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbar: FC<snackbarProps> = ({
  isOpenSnackbar,
  setIsOpenSnackbar,
  snackbarSeverity,
  snackbarMessage,
}) => {
  const classes = useStyles();
  const handleClose = (event: React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpenSnackbar(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={isOpenSnackbar} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbar;
