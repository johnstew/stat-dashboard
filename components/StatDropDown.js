import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    maxWidth: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    width: '100%'
  }
});

class StatDropDown extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    selectValue: '',
    statData: [],
    rawData: null
  };

  static formatName(name) {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  static processData(data) {
    if (!data) return [];

    return data.map(cat => ({
      displayName: StatDropDown.formatName(cat.displayName),
      valueName: cat.displayName
    }));
  }

  handleChange(e) {
    const selectValue = e.target.value;
    this.setState({ selectValue });
    const selectedStat = this.state.statData.find(stat => stat.valueName === selectValue);
    this.props.handleStatUpdate(selectedStat);
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://statsapi.mlb.com/api/v1/leagueLeaderTypes');
      const json = await res.json();

      this.setState({ rawData: json, statData: StatDropDown.processData(json) });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel shrink>Stat</InputLabel>
          <Select value={this.state.selectValue} onChange={this.handleChange} displayEmpty name="stat">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.state.statData.map(({ displayName, valueName }) => (
              <MenuItem key={valueName} value={valueName}>
                {displayName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select a Stat Category</FormHelperText>
        </FormControl>
      </Paper>
    );
  }
}

export default withStyles(styles)(StatDropDown);
