export const formattedDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const dateQueriesMap = (tabValue: string) => {
  const currentDate = new Date();
  let startDate: Date;
  let endDate: Date;

  switch (tabValue) {
    case "6Months":
      // Calculate 5 months ago from the current date
      const fiveMonthsAgo = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 5,
        1
      );

      startDate = fiveMonthsAgo;
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      break;
    case "currentMonth":
    default:
      // Default to the 1st day of the current month
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      break;
  }
  return { startDate, endDate };
};
