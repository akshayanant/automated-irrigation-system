package com.cse564.project.automatedirrigationsystemserver.dao;

import com.cse564.project.automatedirrigationsystemserver.models.Sensor;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Akshay Hegde on 4/7/2020.
 */
public interface SensorsRepository extends CrudRepository<Sensor, Integer> {
}
