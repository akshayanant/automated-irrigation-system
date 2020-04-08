package com.cse564.project.automatedirrigationsystemserver.services;

import com.cse564.project.automatedirrigationsystemserver.dao.SensorsRepository;
import com.cse564.project.automatedirrigationsystemserver.models.Sensor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
