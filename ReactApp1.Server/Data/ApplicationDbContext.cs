using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ReactApp1.Server.Models;
using ReactApp1.Server.Models.Order;
using ReactApp1.Server.Models.Orders;

namespace ReactApp1.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }


        public DbSet<Product> Products { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<OrderData> OrderData { get; set; }
        public DbSet<Address> Addresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OrderData>()
                .HasKey(od => new { od.OrderId, od.ProductId });

            modelBuilder.Entity<OrderData>()
                .HasOne(od => od.OrderDetails)
                .WithMany(o => o.OrderDatas)
                .HasForeignKey(od => od.OrderId);

            modelBuilder.Entity<OrderData>()
                 .HasOne(od => od.Product)
                 .WithMany(p => p.OrderDatas)
                 .HasForeignKey(od => od.ProductId);


            modelBuilder.Entity<OrderDetails>()
                .HasOne(od => od.AppUser)
                .WithMany(au => au.Orders)
                .HasForeignKey(od => od.AppUserId)
                .OnDelete(DeleteBehavior.SetNull); // Handle optional AppUser

            modelBuilder.Entity<OrderDetails>()
                .HasOne(od => od.Address)
                .WithMany()
                .HasForeignKey(od => od.AddressId);

            //  handle createdAt, updatedAt creation automatically
            modelBuilder.Entity<Product>()
                .Property(b => b.CreatedAt)
                .HasDefaultValueSql("getutcdate()");

            modelBuilder.Entity<Product>().Property(b => b.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Save);

            modelBuilder.Entity<OrderDetails>()
              .Property(b => b.CreatedAt)
              .HasDefaultValueSql("getutcdate()");

            modelBuilder.Entity<OrderDetails>().Property(b => b.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Save);

            modelBuilder.Entity<Address>()
            .Property(b => b.CreatedAt)
            .HasDefaultValueSql("getutcdate()");

            modelBuilder.Entity<Address>().Property(b => b.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Save);



        }
    }
}
