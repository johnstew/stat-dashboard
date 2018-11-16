import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import _isEmpty from 'lodash.isempty';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    width: 467,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  leader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  leaderName: {
    marginLeft: theme.spacing.unit * 2
  },
  statGroup: {
    textTransform: 'capitalize'
  }
});

function StatCard({ cardData, classes }) {
  if (_isEmpty(cardData)) return <span />;

  const { stat, leaders } = cardData;

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" gutterBottom>
        {stat.displayName}
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaders.map(leader => {
            return (
              <TableRow key={leader.person.id}>
                <TableCell>
                  <div className={classes.leader}>
                    <Avatar src={`https://content.mlb.com/images/headshots/current/60x60/${leader.person.id}.png`} />
                    <span className={classes.leaderName}>{leader.person.fullName}</span>
                  </div>
                </TableCell>
                <TableCell>{leader.value}</TableCell>
                <TableCell className={classes.statGroup}>{leader.statGroup}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(StatCard);
