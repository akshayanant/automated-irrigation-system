import React, { Component } from "react";
import { Navbar } from "reactstrap";

import Simulator from "./Simulator";
import Field from "./Field";
import axios from "axios";
import Sensor from "./Sensor";
import { INCREASE, NO_ACTION, INCR_VALUE, DECREASE } from "../util/store";

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
    this.handleSimulations = this.handleSimulations.bind(this);
    this.handleHeartBeat = this.handleHeartBeat.bind(this);
  }
  componentDidMount() {
    axios.get("/getsensors").then((res) => {
      console.log(res.data);
      let sensors = [];
      res.data.forEach((sensor) => {
        sensors.push({
          sensor_id: sensor.sensor_id,
          sensor_name: sensor.sensor_name,
          value: (sensor.min_value + sensor.max_value) / 2.0,
          action: NO_ACTION,
        });
      });
      this.setState({ sensors: sensors });
    });

    setInterval(() => {
      let sensors = [];
      this.state.sensors.forEach((sensor) => {
        if (sensor.action === INCREASE) {
          sensors.push({
            ...sensor,
            value: sensor.value + INCR_VALUE,
          });
        } else if (sensor.action === DECREASE) {
          sensors.push({
            ...sensor,
            value: sensor.value - INCR_VALUE,
          });
        } else {
          sensors.push({
            ...sensor,
            action: NO_ACTION,
          });
        }
      });
      this.setState({ sensors: sensors });
    }, 1000);
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
      const sensor = res.data;
      sensors.push({
        sensor_id: sensor.sensor_id,
        sensor_name: sensor.sensor_name,
        value: (sensor.min_value + sensor.max_value) / 2.0,
        action: NO_ACTION,
      });
      this.setState({ sensors: sensors });
    });
    this.setState({ installSensorModal: false });
  };

  handleUninstall = (id) => {
    console.log(id);
    axios.post(`/deletesensor?sensor_id=${id}`).then(() => {
      let sensors = this.state.sensors.filter(
        (sensor) => sensor.sensor_id !== id
      );
      this.setState({ sensors: sensors });
    });
  };

  handleSimulations = (id, action) => {
    let sensors = [];
    const delta = action === "incr" ? 1 : -1;
    this.state.sensors.forEach((sensor) => {
      if (sensor.sensor_id === id) {
        const newSensor = { ...sensor, value: sensor.value + delta };
        sensors.push(newSensor);
      } else {
        sensors.push(sensor);
      }
    });
    this.setState({ sensors: sensors });
  };

  handleHeartBeat = (id, value) => {
    const hearBeatData = {
      sensor_id: id,
      cur_value: value,
    };
    axios.post("/heartbeat", hearBeatData).then((res) => {
      const actuator = res.data;
      let sensors = [];
      this.state.sensors.forEach((sensor) => {
        if (sensor.sensor_id === id) {
          sensors.push({
            ...sensor,
            action: actuator.action,
          });
        } else {
          sensors.push(sensor);
        }
      });
      this.setState({ sensors: sensors });
    });
  };

  render() {
    return (
      <div>
        <Navbar color="secondary">
          <h3 style={{ color: "white" }}>Automated Irrigation System</h3>
        </Navbar>
        <div className="container-body">
          <Simulator
            sensors={this.state.sensors}
            simulation={this.handleSimulations}
          />
          <Field
            sensors={this.state.sensors}
            modal={this.state.installSensorModal}
            installSensor={this.handleInstallSensor}
            cancelInstall={this.handleCancelInstall}
            startInstallation={this.handleStartInstallation}
            uninstallSensor={this.handleUninstall}
            heartBeat={this.handleHeartBeat}
          />
        </div>
      </div>
    );
  }
}

export default Container;
