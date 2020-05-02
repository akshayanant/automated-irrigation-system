package com.cse564.project.automatedirrigationsystemserver;

import com.cse564.project.automatedirrigationsystemserver.dao.SensorsRepository;
import com.cse564.project.automatedirrigationsystemserver.models.Actuator;
import com.cse564.project.automatedirrigationsystemserver.models.HeartBeatData;
import com.cse564.project.automatedirrigationsystemserver.models.Sensor;
import com.cse564.project.automatedirrigationsystemserver.resources.ActionTypes;
import com.cse564.project.automatedirrigationsystemserver.services.SensorControlService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Random;

@SpringBootTest
class AutomatedIrrigationSystemServerApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	private SensorControlService service;

	@Autowired
	private SensorsRepository repository;

	private static final int ID = new Random().nextInt();


	@Test
	public void testGetSensors(){
		List<Sensor> sensors = service.getSensors();
		assert sensors.size()>0;
	}

	@Test
	public void testAddSensor(){
		Sensor sensor =new Sensor(ID,"Test",0,1);
		Sensor result = service.addSensor(sensor);
		assert result!=null;
		service.deleteSensor(result.getSensor_id());
	}

	@Test
	public void testDeleteSensor(){
		Sensor sensor =new Sensor(ID,"Test",0,1);
		Sensor result = service.addSensor(sensor);
		service.deleteSensor(result.getSensor_id());
	}

	@Test
	public void testHeartBeatNOAction(){
		Sensor sensor =new Sensor(ID,"Test",10,20);
		Sensor result = service.addSensor(sensor);
		Actuator actuator = service.heartBeat(new HeartBeatData(result.getSensor_id(), 15));
		assert actuator.getAction().equals(ActionTypes.NO_ACTION);
		service.deleteSensor(result.getSensor_id());
	}

	@Test
	public void testHeartBeatIncreaseAction(){
		Sensor sensor =new Sensor(ID,"Test",10,20);
		Sensor result = service.addSensor(sensor);
		Actuator actuator = service.heartBeat(new HeartBeatData(result.getSensor_id(), 5));
		assert actuator.getAction().equals(ActionTypes.INCREASE);
		service.deleteSensor(result.getSensor_id());
	}

	@Test
	public void testHeartBeatDecreaseAction(){
		Sensor sensor =new Sensor(ID,"Test",10,20);
		Sensor result = service.addSensor(sensor);
		Actuator actuator = service.heartBeat(new HeartBeatData(result.getSensor_id(), 25));
		assert actuator.getAction().equals(ActionTypes.DECREASE);
		service.deleteSensor(result.getSensor_id());
	}

	@Test
	public void testHeartBeatLowBoundNOAction(){
		Sensor sensor =new Sensor(ID,"Test",10,20);
		Sensor result = service.addSensor(sensor);
		Actuator actuator = service.heartBeat(new HeartBeatData(result.getSensor_id(), 10));
		assert actuator.getAction().equals(ActionTypes.NO_ACTION);
		service.deleteSensor(result.getSensor_id());
	}
	@Test
	public void testHeartBeatUpperBoundNOAction(){
		Sensor sensor =new Sensor(ID,"Test",10,20);
		Sensor result = service.addSensor(sensor);
		Actuator actuator = service.heartBeat(new HeartBeatData(result.getSensor_id(), 20));
		assert actuator.getAction().equals(ActionTypes.NO_ACTION);
		service.deleteSensor(result.getSensor_id());
	}

	@Test
	public void testHeartBeatLowBoundIncreaseAction(){
		Sensor sensor =new Sensor(ID,"Test",10,20);
		Sensor result = service.addSensor(sensor);
		Actuator actuator = service.heartBeat(new HeartBeatData(result.getSensor_id(), 9.5));
		assert actuator.getAction().equals(ActionTypes.INCREASE);
		service.deleteSensor(result.getSensor_id());
	}

	@Test
	public void testHeartBeatUpperBoundDecreaseAction(){
		Sensor sensor =new Sensor(ID,"Test",10,20);
		Sensor result = service.addSensor(sensor);
		Actuator actuator = service.heartBeat(new HeartBeatData(result.getSensor_id(), 20.5));
		assert actuator.getAction().equals(ActionTypes.DECREASE);
		service.deleteSensor(result.getSensor_id());
	}





}
