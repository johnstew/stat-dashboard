import React, { Component } from 'react';
import App from '../components/App';
import StatDropDown from '../components/StatDropDown';
import StatCard from '../components/StatCard';
import StatContainer from '../components/StatContainer';
import shortid from 'shortid';

export default class Index extends Component {
  static getInitialProps({ query: { dashboard } }) {
    return { dashboard };
  }

  render() {
    return (
      <div className="app">
        <style global jsx>{`
          html,
          body {
            background: #e2e2e2;
            margin: 0;
            padding: 0;
          }
        `}</style>
        <App initDashboard={this.props.dashboard}>
          {({ handleStatUpdate, statCards }) => (
            <React.Fragment>
              <StatDropDown handleStatUpdate={handleStatUpdate} />
              <StatContainer>
                {statCards.map(cardData => (
                  <StatCard key={shortid.generate()} cardData={cardData} />
                ))}
              </StatContainer>
            </React.Fragment>
          )}
        </App>
      </div>
    );
  }
}
