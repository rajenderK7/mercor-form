export const emailPattern =
  /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+(?:;[\w+\-.]+@[a-z\d\-.]+\.[a-z]+)*$/i;

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const options: Intl.DateTimeFormatOptions = {
    dateStyle: "short",
    timeStyle: "short",
    hourCycle: "h12",
  };

  return new Intl.DateTimeFormat("en-GB", options).format(date);
};
