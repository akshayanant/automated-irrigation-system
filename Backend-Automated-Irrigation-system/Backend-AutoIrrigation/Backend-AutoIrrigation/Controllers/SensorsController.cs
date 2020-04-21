using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Backend_AutoIrrigation.Data;
using Backend_AutoIrrigation.Models;

namespace Backend_AutoIrrigation.Controllers
{
    public class SensorsController : ApiController
    {
        private SensorServiceContext db = new SensorServiceContext();

        // GET: api/Sensors
        public IQueryable<Sensor> GetSensors()
        {
            return db.Sensors;
        }

        // GET: api/Sensors/5
        [ResponseType(typeof(Sensor))]
        public async Task<IHttpActionResult> GetSensor(int id)
        {
            Sensor sensor = await db.Sensors.FindAsync(id);
            if (sensor == null)
            {
                return NotFound();
            }

            return Ok(sensor);
        }

        // PUT: api/Sensors/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutSensor(int id, Sensor sensor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sensor.Id)
            {
                return BadRequest();
            }

            db.Entry(sensor).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SensorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Sensors
        [ResponseType(typeof(Sensor))]
        public async Task<IHttpActionResult> PostSensor(Sensor sensor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Sensors.Add(sensor);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = sensor.Id }, sensor);
        }

        // DELETE: api/Sensors/5
        [ResponseType(typeof(Sensor))]
        public async Task<IHttpActionResult> DeleteSensor(int id)
        {
            Sensor sensor = await db.Sensors.FindAsync(id);
            if (sensor == null)
            {
                return NotFound();
            }

            db.Sensors.Remove(sensor);
            await db.SaveChangesAsync();

            return Ok(sensor);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SensorExists(int id)
        {
            return db.Sensors.Count(e => e.Id == id) > 0;
        }
    }
}