using AspNetChat.Global;
using AspNetChat.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
  public async Task<IActionResult> Messages([FromRoute] Guid id)
  {
    var user = await this.GetCurrentUser(userManager);
    var conversation = await dbContext.Conversations
      .Where(e => (e.FirstUserId == user.Id && e.SecondUserId == id) || (e.SecondUserId == user.Id && e.FirstUserId == id))
      .FirstOrDefaultAsync();
    if (conversation == null) return NotFound();

    var messages = dbContext.Messages
      .Where(e => e.ConvsersationId == conversation.Id)
      .ToListAsync();
    return Ok(messages);
  }
}