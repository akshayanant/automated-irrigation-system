import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Badge,
  Modal,
  Button,
  CardFooter,
} from "reactstrap";

class Sensor extends Component {
  render() {
    const sensor = this.props.sensor;

    return (
      <Card className="sensor-card">
        <CardHeader>
          <h4>{sensor.sensor_name}</h4>
        </CardHeader>
        <CardBody>
          <div>
            <Badge>
              <h6>Min Value : </h6>
            </Badge>

            <Badge>
              <h6>{sensor.min_value}</h6>
            </Badge>
          </div>
          <div>
            <Badge>
              <h6>Max Value : </h6>
            </Badge>
            <Badge>
              <h6>{sensor.max_value}</h6>
            </Badge>
          </div>
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
    );
  }
}

export default Sensor;
