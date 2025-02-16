using AspNetChat.Users;

namespace AspNetChat.Invitations;

public static class InvitationMapper
{
  public static InvitationDto ToInvitationDtoFromInvitation(this Invitation invitation)
  {
    return new InvitationDto
    {
      Id = invitation.Id,
      ToUser = invitation.ToUser.ToUserPublicInfoDtoFromApplicationUser(),
      FromUser = invitation.ToUser.ToUserPublicInfoDtoFromApplicationUser(),
      Timestamp = invitation.Timestamp
    };
  }
}