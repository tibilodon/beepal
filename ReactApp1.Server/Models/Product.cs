using ReactApp1.Server.Data.Enum;
using ReactApp1.Server.Models.Orders;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactApp1.Server.Models
{
    public class Product
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString().ToUpper();
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public Category Category { get; set; }
        public Packaging Packaging { get; set; }
        public int Price { get; set; }
        public int Stock { get; set; }
        public ICollection<OrderData>? OrderDatas { get; set; } = new List<OrderData>();
    }
}
