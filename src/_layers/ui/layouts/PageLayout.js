import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  content: ({ isContentScrollable, isContentRelative }) => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: isContentScrollable ? 'auto' : 'hidden',
    overflowX: 'hidden',
    position: isContentRelative ? 'relative' : 'static',
    '-webkit-overflow-scrolling': 'touch',
  }),
  footer: {
    flexShrink: 0,
  },
}));

export const PageLayout = ({
  content,
  header,
  footer,
  contentRef,
  wrapperComponent,
  isContentScrollable = true,
  isContentRelative = false,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Grid
      component={wrapperComponent}
      container
      className={classes.container}
      direction="column"
      alignItems="stretch"
      wrap="nowrap"
      {...rest}
    >
      {header && (
        <Grid item className={classes.header}>
          {header}
        </Grid>
      )}
      <Grid item className={classes.content} ref={contentRef}>
        {content}
      </Grid>
      {footer && (
        <Grid item className={classes.footer}>
          {footer}
        </Grid>
      )}
    </Grid>
  );
};
