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
  public async Task<IActionResult> Messages([FromRoute] Guid id, [FromQuery] Guid? lastMessageId = null)
  {
    var user = await this.GetCurrentUser(userManager);
    var conversation = await dbContext.Conversations
      .Where(e => e.Id == id)
      .Where(e => e.FirstUserId == user.Id || e.SecondUserId == user.Id)
      .FirstOrDefaultAsync();
    if (conversation == null) return NotFound();
    Console.WriteLine(lastMessageId);
    List<Message> messages = await dbContext.Messages
      .Where(e => e.ConvsersationId == conversation.Id)
      .Where(e => lastMessageId != null ? e.Id < lastMessageId : true)
      .OrderByDescending(e => e.Id)
      .Include(e => e.User)
      .Include(e => e.Conversation)
      .Take(5)
      .ToListAsync();
    List<MessageDto> messageDtos = messages
      .Select(e => e.ToMessageDtoFromMessage())
      .Reverse()
      .ToList();
    return Ok(messageDtos);
  }
}