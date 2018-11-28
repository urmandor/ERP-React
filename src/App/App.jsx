import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions, contractActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { DashboardPage } from '../DashboardPage';
import { ViewContractsPage } from '../ViewContractsPage';
import { AddContractPage } from '../AddContractPage';
import { UpdateContractPage } from '../UpdateContractPage';
import { ContractTracingPage } from '../ContractTracingPage';
import { CurrentInventoryPage } from '../CurrentInventoryPage';
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

  componentDidMount() {
    const { dispatch } = this.props;
    localStorage.getItem('user') && dispatch(contractActions.viewContracts());
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
            path="/add-contract"
            component={AddContractPage}
          />
          <PrivateRoute
            exact
            path="/update-contract"
            component={UpdateContractPage}
          />
          <PrivateRoute
            exact
            path="/contract-tracing"
            component={ContractTracingPage}
          />
          <PrivateRoute
            exact
            path="/current-inventory"
            component={CurrentInventoryPage}
          />
          <PrivateRoute
            exact
            path="/inventory-history"
            component={CurrentInventoryPage}
          />
          <PrivateRoute
            exact
            path="/inventory-tracing"
            component={ContractTracingPage}
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
