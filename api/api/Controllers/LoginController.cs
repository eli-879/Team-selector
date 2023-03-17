using api.Data;
using api.Dtos.UserDtos;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api.Controllers
{
    [Route("/api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly IAOCRepo _repository;

        public LoginController(IConfiguration configuration, IAOCRepo repository)
        {
            _configuration = configuration;
            _repository = repository;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] UserInDto userLogin)
        {
            var user = Authenticate(userLogin);

            if (user != null)
            {
                var token = Generate(user);
                return Ok(token);
            }

            return NotFound("Could not find user");
        }

        private string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.GivenName),
                new Claim(ClaimTypes.Surname, user.Surname),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        private User Authenticate(UserInDto userInDto)
        {
            var currentUser = _repository.GetUserByCredentials(userInDto);

            return currentUser;
        }
    }
}
