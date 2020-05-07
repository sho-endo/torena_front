import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '300px',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

const Loading = () => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function tick() {
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <CircularProgress variant="determinate" value={progress} size={100} />
    </div>
  );
};

export default Loading;
