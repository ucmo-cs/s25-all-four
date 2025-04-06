using Backend.Data;
using Backend.Models;
using Backend.Models.Entities;
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
            if (Updates == null) return NotFound(new { message = "Not updates found" });
            return Ok(Updates);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetUpdate(Guid id)
        {
            var Update = _dbContext.updates.Find(id);
            if (Update == null) return NotFound(new { message = "Not update found" });
            return Ok(Update);
        }

        [HttpPost]
        public IActionResult PostUpdate([FromBody]Updates updateDto)
        {
            updateDto.Id = Guid.NewGuid();
            _dbContext.updates.Add(updateDto);
            _dbContext.SaveChanges();

            return Ok(updateDto);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            var removeUpdate = _dbContext.updates.Find(id);
            if (removeUpdate == null) return NotFound(new { message = "Not update found"});

            _dbContext.updates.Remove(removeUpdate);
            _dbContext.SaveChanges();

            return Ok(removeUpdate);
        }
        [HttpDelete]
        [Route("remove-all")]
        public IActionResult DeleteAll()
        {
            var allUpdates = _dbContext.updates.ToList();

            if (!allUpdates.Any())
                return NotFound(new { message = "No updates found to delete" });

            _dbContext.updates.RemoveRange(allUpdates);
            _dbContext.SaveChanges();

            return Ok(new { message = "All updates have been successfully deleted" });
        }


    }
}
