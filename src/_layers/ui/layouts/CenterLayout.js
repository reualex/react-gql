import React from 'react';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: props => props.withBottomOffset && theme.components.bottomNav.height,
  },
}));

export function CenterLayout({ children, withBottomOffset = false, ...rest }) {
  const classes = useStyles({ withBottomOffset });

  return (
    <Box
      className={classes.root}
      display="flex"
      height="100%"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      flexGrow={1}
      {...rest}
    >
      {children}
    </Box>
  );
}
