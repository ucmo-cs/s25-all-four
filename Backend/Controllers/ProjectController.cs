using Backend.Data;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        private readonly ApplicationDBContext _dbContext;
        public ProjectController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public IActionResult GetAllProjects ()
        {
            var projects = _dbContext.projects.ToList();
            if (projects == null)
            {
                return NotFound("No tasks found.");
            }

            return Ok(projects);
        }
        [HttpPost]
        public IActionResult AddProject ([FromBody] Project project)
        {
            project.Id = Guid.NewGuid();
            _dbContext.projects.Add(project);
            _dbContext.SaveChanges();
            return Ok(project);
        }
        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteProject ( Guid id)
        {
            var project = _dbContext.projects.Find(id);

            if (project == null)
            {
                return NotFound();
            }
            _dbContext.projects.Remove(project);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
