import React, { useState, useEffect, FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { apiClient } from '../lib/axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(5),
    },
    heading: {
      marginBottom: theme.spacing(3),
    },
    listRoot: {
      width: '100%',
      maxHeight: 300,
      maxWidth: 400,
      margin: 'auto',
      overflow: 'auto',
    },
  })
);

interface Part {
  id: number;
  name: string;
}

interface Menu {
  id: number;
  name: string;
}

interface PartWithMenu {
  id: number;
  name: string;
  menus: Menu[];
}

const Index: FC = () => {
  const classes = useStyles();

  const [partWithMenus, setPartWithMenus] = useState<PartWithMenu[]>([]);

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

  const handleCilckDeleteIcon = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e.currentTarget.id);
  };

  const parts: Part[] = [];
  partWithMenus.forEach((partWithMenu) => {
    const part: Part = {
      id: partWithMenu.id,
      name: partWithMenu.name,
    };
    parts.push(part);
  });

  return (
    <Container component="main" maxWidth="xl" className={classes.root}>
      <CssBaseline />
      <Typography component="h1" variant="h4" align="center" className={classes.heading}>
        部位一覧
      </Typography>
      <List className={classes.listRoot}>
        {parts.map((part, i) => {
          return (
            <ListItem divider={true} key={i}>
              <ListItemText primary={part.name} />
              <ListItemSecondaryAction id={`${part.id}`} onClick={(e) => handleCilckDeleteIcon(e)}>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default Index;
