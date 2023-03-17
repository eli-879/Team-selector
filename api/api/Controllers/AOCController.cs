using api.Data;
using api.Dtos.AOCGameDtos;
using api.Dtos.UserDtos;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace api.Controllers
{
    [Route("/api")]
    [ApiController]
    public class AOCController: Controller
    {
        private readonly IAOCRepo _repository;

        public AOCController(IAOCRepo repository)
        {
            _repository = repository;
        }
        [HttpGet("users")]
        public ActionResult<IEnumerable<UserOutDto>> GetUsers()
        {
            IEnumerable<User> users = _repository.GetAllUsers();
            IEnumerable<UserOutDto> result = users.Select(e => new UserOutDto { Id = e.Id, Username = e.Username });

            return Ok(result);
        }

        [HttpGet("user/{id}")]
        public ActionResult<UserOutDto> GetUser(int id)
        {
            User user = _repository.GetUserByID(id);

            if (user == null)
                return NotFound();

            UserOutDto u = new UserOutDto { Id=user.Id, Username = user.Username };

            return Ok(u);
        }

        [HttpPost("user")]
        public ActionResult<UserOutDto> AddUser(UserInDto user)
        {
            User u = new User { Username = user.Username, Password = user.Password, Games = new List<AOCGame>() };
            User addedUser = _repository.AddUser(u);

            UserOutDto uOut = new UserOutDto { Id = u.Id, Username = u.Username };

            return CreatedAtAction(nameof(GetUser), new {id=uOut.Id}, uOut);
        }

        [HttpGet("game/{id}")]
        public ActionResult<AOCGameOutDto> GetGame(int id)
        {
            AOCGame game = _repository.GetGameByID(id);

            if (game == null)
                return NotFound();

            AOCGameOutDto g = new AOCGameOutDto { Id = game.Id, data = game.data };
            return Ok(g);
        }


        [HttpPost("game")]
        public ActionResult<AOCGameOutDto> AddGame(AOCGameInDto game)
        {
            AOCGame g = new AOCGame { date = game.date, data = game.data };

            AOCGameOutDto gOut = new AOCGameOutDto { Id = g.Id, data = g.data };

            return CreatedAtAction(nameof(GetGame), new { id = gOut.Id }, gOut);
        }

        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity == null)
            {
                return null;
            }

            var userClaims = identity.Claims;

            return new User
            {
                Username = userClaims.FirstOrDefault(e => e.Type == ClaimTypes.NameIdentifier)?.Value,
                Email = userClaims.FirstOrDefault(e => e.Type == ClaimTypes.Email)?.Value,
                GivenName = userClaims.FirstOrDefault(e => e.Type == ClaimTypes.GivenName)?.Value,
                Surname = userClaims.FirstOrDefault(e => e.Type == ClaimTypes.Surname)?.Value,
                Role = userClaims.FirstOrDefault(e => e.Type == ClaimTypes.Role)?.Value,

            };
        }
    }
}
