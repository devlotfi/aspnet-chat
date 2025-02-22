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
      Text = message.Text,
      User = message.User.ToUserPublicInfoDtoFromApplicationUser(),
      ConversationId = message.Conversation.Id,
      Timestamp = message.Timestamp,
    };
  }
}