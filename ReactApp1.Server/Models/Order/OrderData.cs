using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactApp1.Server.Models.Orders
{
    public class OrderData
    {
        [Key]
        public string OrderId { get; set; }
        public OrderDetails OrderDetails { get; set; }
        //[ForeignKey("Address")]
        //public int? AddressId { get; set; }
        //public Address? Address { get; set; }

        //[ForeignKey("AppUser")]
        //public string? AppUserId { get; set; }
        //public AppUser? AppUser { get; set; }


        [ForeignKey("Product")]
        public string ProductId { get; set; }
        public Product Product { get; set; }

    }
}
