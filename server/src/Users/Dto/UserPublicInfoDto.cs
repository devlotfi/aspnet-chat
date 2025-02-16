namespace AspNetChat.Users;

public class UserPublicInfoDto
{
  public required Guid Id { get; set; }
  public required string FirstName { get; set; }
  public required string LastName { get; set; }
}