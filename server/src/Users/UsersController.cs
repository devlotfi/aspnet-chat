using AspNetChat.Global;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AspNetChat.Users;

[ApiController]
[Route("users")]
public class UsersController(UserManager<ApplicationUser> _userManager) : ControllerBase
{
  [HttpGet("info")]
  [Authorize]
  [ProducesResponseType<UserInfoResponseDto>(StatusCodes.Status200OK)]
  public async Task<IActionResult> GetInfo()
  {
    if (User.Identity == null || User.Identity.Name == null) return Unauthorized();
    var user = await _userManager.FindByEmailAsync(User.Identity.Name);
    if (user == null) return NotFound();
    return Ok(new UserInfoResponseDto
    {
      Id = user.Id,
      FirstName = user.FirstName,
      LastName = user.LastName,
      Email = user.Email!,
    });
  }
}