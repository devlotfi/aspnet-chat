using AspNetChat.Users;

namespace AspNetChat.Invitations;

public class InvitationDto
{
  public required Guid Id { get; set; }
  public required UserPublicInfoDto FromUser { get; set; }
  public required UserPublicInfoDto ToUser { get; set; }
  public required DateTime Timestamp { get; set; }
}