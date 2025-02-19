const formatZero = (value: number) => (value < 10 ? `0${value}` : value);

export abstract class DateUtils {
  public static formatDate(date: Date) {
    return `${date.getFullYear()}/${formatZero(
      date.getMonth() + 1
    )}/${formatZero(date.getDate())}`;
  }

  public static formatDateTime(date: Date) {
    return `${date.getFullYear()}/${formatZero(
      date.getMonth() + 1
    )}/${formatZero(date.getDate())} ${formatZero(
      date.getHours()
    )}:${formatZero(date.getMinutes())}`;
  }
}
