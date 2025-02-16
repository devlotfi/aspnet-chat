using System.ComponentModel.DataAnnotations;

namespace AspNetChat.Invitations;

public class CreateInvitationRequestDto
{
  [Required]
  public required Guid UserId { get; set; }
}