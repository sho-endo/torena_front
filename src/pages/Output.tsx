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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    listRoot: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => {
  return <ListItem button component="a" {...props} />;
};

const Output = () => {
  const classes = useStyles();
  const [part, setPart] = useState('');
  const [count, setCount] = useState('');

  const handleChangePartSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPart(event.target.value as string);
  };

  const handleChangeCountSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCount(event.target.value as string);
  };

  return (
    <React.Fragment>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">部位</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={part}
          onChange={handleChangePartSelect}
          label="部位"
        >
          <MenuItem value="">
            <em></em>
          </MenuItem>
          <MenuItem value="胸">胸</MenuItem>
          <MenuItem value="肩">肩</MenuItem>
          <MenuItem value="二頭">二頭</MenuItem>
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
          <MenuItem value=""></MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary">
        決定
      </Button>
      <div className={classes.listRoot}>
        <List component="nav" aria-label="menus">
          <Divider />
          <ListItemLink
            href="https://www.youtube.com/results?search_query=インクラインダンベルフライ"
            target="_blank"
          >
            <ListItemText primary="インクラインダンベルフライ" />
          </ListItemLink>
          <Divider />
          <ListItemLink
            href="https://www.youtube.com/results?search_query=ベンチプレス"
            target="_blank"
          >
            <ListItemText primary="ベンチプレス" />
          </ListItemLink>
          <Divider />
        </List>
      </div>
    </React.Fragment>
  );
};

export default Output;
