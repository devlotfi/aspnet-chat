using System.Security.Claims;
using AspNetChat.Global;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspNetChat.Users;

[ApiController]
[Route("users")]
public class UsersController(
  UserManager<ApplicationUser> userManager,
  ApplicationDbContext dbContext
  ) : ControllerBase
{
  [HttpGet]
  [ProducesResponseType<PaginationResult<UserPublicInfoDto>>(StatusCodes.Status200OK)]
  public async Task<IActionResult> Users(
    [FromQuery] int page,
    [FromQuery] string search
  )
  {
    var users = await userManager.Users
      .Select(e => new UserPublicInfoDto
      {
        Id = e.Id,
        FirstName = e.FirstName,
        LastName = e.LastName
      })
      .Where(e => e.FirstName.Contains(search) || e.LastName.Contains(search))
      .Skip((page - 1) * 10)
      .ToListAsync();
    var pages = await userManager.Users
      .Where(e => EF.Functions.ILike(e.FirstName, $"${search}") || EF.Functions.ILike(e.LastName, $"${search}"))
      .Skip((page - 1) * 10)
      .CountAsync();

    return Ok(new PaginationResult<UserPublicInfoDto>
    {
      Items = users,
      Pages = pages
    });
  }

  [HttpPut("info")]
  [Authorize]
  [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  public async Task<IActionResult> SetProfileInfo([FromBody] SetProfileInfoRequestDto setProfileInfoDto)
  {
    using var transaction = await dbContext.Database.BeginTransactionAsync();

    if (User.Identity == null || User.Identity.Name == null) return Unauthorized();
    var user = await userManager.FindByNameAsync(User.Identity.Name);
    if (user == null) return NotFound();
    user.FirstName = setProfileInfoDto.FirstName;
    user.LastName = setProfileInfoDto.LastName;

    var updateResult = await userManager.UpdateAsync(user);
    if (!updateResult.Succeeded)
    {
      await transaction.RollbackAsync();
      return BadRequest();
    }

    if (User.Claims.FirstOrDefault(e => e.Type == "PorfileCompleted") == null)
    {
      var claimResult = await userManager.AddClaimAsync(user, new Claim("PorfileCompleted", "true"));
      if (!claimResult.Succeeded)
      {
        await transaction.RollbackAsync();
        return BadRequest();
      }
    }

    await transaction.CommitAsync();
    return Ok(new UserDto
    {
      Id = user.Id,
      FirstName = user.FirstName,
      LastName = user.LastName,
      Email = user.Email!,
    });
  }

  [HttpGet("info")]
  [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  public async Task<IActionResult> GetInfo()
  {
    if (User.Identity == null || User.Identity.Name == null) return Unauthorized();
    var user = await userManager.FindByNameAsync(User.Identity.Name);
    if (user == null) return NotFound();
    return Ok(new UserDto
    {
      Id = user.Id,
      FirstName = user.FirstName,
      LastName = user.LastName,
      Email = user.Email!,
    });
  }
}