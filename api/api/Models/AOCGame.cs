using System.Diagnostics.CodeAnalysis;

namespace api.Models
{
    public class AOCGame
    {

        public int Id { get; set; }
        public DateTime date { get; set; }
        [AllowNull]
        public string data { get; set; }
    }
}
