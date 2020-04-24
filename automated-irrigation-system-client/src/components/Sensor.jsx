import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Badge,
  Modal,
  Button,
  CardFooter,
  Spinner,
} from "reactstrap";

import { TIME_SLICE, INCREASE, DECREASE } from "./../util/store";

class Sensor extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.heartBeat(
        this.props.sensor.sensor_id,
        this.props.sensor.value
      );
    }, TIME_SLICE);
  }

  render() {
    const sensor = this.props.sensor;
    let changeMarkUp = <p></p>;
    if (sensor.action === INCREASE) {
      changeMarkUp = (
        <div>
          {" "}
          Increasing {"  "}
          <Spinner color="primary" />
        </div>
      );
    } else if (sensor.action === DECREASE) {
      changeMarkUp = (
        <div>
          {" "}
          Decreasing {"  "}
          <Spinner color="danger" />
        </div>
      );
    }

    return (
      <div className="sensor-card-container">
        <Card className="sensor-card">
          <CardHeader>
            <h6>{sensor.sensor_name}</h6>
          </CardHeader>
          <CardBody>
            <div>
              <Badge color="light">
                <h4>{sensor.value}</h4>
              </Badge>
            </div>
            {changeMarkUp}
          </CardBody>
          <CardFooter>
            <Button
              size="sm"
              color="danger"
              outline
              onClick={() => {
                this.props.uninstallSensor(this.props.sensor.sensor_id);
              }}
            >
              Uninstall
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default Sensor;
