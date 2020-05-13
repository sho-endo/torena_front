import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { apiClient } from '../lib/axios';

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

export interface PartWithMenu {
  id: number;
  name: string;
  menus: string[];
}

const Output = () => {
  const classes = useStyles();

  const [formCount, setFormCount] = useState(1);
  const [partWithMenus, setPartWithMenus] = useState<PartWithMenu[]>([]);

  const handleClickAddBtn = () => {
    setFormCount(formCount + 1);
  };

  useEffect(() => {
    apiClient
      .get('parts?include_menus=true')
      .then((res) => {
        setPartWithMenus(res.data);
      })
      .catch((err) => {
        // TODO: エラーハンドリング
        console.log(err);
      });
  }, []);

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <Typography component="h1" variant="h4" align="center" className={classes.heading}>
        メニュー出力
      </Typography>
      {[...Array(formCount)].map((_, i) => {
        return <OutputForm key={i} partWithMenus={partWithMenus} />;
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
