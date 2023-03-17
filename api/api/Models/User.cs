using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }

        public string Email { get; set; }
        public string Role { get; set; }

        public string GivenName { get; set; }

        public string Surname { get; set; }

        public List<AOCGame> Games { get; set; }

    }
}
