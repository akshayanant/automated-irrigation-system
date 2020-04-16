import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

class SensorControl extends Component {
  render() {
    const sensor = this.props.sensor;
    return (
      <Card>
        <CardHeader>
          <h4>{sensor.sensor_name}</h4>
        </CardHeader>
        <CardBody></CardBody>
      </Card>
    );
  }
}

export default SensorControl;
