using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace AspNetChat.Users;

public static class GetUserExtension
{
  public static async Task<ApplicationUser> GetCurrentUser(this ControllerBase controllerBase, UserManager<ApplicationUser> userManager)
  {
    if (controllerBase.User.Identity == null || controllerBase.User.Identity.Name == null) throw new Exception("No identity");
    var user = await userManager.FindByNameAsync(controllerBase.User.Identity.Name);
    if (user == null) throw new Exception("User not found");
    return user;
  }

  public static async Task<ApplicationUser> GetCurrentUser(this Hub hub, UserManager<ApplicationUser> userManager)
  {
    if (hub.Context.User == null || hub.Context.User.Identity == null || hub.Context.User.Identity.Name == null) throw new Exception("No identity");
    var user = await userManager.FindByNameAsync(hub.Context.User.Identity.Name);
    if (user == null) throw new Exception("User not found");
    return user;
  }
}