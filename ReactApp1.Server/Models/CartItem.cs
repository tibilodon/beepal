using ReactApp1.Server.Data.Enum;

namespace ReactApp1.Server.Models
{
    public class CartItem
    {
        public string Id { get; set; }
        public int PlacedInCartQuantity { get; set; }
        public Packaging Packaging { get; set; }
    }
}
