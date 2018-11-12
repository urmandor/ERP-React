import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { DashboardPage } from '../DashboardPage';
import { ViewContractsPage } from '../ViewContractsPage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <PrivateRoute exact path="/" component={DashboardPage} />
          <PrivateRoute
            exact
            path="/view-contracts"
            component={ViewContractsPage}
          />
          <PrivateRoute
            exact
            path="/contract-tracing"
            component={ViewContractsPage}
          />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </React.Fragment>
      </Router>
    );
  }
}

const connectedApp = connect()(App);
export { connectedApp as App };
