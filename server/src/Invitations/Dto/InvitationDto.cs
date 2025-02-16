using AspNetChat.Users;

namespace AspNetChat.Invitations;

public class InvitationDto
{
  public Guid Id { get; set; }
  public UserPublicInfoDto FromUser { get; set; } = null!;
  public UserPublicInfoDto ToUser { get; set; } = null!;
  public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}