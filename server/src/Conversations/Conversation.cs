using AspNetChat.Messages;
using AspNetChat.Users;

namespace AspNetChat.Conversations;

public class Conversation
{
  public Guid Id { get; set; }
  public required Guid FirstUserId { get; set; }
  public ApplicationUser FirstUser { get; set; } = null!;
  public required Guid SecondUserId { get; set; }
  public ApplicationUser SecondUser { get; set; } = null!;
  public List<Message> Messages { get; set; } = new List<Message>();
}