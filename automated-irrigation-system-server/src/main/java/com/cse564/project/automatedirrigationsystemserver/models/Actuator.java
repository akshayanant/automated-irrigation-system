package com.cse564.project.automatedirrigationsystemserver.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by Akshay Hegde on 4/18/2020.
 */

@Getter
@Setter
@NoArgsConstructor
public class Actuator {
    private int sensor_id;
    private String action;

    public Actuator(int sensor_id, String action) {
        this.sensor_id = sensor_id;
        this.action = action;
    }
}
