using AspNetChat.Global;
using AspNetChat.Messages;
using AspNetChat.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace AspNetChat.Conversations;

[ApiController]
[Route("messages")]
public class MessageController(
  ApplicationDbContext dbContext,
  UserManager<ApplicationUser> userManager
) : ControllerBase
{
  [HttpGet("{id:guid}")]
  [Authorize(Policy = "RequireCompletedProfile")]
  [ProducesResponseType<List<MessageDto>>(StatusCodes.Status200OK)]
  public async Task<IActionResult> Messages([FromRoute] Guid id)
  {
    var user = await this.GetCurrentUser(userManager);
    var conversation = await dbContext.Conversations
      .Where(e => e.Id == id)
      .Where(e => e.FirstUserId == user.Id || e.SecondUserId == user.Id)
      .FirstOrDefaultAsync();
    if (conversation == null) return NotFound();

    List<MessageDto> messages = await dbContext.Messages
      .Where(e => e.ConvsersationId == conversation.Id)
      .Select(e => e.ToMessageDtoFromMessage())
      .ToListAsync();
    return Ok(messages);
  }
}