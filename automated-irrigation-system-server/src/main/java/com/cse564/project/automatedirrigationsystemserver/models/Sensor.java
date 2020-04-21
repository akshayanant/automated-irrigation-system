package com.cse564.project.automatedirrigationsystemserver.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Akshay Hegde on 4/7/2020.
 */

@Entity
@Table(name = "Sensors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Sensor {
    @Id
    @GeneratedValue
    private int sensor_id;
    private String sensor_name;
    private double min_value;
    private double max_value;

    public double getMax_value() {
        return max_value;
    }

    public double getMin_value() {
        return min_value;
    }
}


