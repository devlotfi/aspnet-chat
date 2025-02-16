using AspNetChat.Users;

namespace AspNetChat.Conversations;

public static class ConvsersationMapper
{
  public static ConversationDto ToConvsersationDtoFromConvsersation(this Conversation invitation)
  {
    return new ConversationDto
    {
      Id = invitation.Id,
      FirstUser = invitation.FirstUser.ToUserPublicInfoDtoFromApplicationUser(),
      SecondUser = invitation.SecondUser.ToUserPublicInfoDtoFromApplicationUser(),
    };
  }
}