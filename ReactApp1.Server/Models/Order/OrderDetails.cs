using ReactApp1.Server.Models.Order;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactApp1.Server.Models.Orders
{
    public class OrderDetails
    {

        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString().ToUpper();
        //  TODO: add name
        public bool IsFulfilled { get; set; } = false;
        public string? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public ICollection<OrderData> OrderDatas { get; set; } = new List<OrderData>();
    }
}
