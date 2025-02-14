using AspNetChat.Users;

namespace AspNetChat.Invitations;

public class Invitation
{
  public Guid Id { get; set; }
  public required Guid FromUserId { get; set; }
  public ApplicationUser FromUser { get; set; } = null!;
  public required Guid ToUserId { get; set; }
  public ApplicationUser ToUser { get; set; } = null!;
  public required DateTime Timestamp { get; set; } = DateTime.Now;
}