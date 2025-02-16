namespace AspNetChat.Users;

public static class UserMapper
{
  public static UserDto ToUserDtoFromApplicationUser(this ApplicationUser applicationUser)
  {
    return new UserDto
    {
      Id = applicationUser.Id,
      FirstName = applicationUser.FirstName,
      LastName = applicationUser.LastName,
      Email = applicationUser.Email!,
    };
  }

  public static UserPublicInfoDto ToUserPublicInfoDtoFromApplicationUser(this ApplicationUser applicationUser)
  {
    return new UserPublicInfoDto
    {
      Id = applicationUser.Id,
      FirstName = applicationUser.FirstName,
      LastName = applicationUser.LastName,
    };
  }
}