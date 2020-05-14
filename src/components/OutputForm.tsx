import React, { useState, FC } from 'react';
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

import { PartWithMenu, Menu } from '../pages/Output';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      margin: 'auto',
      marginBottom: theme.spacing(8),
      backgroundColor: theme.palette.background.default,
    },
  })
);

type OutputFormProps = {
  partWithMenus: PartWithMenu[];
};

const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => {
  return <ListItem button component="a" {...props} />;
};

const OutputForm: FC<OutputFormProps> = ({ partWithMenus }) => {
  const classes = useStyles();
  const [targetPart, setTargetPart] = useState('');
  const [count, setCount] = useState(1);
  const [outputMenus, setOutputMenus] = useState<string[]>([]);

  const randomSelect = (array: Menu[], num: number) => {
    // 元の配列を削除しないように複製する
    let copiedArray = [...array];
    let newArray = [];

    while (newArray.length < num && copiedArray.length > 0) {
      const rand = Math.floor(Math.random() * copiedArray.length);
      newArray.push(copiedArray[rand].name);
      copiedArray.splice(rand, 1);
    }

    return newArray;
  };

  const partNames: string[] = [];
  partWithMenus.forEach((partWithMenu) => {
    partNames.push(partWithMenu.name);
  });

  const handleChangePartSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTargetPart(event.target.value as string);
  };

  const handleChangeCountSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCount(event.target.value as number);
  };

  const handleClickButton = () => {
    // partが空だとエラーになるので一旦早期return
    if (targetPart === '') {
      return;
    }

    const targetPartWithMenu = partWithMenus.find((partWithMenu) => {
      return partWithMenu.name === targetPart;
    });
    if (targetPartWithMenu == null) {
      return;
    }
    setOutputMenus(randomSelect(targetPartWithMenu.menus, count));
  };

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">部位</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={targetPart}
          onChange={handleChangePartSelect}
          label="部位"
        >
          {partNames.map((part, i) => {
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
    </>
  );
};

export default OutputForm;
