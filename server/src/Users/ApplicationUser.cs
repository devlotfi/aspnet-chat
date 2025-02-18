using AspNetChat.Conversations;
using AspNetChat.Invitations;
using AspNetChat.Messages;
using Microsoft.AspNetCore.Identity;

namespace AspNetChat.Users;

public class ApplicationUser : IdentityUser<Guid>
{
  public string? FirstName { get; set; } = null;
  public string? LastName { get; set; } = null;
  public List<Invitation> FromInvitations { get; set; } = new List<Invitation>();
  public List<Invitation> ToInvitations { get; set; } = new List<Invitation>();
  public List<Conversation> FirstConversations { get; set; } = new List<Conversation>();
  public List<Conversation> SecondConversations { get; set; } = new List<Conversation>();
  public List<Message> Messages { get; set; } = new List<Message>();
}