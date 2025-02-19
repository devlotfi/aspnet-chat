using AspNetChat.Conversations;
using AspNetChat.Global;
using AspNetChat.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspNetChat.Invitations;

[ApiController]
[Route("invitations")]
public class InvitationController(
  UserManager<ApplicationUser> userManager,
  ApplicationDbContext dbContext
) : ControllerBase
{
  [HttpGet("recieved")]
  [Authorize(Policy = "RequireCompletedProfile")]
  [ProducesResponseType<List<Invitation>>(StatusCodes.Status200OK)]
  public async Task<IActionResult> RecievedInvitations()
  {
    var user = await this.GetCurrentUser(userManager);
    var invitations = await dbContext.Invitations
      .Where(e => e.ToUserId == user.Id)
      .Include(e => e.FromUser)
      .Include(e => e.ToUser)
      .Select(e => e.ToInvitationDtoFromInvitation())
      .ToListAsync();
    return Ok(invitations);
  }

  [HttpGet("sent")]
  [Authorize(Policy = "RequireCompletedProfile")]
  [ProducesResponseType<List<InvitationDto>>(StatusCodes.Status200OK)]
  public async Task<IActionResult> SendInvitations()
  {
    var user = await this.GetCurrentUser(userManager);
    var invitations = await dbContext.Invitations
      .Where(e => e.FromUserId == user.Id)
      .Include(e => e.FromUser)
      .Include(e => e.ToUser)
      .Select(e => e.ToInvitationDtoFromInvitation())
      .ToListAsync();
    return Ok(invitations);
  }

  [HttpGet("user/{id:guid}")]
  [Authorize(Policy = "RequireCompletedProfile")]
  [ProducesResponseType<InvitationDto>(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<IActionResult> GetUserInvitationStatus([FromRoute] Guid id)
  {
    var user = await this.GetCurrentUser(userManager);
    var invitation = await dbContext.Invitations
      .Where(e => (e.FromUserId == user.Id && e.ToUserId == id)
        || (e.ToUserId == user.Id && e.FromUserId == id))
      .Include(e => e.FromUser)
      .Include(e => e.ToUser)
      .FirstOrDefaultAsync();
    if (invitation == null) return NotFound();
    return Ok(invitation.ToInvitationDtoFromInvitation());
  }

  [HttpPost]
  [Authorize(Policy = "RequireCompletedProfile")]
  [ProducesResponseType<InvitationDto>(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status403Forbidden)]
  public async Task<IActionResult> CreateInvitation([FromBody] CreateInvitationRequestDto createInvitationRequestDto)
  {
    var user = await this.GetCurrentUser(userManager);
    if (user.Id == createInvitationRequestDto.UserId) return BadRequest();

    var existingInvitation = await dbContext.Invitations.FirstOrDefaultAsync(
      e => (e.FromUserId == user.Id && e.ToUserId == createInvitationRequestDto.UserId) ||
      (e.ToUserId == user.Id && e.FromUserId == createInvitationRequestDto.UserId)
    );
    if (existingInvitation != null) return Forbid();

    var invitation = new Invitation
    {
      FromUserId = user.Id,
      ToUserId = createInvitationRequestDto.UserId
    };
    await dbContext.Invitations.AddAsync(invitation);
    await dbContext.SaveChangesAsync();

    var createdInvitation = await dbContext.Invitations
      .Include(e => e.FromUser)
      .Include(e => e.ToUser)
      .FirstOrDefaultAsync(e => e.Id == invitation.Id);
    if (createdInvitation == null) return NotFound();
    return CreatedAtAction(nameof(CreateInvitation), new { Id = invitation.Id }, invitation.ToInvitationDtoFromInvitation());
  }

  [HttpDelete("{id:guid}")]
  [Authorize(Policy = "RequireCompletedProfile")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<IActionResult> DeleteInvitation([FromRoute] Guid id)
  {
    await dbContext.Invitations.Where(e => e.Id == id).ExecuteDeleteAsync();
    return Ok();
  }

  [HttpPost("{id:guid}")]
  [Authorize(Policy = "RequireCompletedProfile")]
  [ProducesResponseType<ConversationDto>(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status403Forbidden)]
  public async Task<IActionResult> AcceptInvitation([FromRoute] Guid id)
  {
    var user = await this.GetCurrentUser(userManager);
    var invitation = await dbContext.Invitations.FindAsync(id);
    if (invitation == null) return NotFound();
    if (invitation.ToUserId != user.Id) return Forbid();

    var conversation = new Conversation
    {
      FirstUserId = invitation.FromUserId,
      SecondUserId = invitation.ToUserId
    };

    await dbContext.Conversations.AddAsync(conversation);
    await dbContext.SaveChangesAsync();
    return CreatedAtAction(nameof(AcceptInvitation), new { Id = conversation.Id }, conversation.ToConvsersationDtoFromConvsersation());
  }
}