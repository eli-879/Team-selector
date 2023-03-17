using api.Dtos.UserDtos;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace api.Data
{
    public class DbAOCRepo : IAOCRepo
    {
        private readonly AOCDbContext _dbContext;

        public DbAOCRepo(AOCDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public AOCGame AddGame(AOCGame game)
        {
            EntityEntry<AOCGame> e = _dbContext.Games.Add(game);
            AOCGame g = e.Entity;
            _dbContext.SaveChanges();
            return g;
        }

        public User AddUser(User user)
        {
            EntityEntry<User> e = _dbContext.Users.Add(user);
            User u = e.Entity;
            _dbContext.SaveChanges();
            return u;
        }

        public IEnumerable<User> GetAllUsers()
        {
            IEnumerable<User> users = _dbContext.Users.ToList();
            return users;
        }

        public AOCGame GetGameByID(int id)
        {
            AOCGame game = _dbContext.Games.FirstOrDefault(e => e.Id == id);
            return game;
        }

        public User GetUserByID(int id)
        {
            User user = _dbContext.Users.FirstOrDefault(e => e.Id == id);
            return user;
        }

        public User GetUserByCredentials(UserInDto user)
        {
            User u = _dbContext.Users.FirstOrDefault(e => e.Username == user.Username && e.Password == user.Password);
            return u;
        }
    }
}
