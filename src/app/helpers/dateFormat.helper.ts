export const dateFormat = (): string => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

  const timezoneOffset = currentDate.getTimezoneOffset();
  const sign = timezoneOffset > 0 ? '-' : '+';
  const timezoneHours = String(Math.abs(timezoneOffset) / 60).padStart(2, '0');
  const timezoneMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
  const timezone = `${sign}${timezoneHours}:${timezoneMinutes}`;

  // YYYY-MM-DDTHH:mm:ss.SSS+TZ
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezone}`;

  return formattedDateTime;
};
