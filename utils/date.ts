export const formatDate = (
  date: Date | string | { toDate: () => Date } | null
): string => {
  if (!date) {
    return "No date";
  }

  const parsedDate =
    date instanceof Date
      ? date
      : typeof date === "string"
        ? new Date(date)
        : date.toDate();

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }) + `, ${parsedDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};