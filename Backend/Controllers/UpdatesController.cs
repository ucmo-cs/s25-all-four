using Backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UpdatesController : Controller
    {
        private ApplicationDBContext _dbContext;

        public UpdatesController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]       
        public IActionResult GetAllUpdates()
        {
            var Updates = _dbContext.updates.ToList();
            if(Updates == null) return NotFound(new {message = "Not updates found"});            
            return Ok(Updates);
        }
    }
}
