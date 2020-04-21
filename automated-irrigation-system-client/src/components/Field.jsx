import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import Sensor from "./Sensor";
import SensorInstallModal from "./SensorInstallModal";

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const modal = this.props.modal;
    const sensorsMarkUp = this.props.sensors.map((sensor) => {
      return (
        <Sensor
          key={sensor.sensor_id}
          sensor={sensor}
          uninstallSensor={(id) => this.props.uninstallSensor(id)}
          heartBeat={(id, value) => this.props.heartBeat(id, value)}
        />
      );
    });
    return (
      <div className="field-body">
        <h3>Field</h3>
        <div className="sensors-collection ">{sensorsMarkUp}</div>
        <SensorInstallModal
          modal={modal}
          cancelInstall={this.props.cancelInstall}
          startInstallation={this.props.startInstallation}
        />
        <Button onClick={this.props.installSensor} color="success">
          Install Sensor
        </Button>
      </div>
    );
  }
}

export default Field;
