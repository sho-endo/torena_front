import React, { useState, useEffect, FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Loading from '../components/Loading';
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
      marginBottom: theme.spacing(10),
      overflow: 'auto',
    },
    formControl: {
      margin: 'auto',
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    selectFormWrapper: {
      textAlign: 'center',
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

  const [isLoading, setIsLoading] = useState(true);
  const [partWithMenus, setPartWithMenus] = useState<PartWithMenu[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    apiClient
      .get('parts?include_menus=true')
      .then((res) => {
        setPartWithMenus(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        // TODO: エラーハンドリング
        console.log(err);
      });
  }, []);

  const parts: Part[] = [];
  partWithMenus.forEach((partWithMenu) => {
    const part: Part = {
      id: partWithMenu.id,
      name: partWithMenu.name,
    };
    parts.push(part);
  });

  const handleCilckPartDeleteIcon = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e.currentTarget.id);
  };

  const handleChangeSelectMenu = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const targetPart = partWithMenus.find((partWithMenu) => {
      return partWithMenu.id === e.target.value;
    });

    if (targetPart == null) {
      return;
    }

    setMenus(targetPart.menus);
  };

  const handleCilckMenuDeleteIcon = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e.currentTarget.id);
  };

  if (isLoading) {
    return <Loading />;
  }

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
              <ListItemSecondaryAction
                id={`${part.id}`}
                onClick={(e) => handleCilckPartDeleteIcon(e)}
              >
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <Typography component="h1" variant="h4" align="center" className={classes.heading}>
        メニュー一覧
      </Typography>
      <div className={classes.selectFormWrapper}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="menu-select-label">部位</InputLabel>
          <Select defaultValue="" onChange={(e) => handleChangeSelectMenu(e)}>
            {parts.map((part) => {
              return (
                <MenuItem value={part.id} key={part.id}>
                  {part.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <List className={classes.listRoot}>
        {menus.map((menu, i) => {
          return (
            <ListItem divider={true} key={i}>
              <ListItemText primary={menu.name} />
              <ListItemSecondaryAction
                id={`${menu.id}`}
                onClick={(e) => handleCilckMenuDeleteIcon(e)}
              >
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
