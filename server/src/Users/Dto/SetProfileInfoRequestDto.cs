using System.ComponentModel.DataAnnotations;

namespace AspNetChat.Users;

public class SetProfileInfoRequestDto
{
  [Required]
  [Length(3, 64)]
  public required string FirstName { get; set; }
  [Required]
  [Length(3, 64)]
  public required string LastName { get; set; }
}