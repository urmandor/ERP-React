import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Grid, Segment, Table, Header, Loader } from 'semantic-ui-react';

class CurrentInventory extends React.Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.sortedContracts = this.sortedContracts.bind(this);
    this.state = {
      column: 'contractNumber',
      // data: [],
      direction: 'ascending',
    };
  }

  handleSort = clickedColumn => () => {
    const { column, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: 'ascending',
      });
      return;
    }

    this.setState({
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  sortedContracts = () => {
    const { column, direction } = this.state;
    const { contracts } = this.props;
    const data = contracts.sort((a, b) => {
      if (direction === 'ascending') {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    return data;
  };

  render() {
    const { contracts } = this.props;
    const { column, direction } = this.state;

    return (
      <Grid columns={1}>
        <Grid.Column>
          <Segment style={{ minHeight: 500 }}>
            <React.Fragment>
              <Header color="teal" size="large">
                Current Inventory Report
              </Header>
              <Loader active={contracts.loading}>Loading</Loader>
              {contracts.loading || (
                <Table celled selectable sortable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell
                        onClick={this.handleSort('contractNumber')}
                        sorted={column === 'contractNumber' ? direction : null}
                      >
                        Contract Number
                      </Table.HeaderCell>

                      <Table.HeaderCell
                        onClick={this.handleSort('weftCount')}
                        sorted={column === 'weftCount' ? direction : null}
                      >
                        Inventory Quantity (lbs)
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        onClick={this.handleSort('wrapBeam')}
                        sorted={column === 'wrapBeam' ? direction : null}
                      >
                        Warp Beam
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        onClick={this.handleSort('weftCount')}
                        sorted={column === 'weftCount' ? direction : null}
                      >
                        Weft
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        onClick={this.handleSort('deliveryDate')}
                        sorted={column === 'deliveryDate' ? direction : null}
                      >
                        Date
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.sortedContracts().map((val, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell>{val.contractNumber}</Table.Cell>
                          <Table.Cell>{val.weftCount}</Table.Cell>
                          <Table.Cell>{val.wrapBeam}</Table.Cell>
                          <Table.Cell>{val.weftCount}</Table.Cell>
                          <Table.Cell>{val.deliveryDate}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              )}
            </React.Fragment>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { contracts } = state;
  if (!contracts.loading) {
    const data = contracts.items.map(val => {
      const { contractNumber, wrapBeam, weftCount, deliveryDate } = val;
      return {
        contractNumber,
        wrapBeam,
        weftCount,
        deliveryDate,
      };
    });
    return {
      contracts: data,
    };
  }
  return {
    contracts,
  };
}

const connectedCurrentInventory = connect(mapStateToProps)(CurrentInventory);
export { connectedCurrentInventory as CurrentInventoryPage };
