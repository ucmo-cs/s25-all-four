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
        public IActionResult PostUpdate(AddUpdateDto updateDto)
        {
            var newPost = new Updates()
            {
                Title = updateDto.Title,
                Description = updateDto.Description,
                AuthorId = updateDto.AuthorId,
                TeamId = updateDto.TeamId,
                DateCreated = updateDto.DateCreated,
                IsVisible = updateDto.IsVisible
            };

            _dbContext.updates.Add(newPost);
            _dbContext.SaveChanges();

            return Ok(newPost);
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

    }
}
