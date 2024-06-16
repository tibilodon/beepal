using ReactApp1.Server.Models.Order;

namespace ReactApp1.Server.Models.Dto.Admin
{
    public class AdminOrderDetailsDto
    {
        public string OrderId { get; set; }
        public bool IsFulfilled { get; set; } = false;
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public Address Address { get; set; }
        public UserDto Customer { get; set; }
    }
}
