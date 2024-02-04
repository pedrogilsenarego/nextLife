import { useEffect } from "react";
import { useAppSelector } from "./slicer.hooks";
import useExpenses from "./useExpenses";

const useGetDataForCurrentDate = () => {
  const timeRange = useAppSelector((state) => state.DataSlice.timeRange);
  const { expensesQuery } = useExpenses();
  console.log(timeRange);
  //   useEffect(() => {
  //     expensesQuery.refetch();
  //   }, [timeRange]);
  return {};
};

export default useGetDataForCurrentDate;
