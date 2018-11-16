import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    width: '85%',
    margin: 'auto'
  }
});

function StatContainer({ classes, children }) {
  return <div className={classes.container}>{children}</div>;
}

export default withStyles(styles)(StatContainer);
