import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Copyright: FC = () => {
  return (
    <Box mt={10}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © Torena '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default Copyright;
