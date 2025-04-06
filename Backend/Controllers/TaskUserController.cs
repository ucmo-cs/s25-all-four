using Backend.Data;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskUserController : Controller
    {
        private readonly ApplicationDBContext _context;

        public TaskUserController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllTask ()
        {
            var tasks = _context.taskUsers.ToList();
            if(tasks == null)
            {
                return NotFound("No tasks found.");
            }
            return Ok(tasks);            
        }
        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetTaskById(Guid id)
        {
            var task = _context.taskUsers.Find(id);
            if (task == null)
            {
                return NotFound("Task not found.");
            }
            return Ok(task);
        }
        [HttpPost]
        public IActionResult CreateTask ([FromBody]TaskUser task)
        {
            task.Id = Guid.NewGuid();
            _context.taskUsers.Add(task);
            _context.SaveChanges();
            return Ok(task);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateTask(Guid id, [FromBody] TaskUser task)
        {
            var existingTask = _context.taskUsers.Find(id);

            if (existingTask == null)
            {
                return NotFound("Task not found.");
            }

            existingTask.TaskName = task.TaskName;
            existingTask.DueDate = task.DueDate;
            existingTask.CreatedBy = task.CreatedBy;
            existingTask.Owner = task.Owner;
            existingTask.Information = task.Information;
            _context.SaveChanges();

            return Ok(existingTask);
        }
        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteTask(Guid id)
        {
            var task = _context.taskUsers.Find(id);
            if (task == null)
            {
                return NotFound("Task not found.");
            }
            _context.taskUsers.Remove(task);
            _context.SaveChanges();
            return Ok("Task deleted successfully.");
        }
    }
}
