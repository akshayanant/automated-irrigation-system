import React, { Component } from "react";
import { Card, CardBody, CardHeader, Button } from "reactstrap";

class SensorControl extends Component {
  render() {
    const sensor = this.props.sensor;
    return (
      <Card className="sensor-control-card">
        <CardHeader>
          <h6>{sensor.sensor_name}</h6>
        </CardHeader>
        <CardBody>
          <div className="sensor-control-card-body">
            <div className="sensor-control-Buttons">
              <Button
                size="sm"
                color="primary"
                outline
                block
                onClick={() => this.props.simulation(sensor.sensor_id, "decr")}
              >
                -
              </Button>
            </div>
            <div className="sensor-control-Buttons">
              <Button
                size="sm"
                color="danger"
                outline
                block
                onClick={() => this.props.simulation(sensor.sensor_id, "incr")}
              >
                +
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default SensorControl;
