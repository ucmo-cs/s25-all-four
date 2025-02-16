using Backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<UserInformation> UserInformation { get; set; }
        public DbSet<Team> teams { get; set; }
        public DbSet<Updates> updates { get; set; }
    }
}
