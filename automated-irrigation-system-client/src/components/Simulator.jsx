import React, { Component } from "react";

import SensorControl from "./SensorControl";

class Simulator extends Component {
  render() {
    const sensorsMarkUp = this.props.sensors.map((sensor) => {
      return (
        <SensorControl
          key={sensor.sensor_id}
          sensor={sensor}
          simulation={(id, action) => this.props.simulation(id, action)}
        />
      );
    });
    return (
      <div className="simulator-body">
        <h3>Simulator</h3>
        {sensorsMarkUp}
      </div>
    );
  }
}

export default Simulator;
