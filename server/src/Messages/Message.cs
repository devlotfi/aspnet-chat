using AspNetChat.Conversations;
using AspNetChat.Users;

namespace AspNetChat.Messages;

public class Message
{
  public Guid Id { get; set; }
  public required Guid UserId { get; set; }
  public ApplicationUser User { get; set; } = null!;
  public required Guid ConvsersationId { get; set; }
  public Conversation Conversation { get; set; } = null!;
  public required DateTime Timestamp { get; set; } = DateTime.UtcNow;
}