namespace AspNetChat.Users;

public class UserDto
{
  public required Guid Id { get; set; }
  public required string? FirstName { get; set; }
  public required string? LastName { get; set; }
  public required string Email { get; set; }
}