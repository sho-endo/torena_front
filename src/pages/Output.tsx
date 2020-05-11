import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// TODO: データをAPIから取得するように置き換える
import { menuData } from '../menuData';
import OutputForm from '../components/OutputForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(5),
    },
    heading: {
      marginBottom: theme.spacing(3),
    },
    addIcon: {
      fontSize: '50px',
      cursor: 'pointer',
      display: 'block',
      margin: '30px auto 0',
    },
  })
);

const Output = () => {
  const classes = useStyles();

  const [formCount, setFormCount] = useState(1);

  const handleClickAddBtn = () => {
    setFormCount(formCount + 1);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <Typography component="h1" variant="h4" align="center" className={classes.heading}>
        メニュー出力
      </Typography>
      {[...Array(formCount)].map((_, i) => {
        return <OutputForm key={i} menuData={menuData} />;
      })}
      <AddCircleIcon
        color="primary"
        className={classes.addIcon}
        onClick={handleClickAddBtn}
      ></AddCircleIcon>
    </Container>
  );
};

export default Output;
