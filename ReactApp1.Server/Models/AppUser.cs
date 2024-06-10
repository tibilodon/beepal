using Microsoft.AspNetCore.Identity;
using ReactApp1.Server.Models.Order;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactApp1.Server.Models
{
    public class AppUser : IdentityUser
    {
        public DateTime? PasswordChangedDate { get; set; }
        public string? NickName { get; set; }
        [ForeignKey("Address")]
        public int? AddressId { get; set; }
        public Address? Address { get; set; }

        public ICollection<OrderData>? Orders { get; set; }

    }
}
