namespace AspNetChat.Users;

public class UserLinkStatusDto
{
  public required bool Invitation { get; set; }
  public required bool Conversation { get; set; }
}