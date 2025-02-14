using System.Net.Mail;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace AspNetChat.Global;

public class EmailSender(ApplicationSmtpClient _applicationSmtpClient) : IEmailSender
{
  public async Task SendEmailAsync(string email, string subject, string htmlMessage)
  {
    var from = new MailAddress("test@test.com");
    var to = new MailAddress(email);
    var mailMessage = new MailMessage(from, to)
    {
      Subject = subject,
      Body = htmlMessage
    };
    await _applicationSmtpClient.client.SendMailAsync(mailMessage);
  }
}