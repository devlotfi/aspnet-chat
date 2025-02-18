using AspNetChat.Users;

namespace AspNetChat.Conversations;

public class ConversationDto
{
  public required Guid Id { get; set; }
  public required UserPublicInfoDto FirstUser { get; set; }
  public required UserPublicInfoDto SecondUser { get; set; }
}