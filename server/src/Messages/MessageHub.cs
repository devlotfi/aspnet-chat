using AspNetChat.Global;
using AspNetChat.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace AspNetChat.Messages;

public class MessageHub(
  ApplicationDbContext dbContext,
  UserManager<ApplicationUser> userManager
) : Hub
{
  [Authorize(Policy = "RequireCompletedProfile")]
  public async Task Ping(string message)
  {
    Console.WriteLine(Context.User.Identity.Name);
    Console.WriteLine(message);
    await Clients.All.SendAsync("message", "hello world");
  }

  [Authorize(Policy = "RequireCompletedProfile")]
  public async Task SendMessage(Guid conversationId, string messageText)
  {
    var user = await this.GetCurrentUser(userManager);
    var conversation = await dbContext.Conversations
      .Where(e => e.Id == conversationId)
      .Where(e => e.FirstUserId == user.Id || e.SecondUserId == user.Id)
      .Include(e => e.FirstUser)
      .Include(e => e.SecondUser)
      .FirstOrDefaultAsync();
    if (conversation == null) throw new Exception("Conversation not found");

    var otherUser = conversation.FirstUser.Id == user.Id ? conversation.SecondUser : conversation.SecondUser.Id == user.Id ? conversation.FirstUser : null;
    if (otherUser == null) throw new Exception("Other user not found");

    var message = new Message
    {
      Text = messageText,
      UserId = user.Id,
      ConvsersationId = conversation.Id
    };

    await dbContext.Messages.AddAsync(message);
    await dbContext.SaveChangesAsync();
    message = await dbContext.Messages.FindAsync(message.Id);
    if (message == null) throw new Exception("Message not found");

    var messageDto = message.ToMessageDtoFromMessage();
    Console.WriteLine(user.UserName);
    Console.WriteLine(otherUser.UserName);
    await Clients.User(user.Id.ToString()).SendAsync("RecieveMessage", messageDto);
    await Clients.User(otherUser.Id.ToString()).SendAsync("RecieveMessage", messageDto);
  }
}