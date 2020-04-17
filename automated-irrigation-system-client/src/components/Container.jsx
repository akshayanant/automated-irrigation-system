import React, { Component } from "react";
import { Navbar } from "reactstrap";

import Simulator from "./Simulator";
import Field from "./Field";
import axios from "axios";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensors: [],
      installSensorModal: false,
    };
    this.handleInstallSensor = this.handleInstallSensor.bind(this);
    this.handleCancelInstall = this.handleCancelInstall.bind(this);
    this.handleStartInstallation = this.handleStartInstallation.bind(this);
    this.handleUninstall = this.handleUninstall.bind(this);
  }
  componentDidMount() {
    axios.get("/getsensors").then((res) => {
      console.log(res.data);
      this.setState({ sensors: res.data });
    });
  }

  handleInstallSensor = () => {
    this.setState({ installSensorModal: true });
  };

  handleCancelInstall = () => {
    this.setState({ installSensorModal: false });
  };

  handleStartInstallation = (sensorDetails) => {
    console.log(sensorDetails);
    axios.post("/addsensor", sensorDetails).then((res) => {
      let sensors = this.state.sensors;
      sensors.push(res.data);
      this.setState({ sensors: sensors });
    });
    this.setState({ installSensorModal: false });
  };

  handleUninstall = (id) => {
    let sensors = this.state.sensors.filter(
      (sensor) => sensor.sensor_id === id
    );
    console.log(sensors[0]);
    axios.post(`/deletesensor`, sensors[0]).then(() => {
      sensors = [];
      sensors = this.state.sensors.filter((sensor) => sensor.sensor_id !== id);
      this.setState({ sensors: sensors });
    });
  };

  render() {
    return (
      <div>
        <Navbar color="light">
          <h5>Automated Irrigation System</h5>
        </Navbar>
        <div className="container-body">
          <Simulator sensors={this.state.sensors} />
          <Field
            sensors={this.state.sensors}
            modal={this.state.installSensorModal}
            installSensor={this.handleInstallSensor}
            cancelInstall={this.handleCancelInstall}
            startInstallation={this.handleStartInstallation}
            uninstallSensor={this.handleUninstall}
          />
        </div>
      </div>
    );
  }
}

export default Container;
