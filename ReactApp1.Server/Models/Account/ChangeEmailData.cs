using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models.Account
{
    public class ChangeEmailData
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [EmailAddress]
        public string NewEmail { get; set; }
        public string ReturnUrl { get; set; }
    }
}
