package com.cse564.project.automatedirrigationsystemserver.controller;

import com.cse564.project.automatedirrigationsystemserver.models.Actuator;
import com.cse564.project.automatedirrigationsystemserver.models.HeartBeatData;
import com.cse564.project.automatedirrigationsystemserver.models.Sensor;
import com.cse564.project.automatedirrigationsystemserver.resources.Store;
import com.cse564.project.automatedirrigationsystemserver.services.SensorControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Akshay Hegde on 4/7/2020.
 */

@RestController
@RequestMapping(path = Store.HOME_EXT)
@CrossOrigin(origins = "*")
public class AutomatedIrrigationSystemController {
    @Autowired
    private SensorControlService sensorControlService;

    @GetMapping(path = Store.GET_SENSORS)
    public List<Sensor> getSensors() {
        return sensorControlService.getSensors();
    }

    @PostMapping(path = Store.ADD_SENSOR)
    public Sensor addSensor(@RequestBody Sensor sensor) {
        return sensorControlService.addSensor(sensor);
    }

    @PostMapping(path = Store.DELETE_SENSOR)
    public void deleteSensor(Integer sensor_id) {
        sensorControlService.deleteSensor(sensor_id);
    }

    @PostMapping(path = Store.HEART_BEAT)
    public Actuator heartBeat(@RequestBody HeartBeatData heartBeatData){
        return sensorControlService.heartBeat(heartBeatData);
    }




}
