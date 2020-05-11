import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

// TODO: データをAPIから取得するように置き換える
import { menuData } from '../menuData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(5),
    },
    heading: {
      marginBottom: theme.spacing(3),
    },
    enterBtn: {
      marginTop: theme.spacing(3.5),
      marginLeft: theme.spacing(3),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    listRoot: {
      width: '100%',
      maxWidth: 360,
      marginTop: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
    },
  })
);

const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => {
  return <ListItem button component="a" {...props} />;
};

const Output = () => {
  const classes = useStyles();
  const [part, setPart] = useState('');
  const [count, setCount] = useState(1);
  const [outputMenus, setOutputMenus] = useState<string[]>([]);

  const parts = Object.keys(menuData);

  const randomSelect = (array: string[], num: number) => {
    // 複製せずに元の配列の要素が削除されるため
    let copiedArray = [...array];
    let newArray = [];

    while (newArray.length < num && copiedArray.length > 0) {
      // 配列からランダムな要素を選ぶ
      const rand = Math.floor(Math.random() * copiedArray.length);
      // 選んだ要素を別の配列に登録する
      newArray.push(copiedArray[rand]);
      // もとの配列からは削除する
      copiedArray.splice(rand, 1);
    }

    return newArray;
  };

  const handleChangePartSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPart(event.target.value as string);
  };

  const handleChangeCountSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCount(event.target.value as number);
  };

  const handleClickButton = () => {
    // partが空だとエラーになるので一旦早期return
    if (part === '') {
      return;
    }
    setOutputMenus(randomSelect(menuData[part], count));
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <Typography component="h1" variant="h4" align="center" className={classes.heading}>
        メニュー出力
      </Typography>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">部位</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={part}
          onChange={handleChangePartSelect}
          label="部位"
        >
          {parts.map((part, i) => {
            return (
              <MenuItem value={part} key={i}>
                {part}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">種目数</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={count}
          onChange={handleChangeCountSelect}
          label="種目数"
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickButton}
        className={classes.enterBtn}
      >
        決定
      </Button>

      <div className={classes.listRoot}>
        <List component="nav" aria-label="menus">
          {outputMenus.map((menu, i) => {
            return (
              <React.Fragment key={i + 100}>
                <ListItemLink
                  href={`https://www.youtube.com/results?search_query=${menu}`}
                  target="_blank"
                >
                  <ListItemText primary={menu} />
                </ListItemLink>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </div>
    </Container>
  );
};

export default Output;
