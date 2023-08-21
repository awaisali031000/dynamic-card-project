using Microsoft.EntityFrameworkCore;

namespace DynamicCard_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }

        public DbSet<DynamicCard> DynamicCards { get; set; }
    }
}
