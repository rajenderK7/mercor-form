export const emailPattern =
  /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+(?:;[\w+\-.]+@[a-z\d\-.]+\.[a-z]+)*$/i;

export const formatDate = (dateString: string) => {
  // Convert the input date string to a Date object
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const options: Intl.DateTimeFormatOptions = {
    dateStyle: "short",
    timeStyle: "short",
    hourCycle: "h12",
  };

  // Format the date
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};
