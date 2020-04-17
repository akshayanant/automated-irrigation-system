import React, { Component } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class SensorInstallModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensor_name: "",
      min_value: 0.0,
      max_value: 0.0,
    };
    this.handleChangeSensorName = this.handleChangeSensorName.bind(this);
    this.handleChangeMinValue = this.handleChangeMinValue.bind(this);
    this.handleChangeMaxValue = this.handleChangeMaxValue.bind(this);
    this.handleInstall = this.handleInstall.bind(this);
  }

  handleChangeSensorName = (event) => {
    this.setState({ sensor_name: event.target.value });
  };

  handleChangeMinValue = (event) => {
    this.setState({ min_value: parseFloat(event.target.value) });
  };
  handleChangeMaxValue = (event) => {
    this.setState({ max_value: parseFloat(event.target.value) });
  };

  handleInstall = () => {
    this.props.startInstallation(this.state);
  };

  render() {
    const modal = this.props.modal;
    return (
      <Modal isOpen={modal}>
        <ModalHeader>
          <h5>Sensor Details</h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>SensorName</Label>
              <Input
                onChange={this.handleChangeSensorName}
                placeholder="SensorName"
              ></Input>
              <Label>Minimum Value</Label>
              <Input
                type="number"
                onChange={this.handleChangeMinValue}
                placeholder="Minimum Value"
              ></Input>
              <Label>Maximum Value</Label>
              <Input
                type="number"
                onChange={this.handleChangeMaxValue}
                placeholder="Maximum Value"
              ></Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.props.cancelInstall}>Cancel</Button>
          <Button onClick={this.handleInstall}>Install</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default SensorInstallModal;
