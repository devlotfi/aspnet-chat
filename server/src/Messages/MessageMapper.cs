using AspNetChat.Conversations;
using AspNetChat.Users;

namespace AspNetChat.Messages;

public static class MessageMapper
{
  public static MessageDto ToMessageDtoFromMessage(this Message message)
  {
    return new MessageDto
    {
      Id = message.Id,
      User = message.User.ToUserPublicInfoDtoFromApplicationUser(),
      Conversation = message.Conversation.ToConvsersationDtoFromConvsersation(),
      Timestamp = message.Timestamp,
    };
  }
}