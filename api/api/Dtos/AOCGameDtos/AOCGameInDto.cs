using System.Diagnostics.CodeAnalysis;

namespace api.Dtos.AOCGameDtos
{
    public class AOCGameInDto
    {
        public DateTime date { get; set; }
        [AllowNull]
        public string data { get; set; }
    }
}
