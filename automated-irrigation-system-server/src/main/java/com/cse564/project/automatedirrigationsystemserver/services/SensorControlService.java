package com.cse564.project.automatedirrigationsystemserver.services;

import com.cse564.project.automatedirrigationsystemserver.dao.SensorsRepository;
import com.cse564.project.automatedirrigationsystemserver.models.Actuator;
import com.cse564.project.automatedirrigationsystemserver.models.HeartBeatData;
import com.cse564.project.automatedirrigationsystemserver.models.Sensor;
import com.cse564.project.automatedirrigationsystemserver.resources.ActionTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Created by Akshay Hegde on 4/7/2020.
 */
@Service
public class SensorControlService {

    @Autowired
    private SensorsRepository sensorsRepository;

    public Sensor addSensor(Sensor sensor) {
        return sensorsRepository.save(sensor);
    }

    public void deleteSensor(int sensorID) {
        sensorsRepository.deleteById(sensorID);
    }

    public List<Sensor> getSensors() {
        return (List<Sensor>) sensorsRepository.findAll();
    }

    public Actuator heartBeat(HeartBeatData heartBeatData) {
        int id = heartBeatData.getSensor_id();
        double value = heartBeatData.getCur_value();
        String action = ActionTypes.NO_ACTION;
        Optional<Sensor> sensor = sensorsRepository.findById(id);
        if (sensor.isPresent()) {
            double min = sensor.get().getMin_value();
            double max = sensor.get().getMax_value();
            if (value < min) {
                action = ActionTypes.INCREASE;
            } else if (value > max) {
                action = ActionTypes.DECREASE;
            }
        }
        return new Actuator(id, action);
    }
}
