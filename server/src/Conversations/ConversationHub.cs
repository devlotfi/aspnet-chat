using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace AspNetChat.Conversations;

public class ConversationHub : Hub
{
  //[Authorize(Policy = "RequireCompletedProfile")]
  public async Task SendMessage(string message)
  {
    Console.WriteLine(Context.User.Identity.Name);
    Console.WriteLine(message);
    await Clients.All.SendAsync("message", "hello world");
  }
}