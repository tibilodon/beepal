using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models.Dto
{
    public class UserDto
    {
        public string Id { get; set; }
        //  no white-spaces allowed
        [RegularExpression(@"^\S+$", ErrorMessage = "Username field cannot contain white spaces.")]
        public string UserName { get; set; } = "";
        public string NickName { get; set; } = "";
        [EmailAddress]
        public string Email { get; set; }
    }
}
