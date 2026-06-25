export function convertToLocalDateTime(isoDate) {
  const date = new Date(isoDate);

  // Get the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Get the hours and minutes
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Combine in "yyyy-MM-ddThh:mm" format
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
