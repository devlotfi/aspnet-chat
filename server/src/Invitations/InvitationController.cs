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
  [ProducesResponseType<List<InvitationDto>>(StatusCodes.Status200OK)]
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
    List<InvitationDto> invitations = await dbContext.Invitations
      .Where(e => e.FromUserId == user.Id)
      .Include(e => e.FromUser)
      .Include(e => e.ToUser)
      .Select(e => e.ToInvitationDtoFromInvitation())
      .ToListAsync();
    return Ok(invitations);
  }

  [HttpPost]
  [Authorize(Policy = "RequireCompletedProfile")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status403Forbidden)]
  public async Task<IActionResult> CreateInvitation([FromBody] CreateInvitationRequestDto createInvitationRequestDto)
  {
    var user = await this.GetCurrentUser(userManager);
    if (user.Id == createInvitationRequestDto.UserId) return BadRequest();

    var conversation = await dbContext.Conversations.FirstOrDefaultAsync(
      e => (e.FirstUserId == user.Id && e.SecondUserId == createInvitationRequestDto.UserId) ||
      (e.SecondUserId == user.Id && e.FirstUserId == createInvitationRequestDto.UserId)
    );
    if (conversation != null) return Forbid();

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

    return Created();
  }

  [HttpDelete("{id:guid}")]
  [Authorize(Policy = "RequireCompletedProfile")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<IActionResult> DeleteInvitation([FromRoute] Guid id)
  {
    var user = await this.GetCurrentUser(userManager);
    await dbContext.Invitations
      .Where(e => e.FromUserId == user.Id || e.ToUserId == user.Id)
      .Where(e => e.Id == id)
      .ExecuteDeleteAsync();
    return Ok();
  }

  [HttpPost("{id:guid}")]
  [Authorize(Policy = "RequireCompletedProfile")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status403Forbidden)]
  public async Task<IActionResult> AcceptInvitation([FromRoute] Guid id)
  {
    using var transaction = await dbContext.Database.BeginTransactionAsync();

    var user = await this.GetCurrentUser(userManager);
    var invitation = await dbContext.Invitations.FindAsync(id);
    if (invitation == null)
    {
      await transaction.RollbackAsync();
      return NotFound();
    }
    if (invitation.ToUserId != user.Id)
    {
      await transaction.RollbackAsync();
      return Forbid();
    }

    var conversation = new Conversation
    {
      FirstUserId = invitation.FromUserId,
      SecondUserId = invitation.ToUserId
    };

    await dbContext.Invitations
      .Where(e => e.Id == invitation.Id)
      .ExecuteDeleteAsync();
    await dbContext.Conversations.AddAsync(conversation);
    await dbContext.SaveChangesAsync();
    await transaction.CommitAsync();

    return Created();
  }
}