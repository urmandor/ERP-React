import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Grid, Segment, Label, Table, Header, Loader } from 'semantic-ui-react';

import { contractActions } from '../_actions';

const ContactTable = data => {
  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Contract Number</Table.HeaderCell>
          <Table.HeaderCell>Contract Name</Table.HeaderCell>
          <Table.HeaderCell>Delivery Date</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Quality</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Finish Good Metre</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((val, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>{val.contractNumber}</Table.Cell>
              <Table.Cell>{val.contractName}</Table.Cell>
              <Table.Cell>{val.deliveryDate}</Table.Cell>
              <Table.Cell>
                <Label color="green">{val.status}</Label>
              </Table.Cell>
              <Table.Cell>{`${val.wrapCount}*${val.weftCount} ${val.read}*${
                val.pick
              } ${val.width}"`}</Table.Cell>
              <Table.Cell>{val.wrapBeam}</Table.Cell>
              <Table.Cell>{val.weftQuantity}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

class ViewContracts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { contracts } = this.props;
    return (
      <Grid columns={1}>
        <Grid.Column>
          <Segment style={{ minHeight: 500 }}>
            <React.Fragment>
              <Header color="teal" size="large">
                View Contracts
              </Header>
              <Loader active={contracts.loading}>Loading</Loader>
              {contracts.loading ||
                (contracts.items && ContactTable(contracts.items))}
            </React.Fragment>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { contracts } = state;
  console.log('COMPONET: ', contracts);
  return {
    contracts,
  };
}

const connectedViewContracts = connect(mapStateToProps)(ViewContracts);
export { connectedViewContracts as ViewContractsPage };
