import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { MainLayout } from '../_components/MainLayout';
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory';

import { Grid, Segment, Label, Table, Progress } from 'semantic-ui-react';

const ContactProgressTable = () => {
  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Contract No.</Table.HeaderCell>
          <Table.HeaderCell>Contract Name</Table.HeaderCell>
          <Table.HeaderCell>Completion</Table.HeaderCell>
          <Table.HeaderCell>Progress</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.apply(null, Array(5)).map((val, index) => {
          return (
            <React.Fragment key={index}>
              <Table.Row>
                <Table.Cell>101</Table.Cell>
                <Table.Cell>Muhammad Textile</Table.Cell>
                <Table.Cell>
                  <Label circular color="green">
                    38%
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  <Progress
                    percent={38}
                    indicating
                    style={{ marginBottom: 0 }}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>701</Table.Cell>
                <Table.Cell>Farhan Textile</Table.Cell>
                <Table.Cell>
                  <Label circular color="green">
                    11%
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  <Progress
                    percent={11}
                    indicating
                    style={{ marginBottom: 0 }}
                  />
                </Table.Cell>
              </Table.Row>
            </React.Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
};

class Dashboard extends React.Component {
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
      <Grid columns={2}>
        <Grid.Column>
          <Segment>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine data={data} />
            </VictoryChart>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <ContactProgressTable />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <ContactProgressTable />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <ContactProgressTable />
          </Segment>
        </Grid.Column>
      </Grid>
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

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as DashboardPage };
