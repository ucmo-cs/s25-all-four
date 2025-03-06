using Backend.Data;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimeSheetController : Controller
    {
        private readonly ApplicationDBContext _dbContext;
        public TimeSheetController(ApplicationDBContext DBContext)
        {
            _dbContext = DBContext;
        }
        [HttpGet]
        public IActionResult GetAllTimeSheets()
        {
            var timeSheets = _dbContext.timesheets.ToList();
            if(timeSheets == null) return NotFound(new { message = "No time sheets found" });            
            return Ok(timeSheets);
        }
        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetTimeSheets(Guid id)
        {
            var timeSheet = _dbContext.timesheets.Find(id);
            if (timeSheet == null) return NotFound(new { message = "No time sheet found" });
            return Ok(timeSheet);
        }
        [HttpPost]
        public IActionResult CreateTimeSheet([FromBody] Timesheet timeSheet)
        {
            timeSheet.Id = Guid.NewGuid();
            _dbContext.timesheets.Add(timeSheet);
            _dbContext.SaveChanges();
            return Ok(timeSheet);
        }
    }
}
