export const getFormattedDate = (date: string): string => {
  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  const day = ("0" + newDate.getDate()).slice(-2);
  let hour = newDate.getHours();
  const minute = newDate.getMinutes();

  const period = hour < 12 ? "오전" : "오후";

  if (hour > 12) {
    hour -= 12;
  }

  return `${year}-${month}-${day} ${period} ${hour}:${minute}`;
};
