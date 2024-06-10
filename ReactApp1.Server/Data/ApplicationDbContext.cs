using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;
using ReactApp1.Server.Models.Order;

namespace ReactApp1.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }


        public DbSet<Product> Products { get; set; }
        public DbSet<OrderData> OrderDatas { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityUserLogin<string>>().HasKey(p => new { p.LoginProvider, p.ProviderKey });


            modelBuilder.Entity<OrderData>().HasKey(od => od.Id);
            modelBuilder.Entity<OrderData>()
                .HasOne(od => od.Product)
                .WithMany(prod => prod.Orders)
                .HasForeignKey(od => od.ProductId);

            modelBuilder.Entity<OrderData>()
            .HasOne(od => od.AppUser)
            .WithMany(au => au.Orders)
            .HasForeignKey(od => od.AppUserId);

            base.OnModelCreating(modelBuilder);
        }

    }
}
