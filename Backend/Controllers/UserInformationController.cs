using Backend.Data;
using Backend.Models;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserInformationController : Controller
    {
        private ApplicationDBContext _dbContext;

        public UserInformationController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var Users = _dbContext.UserInformation.ToList();
            if (User == null) return NotFound(new { message = "User was not found" });
            return Ok(Users);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetUser(Guid id)
        {
            var User = _dbContext.UserInformation.Find(id);

            if (User == null) return NotFound(new { message = "User was not found" });

            return Ok(User);
        }
        [HttpPost]
        public IActionResult PostUser([FromBody]UserInformation addUserInformationDto)
        {            
            addUserInformationDto.Id = Guid.NewGuid();
            _dbContext.UserInformation.Add(addUserInformationDto);
            _dbContext.SaveChanges();
            return Ok(addUserInformationDto);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult EditUser(Guid id, UserInformation editUserInformationDto)
        {
            var OldUser = _dbContext.UserInformation.Find(id);
            if (OldUser == null) return NotFound(new { message = "Existing user not found" });

            OldUser.Username = editUserInformationDto.Username;
            OldUser.Password = editUserInformationDto.Password;
            OldUser.Email = editUserInformationDto.Email;
            OldUser.NickName = editUserInformationDto.NickName;
            OldUser.Address = editUserInformationDto.Address;
            OldUser.Phone = editUserInformationDto.Phone;
            OldUser.Position = editUserInformationDto.Position;
            OldUser.Birthday = editUserInformationDto.Birthday;
            OldUser.Information = editUserInformationDto.Information;
            OldUser.SecurityCode = editUserInformationDto.SecurityCode;
            OldUser.LoggedIn = editUserInformationDto.LoggedIn;
            OldUser.Team = editUserInformationDto.Team;

            _dbContext.SaveChanges();
            return Ok(OldUser);
        }
        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteUser(Guid id)
        {
            var RemoveUser = _dbContext.UserInformation.Find(id);
            if (RemoveUser == null) return NotFound(new { message = "Not found" });

            _dbContext.UserInformation.Remove(RemoveUser);
            _dbContext.SaveChanges();
            return Ok(RemoveUser);
        }
    }
}
