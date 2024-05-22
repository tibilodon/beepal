using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using ReactApp1.Server.Helpers;
using ReactApp1.Server.Models;
using System.Net;
using System.Net.Mail;

namespace ReactApp1.Server.Services
{
    public class EmailSender : IEmailSender<AppUser>
    {
        public GSMTPSettings Options { get; set; }

        public EmailSender(IOptions<GSMTPSettings> config)
        {
            Options = config.Value;

        }

        public async Task Execute(string fromMail, string apiKey, string subject, string message, string toEmail)
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromMail, apiKey),
                EnableSsl = true
            };
            MailMessage GSMTPMessage = new MailMessage();
            GSMTPMessage.From = new MailAddress(fromMail);
            GSMTPMessage.Subject = subject;
            GSMTPMessage.To.Add(new MailAddress(toEmail));
            GSMTPMessage.Body = message;
            GSMTPMessage.IsBodyHtml = true;
            //  send mail
            smtpClient.Send(GSMTPMessage);
        }

        public async Task SendEmailAsync(string toEmail, string subject, string message)
        {


            if (string.IsNullOrEmpty(Options.ApiKey))
            {
                throw new Exception("Null gsmtp api key");
            }
            //await Execute(Options.FromMail, Options.ApiKey, subject, message, toEmail);
            await Execute(Options.FromMail, Options.ApiKey, subject, message, toEmail);
        }
        public Task SendConfirmationLinkAsync(AppUser user, string email,
     string confirmationLink) => SendEmailAsync(email, "Confirm your email",

          $"Please confirm your account by <a href='{confirmationLink}'>clicking here</a>.");


        public Task SendPasswordResetLinkAsync(AppUser user, string email,
            string resetLink) => SendEmailAsync(email, "Reset your password",
            $"Please reset your password by <a href='{resetLink}'>clicking here</a>.");

        public Task SendPasswordResetCodeAsync(AppUser user, string email,
            string resetCode) => SendEmailAsync(email, "Reset your password",
            $"Please reset your password using the following code: {resetCode}");
    }
}
