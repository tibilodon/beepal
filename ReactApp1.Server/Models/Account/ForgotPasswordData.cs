using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models.Account
{
    public class ForgotPasswordData
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string returnUrl { get; set; }
    }
}
