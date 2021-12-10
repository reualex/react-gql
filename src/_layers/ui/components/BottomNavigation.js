import {
  BottomNavigation as BottomNavigationBase,
  BottomNavigationAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { matchPath, Link as RouterLink, useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingBottom: `env(safe-area-inset-bottom)`,
  },
  action: {
    color: theme.palette.text.primary,

    '&.MuiBottomNavigationAction-root': {
      padding: '6px 12px',
    },
  },
}));

const getActivePath = (navList = [], location) => {
  const activeItem = navList.find(el => matchPath(el.path, { path: location.pathname }));
  return activeItem?.path;
};

export const BottomNavigation = ({ navList = [] }) => {
  const classes = useStyles();
  const location = useLocation();
  const activePath = getActivePath(navList, location);

  return (
    <BottomNavigationBase className={classes.container} value={activePath}>
      {navList.map(navItem => {
        const Icon = navItem.icon;

        return (
          <BottomNavigationAction
            key={navItem.path}
            className={classes.action}
            component={RouterLink}
            to={navItem.path}
            value={navItem.path}
            label={navItem.label}
            icon={<Icon />}
            disableRipple
          />
        );
      })}
    </BottomNavigationBase>
  );
};
