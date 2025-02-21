using AspNetChat.Global;
using AspNetChat.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace AspNetChat.Messages;

public class MessageHub : Hub
{
  [Authorize(Policy = "RequireCompletedProfile")]
  public async Task SendMessage(string message)
  {
    Console.WriteLine(Context.User.Identity.Name);
    Console.WriteLine(message);
    await Clients.All.SendAsync("message", "hello world");
  }
}