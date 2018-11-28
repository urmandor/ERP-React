import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { contractActions } from '../_actions';

import {
  Grid,
  Segment,
  Select,
  Container,
  Header,
  Message,
  Loader,
  Table,
  Label,
} from 'semantic-ui-react';

const ContactTable = data => {
  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Contract Number</Table.HeaderCell>
          <Table.HeaderCell>Contract Name</Table.HeaderCell>
          <Table.HeaderCell>Contract Type</Table.HeaderCell>
          <Table.HeaderCell>Delivery Date</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Quality</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Finish Good Metre</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {console.log(data)}
        {data.map((val, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>{val.contractNumber}</Table.Cell>
              <Table.Cell>{val.contractName}</Table.Cell>
              <Table.Cell>{val.contractType}</Table.Cell>
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

class ContractTracing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contractNumber: undefined,
    };

    this.handleContractNumberChanged = this.handleContractNumberChanged.bind(
      this,
    );
    this.filterContract = this.filterContract.bind(this);
  }

  filterContract(contractNumber) {
    const { contracts } = this.props;
    return !contracts.loading && contractNumber
      ? contracts.items.filter(val => val.contractNumber === contractNumber)
      : [];
  }

  handleContractNumberChanged(e, data) {
    const { contracts } = this.props;
    const contract = Object.assign(
      {},
      contracts.items.filter(val => val.contractNumber === data.value)[0],
    );
    this.setState({ contractNumber: data.value, contract });
  }

  render() {
    const { contractNumber } = this.state;
    const { contracts } = this.props;

    const contractOptions = Array.isArray(contracts.items)
      ? contracts.items.map(val => {
          return {
            key: val.contractNumber,
            value: val.contractNumber,
            text: `Contract #${val.contractNumber}`,
          };
        })
      : [];

    const { alert } = this.props;
    return (
      <Segment style={{ minHeight: 500 }}>
        <Container>
          <Header size="large" color="teal">
            Contract Tracing
          </Header>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <div style={{ float: 'right' }}>
                  <Select
                    label="Select Contract Number To Trace"
                    placeholder="Contract Number"
                    name="contractNumber"
                    options={contractOptions}
                    value={contractNumber}
                    onChange={this.handleContractNumberChanged}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Loader active={contracts.loading}>Loading</Loader>

                {alert.type === 'alert-danger' && (
                  <Message negative content={alert.message} />
                )}
                {alert.type === 'alert-success' && (
                  <Message positive content={alert.message} />
                )}
                {/* <Segment> */}
                {contractNumber ? (
                  ContactTable(this.filterContract(contractNumber))
                ) : (
                  <Message content="Select contract number from top right corner to start tracing" />
                )}
                {/* </Segment> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  const { contracts, alert } = state;
  return {
    alert,
    contracts,
  };
}

const connectedContractTracing = connect(mapStateToProps)(ContractTracing);
export { connectedContractTracing as ContractTracingPage };
