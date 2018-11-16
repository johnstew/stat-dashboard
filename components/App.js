import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  app: {
    display: 'block',
    background: '#e2e2e2'
  },
  saveFab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 14,
    right: theme.spacing.unit * 4
  },
  deleteFab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleStatUpdate = this.handleStatUpdate.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  state = {
    statCards: this.props.initDashboard ? [...this.props.initDashboard] : [],
    dashboardId: ''
  };

  static processStatData(data, stat) {
    if (!data) return [];
    const { leagueLeaders } = data;

    if (!leagueLeaders) {
      return [];
    }

    const leaders = leagueLeaders.reduce((fd, leagueLeader) => {
      const { statGroup } = leagueLeader;
      leagueLeader.leaders.forEach(leader => {
        fd.push(Object.assign({}, leader, { statGroup }));
      });
      return fd;
    }, []);

    return {
      stat,
      leaders
    };
  }

  async handleStatUpdate(stat) {
    try {
      const res = await fetch(
        `https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=${stat.valueName}&leaderGameTypes=R`
      );
      const json = await res.json();
      this.setState({ statData: json, statCards: [...this.state.statCards, App.processStatData(json, stat)] });
    } catch (error) {
      console.error(error);
    }
  }

  async handleSave() {
    const { statCards } = this.state;
    try {
      const res = await fetch('/dashboard', {
        method: 'post',
        body: JSON.stringify(statCards),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });
      const json = await res.json();
      window.history.replaceState({}, '', `/dashboard/${json.id}`);
      this.setState({ dashboardId: json.id });
    } catch (error) {
      console.error(error);
    }
  }

  async handleDelete() {
    try {
      await fetch(`/dashboard`, {
        method: 'delete',
        body: JSON.stringify({ id: this.state.dashboardId }),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });
      this.setState({ statCards: [], dashboardId: '' }, () => {
        window.history.replaceState({}, '', '/');
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { statCards } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        {this.props.children({
          handleStatUpdate: this.handleStatUpdate,
          statCards
        })}
        <Button variant="fab" color="primary" className={classes.saveFab} onClick={this.handleSave}>
          <SaveIcon />
        </Button>
        <Button variant="fab" color="secondary" className={classes.deleteFab} onClick={this.handleDelete}>
          <DeleteIcon />
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(App);
