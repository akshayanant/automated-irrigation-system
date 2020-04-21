package com.cse564.project.automatedirrigationsystemserver.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by Akshay Hegde on 4/18/2020.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HeartBeatData {
    private int sensor_id;
    private double cur_value;

    public int getSensor_id() {
        return sensor_id;
    }

    public double getCur_value() {
        return cur_value;
    }
}


