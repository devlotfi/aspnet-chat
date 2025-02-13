using Server.Users;

namespace Server.Invitations;

public class Invitation
{
  public Guid Id;
  public required Guid FromUserId;
  public ApplicationUser FromUser = null!;
  public required Guid ToUserId;
  public ApplicationUser ToUser = null!;
  public DateTime Timestamp = DateTime.Now;
}