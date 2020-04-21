using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend_AutoIrrigation.Models
{
    public class Sensor
    {
        public int Id { get; set; }
        public string SensorName { get; set; }
        public int SensorMinValue { get; set; }
        public int SensorMaxValue { get; set; }

    }
}