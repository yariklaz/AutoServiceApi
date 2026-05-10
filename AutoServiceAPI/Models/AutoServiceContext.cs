using Microsoft.EntityFrameworkCore;

namespace AutoServiceAPI.Models
{
    public class AutoServiceContext : DbContext
    {
        public virtual DbSet<Car> Cars { get; set; }
        public virtual DbSet<Service> Services { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderService> OrderServices { get; set; }

        public AutoServiceContext(DbContextOptions<AutoServiceContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}