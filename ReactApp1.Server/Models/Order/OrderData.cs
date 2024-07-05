using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactApp1.Server.Models.Orders
{
    public class OrderData
    {
        [Key]
        public string OrderId { get; set; }
        public OrderDetails OrderDetails { get; set; }

        [ForeignKey("Product")]
        public string ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
    }
}
