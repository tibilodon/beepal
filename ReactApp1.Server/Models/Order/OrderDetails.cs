using ReactApp1.Server.Models.Order;
using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models.Orders
{
    public class OrderDetails
    {

        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString().ToUpper();
        public string? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public ICollection<OrderData> OrderDatas { get; set; } = new List<OrderData>();
    }
}
