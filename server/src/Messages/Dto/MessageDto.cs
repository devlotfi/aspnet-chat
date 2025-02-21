using AspNetChat.Conversations;
using AspNetChat.Users;

namespace AspNetChat.Messages;

public class MessageDto
{
  public required Guid Id { get; set; }
  public required string Text { get; set; }
  public required UserPublicInfoDto User { get; set; }
  public required ConversationDto Conversation { get; set; }
  public required DateTime Timestamp { get; set; }
}