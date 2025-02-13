using Server.Messages;
using Server.Users;

namespace Server.Conversations;

public class Conversation
{
  public Guid Id;
  public required Guid FirstUserId;
  public ApplicationUser FirstUser = null!;
  public required Guid SecondUserId;
  public ApplicationUser SecondUser = null!;
  public List<Message> Messages = new List<Message>();
}