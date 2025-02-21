using AspNetChat.Global;
using AspNetChat.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspNetChat.Conversations;

[ApiController]
[Route("conversations")]
public class ConversationController(
  ApplicationDbContext dbContext,
  UserManager<ApplicationUser> userManager
) : ControllerBase
{
  [HttpGet]
  [Authorize(Policy = "RequireCompletedProfile")]
  [ProducesResponseType<List<ConversationDto>>(StatusCodes.Status200OK)]
  public async Task<IActionResult> Conversations()
  {
    var user = await this.GetCurrentUser(userManager);
    List<ConversationDto> conversations = await dbContext.Conversations
      .Where(e => e.SecondUserId == user.Id || e.FirstUserId == user.Id)
      .Include(e => e.FirstUser)
      .Include(e => e.SecondUser)
      .Select(e => e.ToConvsersationDtoFromConvsersation())
      .ToListAsync();
    return Ok(conversations);
  }

  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> DeleteConversation([FromRoute] Guid id)
  {
    var user = await this.GetCurrentUser(userManager);
    await dbContext.Conversations
      .Where(e => e.Id == id)
      .Where(e => e.FirstUserId == user.Id || e.SecondUserId == user.Id)
      .ExecuteDeleteAsync();
    return Ok();
  }
}