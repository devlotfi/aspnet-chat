namespace AspNetChat.Global;

public class PaginationResult<T>
{
  public required List<T> Items { get; set; }
  public required int Pages { get; set; }
}