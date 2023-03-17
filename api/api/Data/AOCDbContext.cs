using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class AOCDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<AOCGame> Games { get; set; }

        public AOCDbContext(DbContextOptions<AOCDbContext> options) :base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=AOCDatabase.sqlite");
        }
    }
}
