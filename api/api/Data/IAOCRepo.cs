using api.Dtos.UserDtos;
using api.Models;

namespace api.Data
{
    public interface IAOCRepo
    {
        IEnumerable<User> GetAllUsers();

        User GetUserByID(int id);

        User AddUser(User user);

        AOCGame GetGameByID(int id);

        AOCGame AddGame(AOCGame game);

        User GetUserByCredentials(UserInDto user);
    }
}
