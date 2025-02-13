using Server.Conversations;
using Server.Users;

namespace Server.Messages;

public class Message
{
  public Guid Id;
  public required string Text;
  public required Guid UserId;
  public ApplicationUser User = null!;
  public required Guid ConversationId;
  public Conversation Conversation = null!;
  public DateTime Timestamp = DateTime.Now;
}