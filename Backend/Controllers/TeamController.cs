using Backend.Data;
using Backend.Models;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : Controller
    {
        private ApplicationDBContext _dbContext;

        public TeamController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllTeams()
        {
            var Teams = _dbContext.teams.ToList();
            if(Teams == null) return NotFound(new {message = "No team found"});            
            return Ok(Teams);
        }
        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetTeam(Guid id)
        {
            var Team = _dbContext.teams.Find(id);
            if (Team == null) return NotFound(new { message = "No team found" });
            return Ok(Team);
        }
        [HttpPost]
        public IActionResult PostTeam(EditTeamDto teamDto)
        {
            var team = new Team()
            {
                TeamName = teamDto.TeamName,
                TeamDescription = teamDto.TeamDescription,
                TeamSize = teamDto.TeamSize,
                TeamManager = teamDto.TeamManager
            };
            _dbContext.teams.Add(team);
            _dbContext.SaveChanges();
            return Ok(team);
        }
        //[HttpPut]
        //[Route("{id:guid}")]
        //public IActionResult EditTeam(EditTeamDto teamDto)

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteTeam(Guid id) 
        { 
            var team = _dbContext.teams.Find(id);
            if (team == null) return NotFound(new { message = "No team found" });
            _dbContext.teams.Remove(team);
            _dbContext.SaveChanges();
            return Ok(team);
        }
    }
}
