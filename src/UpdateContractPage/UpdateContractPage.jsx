import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { contractActions } from '../_actions';

import {
  Grid,
  Segment,
  Form,
  Container,
  Header,
  Message,
  Loader,
} from 'semantic-ui-react';

import { SegmentDivider } from '../_components/SegmentDivider';
import { InputWithUnits } from '../_components/InputWithUnits';

class UpdateContract extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contractNumber: undefined,
      contract: {
        contractName: '',
        deliveryDate: '',
        contractNumber: '',
        contractType: '',

        wrapCount: '',
        weftCount: '',
        read: '',
        pick: '',
        width: '',
        wrapBeam: '',
        weftQuantity: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleContractNumberChanged = this.handleContractNumberChanged.bind(
      this,
    );
  }

  handleContractNumberChanged(e, data) {
    const { contracts } = this.props;
    const contract = Object.assign(
      {},
      contracts.items.filter(val => val.contractNumber === data.value)[0],
    );
    this.setState({ contractNumber: data.value, contract });
  }

  handleChange(e, data) {
    const { name, value } = data;
    const { contract } = this.state;
    this.setState({
      contract: { ...contract, [name]: value },
      submitted: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { contract } = this.state;
    const { dispatch } = this.props;
    dispatch(contractActions.updateContract(contract));
  }

  render() {
    const { contract, submitted, contractNumber } = this.state;
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
      <Segment>
        <Container>
          <Header size="large" color="teal">
            Update Contract
          </Header>
          <Grid columns={1}>
            <Grid.Column>
              <Loader active={contracts.loading}>Loading</Loader>
              <Form onSubmit={this.handleSubmit}>
                {alert.type === 'alert-danger' && (
                  <Message negative content={alert.message} />
                )}
                {alert.type === 'alert-success' && (
                  <Message positive content={alert.message} />
                )}
                {/* <SegmentDivider heading="General Information" /> */}
                <Segment>
                  <Form.Select
                    label="Select Contract Number To Update"
                    // icon="address book"
                    // iconPosition="left"
                    placeholder="Contract Number"
                    name="contractNumber"
                    options={contractOptions}
                    value={contractNumber}
                    onChange={this.handleContractNumberChanged}
                  />
                </Segment>

                <SegmentDivider heading="Quality" padding />
                <Segment>
                  <Form.Group widths="equal">
                    <InputWithUnits
                      name="wrapCount"
                      type="number"
                      value={contract.wrapCount}
                      onChange={this.handleChange}
                      label="Wrap Count"
                      icon="clipboard check"
                      unit="inches"
                    />
                    <InputWithUnits
                      name="weftCount"
                      type="number"
                      value={contract.weftCount}
                      onChange={this.handleChange}
                      label="Weft Count"
                      icon="clipboard check"
                      unit="inches"
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <InputWithUnits
                      name="read"
                      type="number"
                      value={contract.read}
                      onChange={this.handleChange}
                      label="Read"
                      icon="clipboard check"
                      unit="inches"
                    />
                    <InputWithUnits
                      name="pick"
                      type="number"
                      value={contract.pick}
                      onChange={this.handleChange}
                      label="Pick"
                      icon="clipboard check"
                      unit="inches"
                    />
                    <InputWithUnits
                      name="width"
                      type="number"
                      value={contract.width}
                      onChange={this.handleChange}
                      label="Width"
                      icon="clipboard check"
                      unit="inches"
                    />
                  </Form.Group>
                </Segment>

                <SegmentDivider heading="Quantity" padding />
                <Segment>
                  <Form.Group widths="equal">
                    <InputWithUnits
                      name="wrapBeam"
                      type="number"
                      value={contract.wrapBeam}
                      onChange={this.handleChange}
                      label="Wrap Beam"
                      icon="boxes"
                      unit="metres"
                    />
                    <InputWithUnits
                      name="weftQuantity"
                      type="number"
                      value={contract.weftQuantity}
                      onChange={this.handleChange}
                      label="Weft Quantity"
                      icon="boxes"
                      unit="pounds"
                    />
                  </Form.Group>
                </Segment>
                <Form.Button>Update Contract</Form.Button>
              </Form>
            </Grid.Column>
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

const connectedUpdateContract = connect(mapStateToProps)(UpdateContract);
export { connectedUpdateContract as UpdateContractPage };
