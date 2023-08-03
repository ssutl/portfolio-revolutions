const convertDateFunc = (date: string) => {
  const dateObj = new Date(date);

  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = dateObj.getUTCFullYear();

  // Format the date as "dd/mm/yyyy"
  const formattedDate = `${day}/${month}/${year}`;

  // Extract the relevant time components
  const hours = dateObj.getUTCHours().toString().padStart(2, "0");
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");

  // Format the time in military time (24-hour clock) as "hh:mm"
  const formattedTime = `${hours}:${minutes}`;

  // Check if the date is within the last 7 days
  const currentDate = new Date();
  const sevenDaysAgo = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  const isWithinLast7Days = dateObj >= sevenDaysAgo && dateObj <= currentDate;

  return `${
    isWithinLast7Days ? `RECENTLY DROPPED` : "DROPPED ON"
  } ${formattedDate}  @${formattedTime}`;
};

export default convertDateFunc;
