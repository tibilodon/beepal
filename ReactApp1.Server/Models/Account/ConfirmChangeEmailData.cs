namespace ReactApp1.Server.Models.Account
{
    public class ConfirmChangeEmailData
    {
        public string Email { get; set; }
        public string UserId { get; set; }
        public string Code { get; set; }
        public string ReturnUrl { get; set; }
    }
}
