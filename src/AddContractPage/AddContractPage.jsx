import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { contractActions } from '../_actions';

import {
  Grid,
  Segment,
  Label,
  Form,
  Container,
  Input,
  Header,
  Message,
  Divider,
} from 'semantic-ui-react';

import { SegmentDivider } from '../_components/SegmentDivider';
import { InputWithUnits } from '../_components/InputWithUnits';

class AddContract extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  handleChange(e, data) {
    const { name, value, type } = data;
    // console.log(data);
    let val = value;
    if (type === 'number') {
      val = Number(value);
    }
    this.setState({
      contract: { ...this.state.contract, [name]: val },
      submitted: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { contract } = this.state;
    const { dispatch } = this.props;
    dispatch(contractActions.addContract(contract));
  }

  render() {
    const { contract, submitted } = this.state;
    const contractTypes = [
      { key: 'o', value: 'overhead', text: 'Overhead' },
      { key: 'c', value: 'conversion', text: 'Conversion' },
    ];
    const { alert } = this.props;
    return (
      <Segment>
        <Container>
          <Header size="large" color="teal">
            Add Contract
          </Header>
          <Grid columns={1}>
            <Grid.Column>
              <Form onSubmit={this.handleSubmit}>
                {alert.type === 'alert-danger' && (
                  <Message negative content={alert.message} />
                )}
                {alert.type === 'alert-success' && (
                  <Message positive content={alert.message} />
                )}
                <SegmentDivider heading="General Information" />
                <Segment>
                  <Form.Group widths="equal">
                    <Form.Input
                      label="Contract Name"
                      icon="user"
                      iconPosition="left"
                      placeholder="Contract Name"
                      name="contractName"
                      value={contract.contractName}
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      label="Contract Number"
                      icon="address book"
                      iconPosition="left"
                      type="number"
                      placeholder="Contract Number"
                      name="contractNumber"
                      value={contract.contractNumber}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Select
                      label="Contract Type"
                      placeholder="Contract Type"
                      name="contractType"
                      options={contractTypes}
                      onChange={this.handleChange}
                      value={contract.contractType}
                    />
                    <Form.Input
                      label="Delivery Date"
                      icon="calendar alternate"
                      iconPosition="left"
                      placeholder="Delivery Date"
                      name="deliveryDate"
                      type="date"
                      value={contract.deliveryDate}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
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
                <Form.Button>Add Contract</Form.Button>
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

const connectedAddContract = connect(mapStateToProps)(AddContract);
export { connectedAddContract as AddContractPage };
