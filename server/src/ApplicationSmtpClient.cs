using System.Net.Mail;

namespace AspNetChat.Global;

public class ApplicationSmtpClient
{
  public SmtpClient client { get; } = new SmtpClient()
  {
    Host = "localhost",
    Port = 25
  };
}