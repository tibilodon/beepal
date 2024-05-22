using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models.Account
{
    public class LoginData
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string RememberMe { get; set; }
    }
}
