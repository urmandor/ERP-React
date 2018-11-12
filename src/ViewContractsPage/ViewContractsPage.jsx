import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { MainLayout } from '../_components/MainLayout';
import { VictoryLine } from 'victory';

import { Grid, Segment, Label, Table, Progress } from 'semantic-ui-react';

const ContactTable = () => {
  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Contract Id</Table.HeaderCell>
          <Table.HeaderCell>Contract Name</Table.HeaderCell>
          <Table.HeaderCell>Delivery Date</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Quality</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Finish Good Metre</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.apply(null, Array(10)).map((val, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>101</Table.Cell>
              <Table.Cell>Muhammad Textile</Table.Cell>
              <Table.Cell>2016-04-28</Table.Cell>
              <Table.Cell>
                <Label color="green">Approved</Label>
              </Table.Cell>
              <Table.Cell>31*31 76*66 102''</Table.Cell>
              <Table.Cell>900lbs</Table.Cell>
              <Table.Cell>2600m</Table.Cell>
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
    const data = [
      { x: 1, y: 13000 },
      { x: 2, y: 16500 },
      { x: 3, y: 14250 },
      { x: 4, y: 19000 },
    ];

    return (
      <MainLayout>
        <Grid columns={1}>
          <Grid.Column>
            <Segment>{ContactTable()}</Segment>
          </Grid.Column>
        </Grid>
      </MainLayout>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication, tab } = state;
  const { user } = authentication;
  return {
    user,
    users,
    tab,
  };
}

const connectedViewContracts = connect(mapStateToProps)(ViewContracts);
export { connectedViewContracts as ViewContractsPage };
