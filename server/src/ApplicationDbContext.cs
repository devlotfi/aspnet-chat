using AspNetChat.Conversations;
using AspNetChat.Invitations;
using AspNetChat.Messages;
using AspNetChat.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AspNetChat.Global;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions)
  : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>(dbContextOptions)
{
  public DbSet<Invitation> Invitations { get; set; }
  public DbSet<Conversation> Conversations { get; set; }
  public DbSet<Message> Messages { get; set; }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);

    builder.Entity<Invitation>()
      .HasOne(e => e.FromUser)
      .WithMany(e => e.FromInvitations)
      .HasForeignKey(e => e.FromUserId)
      .IsRequired()
      .OnDelete(DeleteBehavior.Cascade);
    builder.Entity<Invitation>()
      .HasOne(e => e.ToUser)
      .WithMany(e => e.ToInvitations)
      .HasForeignKey(e => e.ToUserId)
      .IsRequired()
      .OnDelete(DeleteBehavior.Cascade);
    builder.Entity<Invitation>()
      .HasIndex(e => new { e.FromUserId, e.ToUserId })
      .IsUnique();

    builder.Entity<Conversation>()
      .HasOne(e => e.FirstUser)
      .WithMany(e => e.FirstConversations)
      .HasForeignKey(e => e.FirstUserId)
      .IsRequired()
      .OnDelete(DeleteBehavior.Cascade);
    builder.Entity<Conversation>()
      .HasOne(e => e.SecondUser)
      .WithMany(e => e.SecondConversations)
      .HasForeignKey(e => e.SecondUserId)
      .IsRequired()
      .OnDelete(DeleteBehavior.Cascade);
    builder.Entity<Conversation>()
      .HasIndex(e => new { e.FirstUserId, e.SecondUserId })
      .IsUnique();

    builder.Entity<Message>()
      .HasOne(e => e.User)
      .WithMany(e => e.Messages)
      .HasForeignKey(e => e.UserId)
      .IsRequired()
      .OnDelete(DeleteBehavior.Cascade);
    builder.Entity<Message>()
      .HasOne(e => e.Conversation)
      .WithMany(e => e.Messages)
      .HasForeignKey(e => e.ConvsersationId)
      .IsRequired()
      .OnDelete(DeleteBehavior.Cascade);
  }
}