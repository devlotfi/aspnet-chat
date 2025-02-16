using AspNetChat.Users;

namespace AspNetChat.Conversations;

public class ConversationDto
{
  public Guid Id { get; set; }
  public UserPublicInfoDto FirstUser { get; set; } = null!;
  public UserPublicInfoDto SecondUser { get; set; } = null!;
}