using Microsoft.AspNetCore.Identity;

namespace ReactApp1.Server.Models
{
    public class AppUser : IdentityUser
    {
        public DateTime? PasswordChangedDate { get; set; }
        public string? NickName { get; set; }
    }
}
