using ReactApp1.Server.Data.Enum;

namespace ReactApp1.Server.Models.Dto.Admin
{
    public class AdminProductDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public Category Category { get; set; }
        public Packaging Packaging { get; set; }
        public int Price { get; set; }
        public int Stock { get; set; }
        public ICollection<AdminOrderDetailsDto> OrderDatas { get; set; } = new List<AdminOrderDetailsDto>();
    }
}
