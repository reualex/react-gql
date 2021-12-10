import React from 'react';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    background: '#fff',
    maxWidth: '850px',
    margin: '0px auto',
    boxShadow: 'rgb(0 0 0 / 16%) 0px 12px 14px, rgb(0 0 0 / 12%) 0px 0px 1px',
  },
}));

export function RootWrapper({ children, ...rest }) {
  const classes = useStyles();

  return (
    <Box className={classes.root} {...rest}>
      {children}
    </Box>
  );
}
