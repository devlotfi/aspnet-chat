using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AspNetChat.Users;

public static class ControllerExtension
{
  public static async Task<ApplicationUser> GetCurrentUser(this ControllerBase controllerBase, UserManager<ApplicationUser> userManager)
  {
    if (controllerBase.User.Identity == null || controllerBase.User.Identity.Name == null) throw new Exception("No identity");
    var user = await userManager.FindByNameAsync(controllerBase.User.Identity.Name);
    if (user == null) throw new Exception("User not found");
    return user;
  }
}