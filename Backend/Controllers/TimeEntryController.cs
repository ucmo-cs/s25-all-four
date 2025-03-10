using Backend.Data;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimeEntryController : Controller
    {
        private readonly ApplicationDBContext _dbContext;

        public TimeEntryController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllTimeEntries()
        {
            var timeEntries = _dbContext.timeEntries.ToList();
            if (timeEntries == null) return NotFound(new { message = "No time entries found" });
            return Ok(timeEntries);            
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetTimeEntryById(Guid id)
        {
            var timeEntry = _dbContext.timeEntries.Find(id);
            if (timeEntry == null) return NotFound(new { message = "Time entry not found" });
            return Ok(timeEntry);
        }

        [HttpPost]
        public IActionResult AddTimeEntry([FromBody] TimeEntry timeEntry)
        {            
            timeEntry.Id = Guid.NewGuid();
            _dbContext.timeEntries.Add(timeEntry);
            _dbContext.SaveChanges();
            return Ok(timeEntry);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateTimeEntry(Guid id, [FromBody] TimeEntry timeEntry)
        {
            var existingTimeEntry = _dbContext.timeEntries.Find(id);
            if (existingTimeEntry == null) return NotFound(new { message = "Time entry not found" });
            existingTimeEntry.Day = timeEntry.Day;
            existingTimeEntry.HoursWorked = timeEntry.HoursWorked;
            existingTimeEntry.Month = timeEntry.Month;
            existingTimeEntry.UserId = timeEntry.UserId;
            _dbContext.SaveChanges();
            return Ok(existingTimeEntry);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteTimeEntry(Guid id)
        {
            var timeEntry = _dbContext.timeEntries.Find(id);
            if (timeEntry == null) return NotFound(new { message = "Time entry not found" });
            _dbContext.timeEntries.Remove(timeEntry);
            _dbContext.SaveChanges();
            return Ok(timeEntry);
        }
    }
}
