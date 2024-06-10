using ReactApp1.Server.Data.Enum;
using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models.Dto
{
    public class ProductDetailDto
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public Category Category { get; set; }
        public Packaging Packaging { get; set; }
        public int Price { get; set; }
        public int Stock { get; set; }
        public int PlacedInCartQuantity { get; set; }
        //public ICollection<OrderData> Orders { get; set; } = new List<OrderData>();
    }
}
