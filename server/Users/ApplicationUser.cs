using Microsoft.AspNetCore.Identity;
using Server.Conversations;

namespace Server.Users;

public class ApplicationUser : IdentityUser<Guid>
{
  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
  public List<Conversation> Conversations = new List<Conversation>();
}