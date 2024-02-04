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
    case "1year":
      // Calculate 1 year ago from the current date
      const oneYearAgo = new Date(
        currentDate.getFullYear() - 1,
        currentDate.getMonth(),
        currentDate.getDate()
      );

      startDate = oneYearAgo;
      endDate = currentDate;
      break;
    case "3years":
      // Calculate 3 years ago from the current date
      const threeYearsAgo = new Date(
        currentDate.getFullYear() - 3,
        currentDate.getMonth(),
        currentDate.getDate()
      );

      startDate = threeYearsAgo;
      endDate = currentDate;
      break;
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
