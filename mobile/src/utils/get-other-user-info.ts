import { components } from "../__generated__/schema";

export function getOtherUserInfo(
  conversation: components["schemas"]["ConversationDto"],
  user: components["schemas"]["UserDto"]
): components["schemas"]["UserPublicInfoDto"] {
  if (conversation.firstUser.id === user.id) {
    return conversation.firstUser;
  } else {
    return conversation.secondUser;
  }
}
